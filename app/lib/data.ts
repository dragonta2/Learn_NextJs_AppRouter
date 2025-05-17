// app/lib/data.ts

import postgres from 'postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenues,
} from './definitions';
import { formatCurrency } from './utils';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
// `sql`変数は、PostgreSQLデータベースとの接続を管理し、SQLクエリを実行するためのインターフェースを提供します。
// `postgres`関数を使用して、環境変数`POSTGRES_URL`で指定されたデータベースに接続します。
// この変数を通じて、データベースに対してクエリを発行し、結果を取得することができます。
// `sql`変数は、型パラメータを指定することで、クエリの結果の型を明示的に定義することも可能です。
// `postgres`関数自体の定義は、`postgres`パッケージ内で行われています。
// このパッケージは、Node.jsアプリケーションからPostgreSQLデータベースに接続し、
// SQLクエリを実行するためのライブラリです。



export async function fetchRevenues() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching revenues data...');

    // 遅延させる状況を作り出すために、3秒待ってからデータを取得する
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenues[]>`SELECT * FROM revenues`;

    // 確認用
    console.log('revenuesテーブルのデータ', data);

    console.log('Data fetch completed after 3 seconds.');

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw[]>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
        SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
        SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
        FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0][0].count ?? '0');
    const numberOfCustomers = Number(data[1][0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2][0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2][0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable[]>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm[]>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const customers = await sql<CustomerField[]>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType[]>`
      SELECT
      customers.id,
      customers.name,
      customers.email,
      customers.image_url,
      COUNT(invoices.id) AS total_invoices,
      SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
      SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
      FROM customers
      LEFT JOIN invoices ON customers.id = invoices.customer_id
      WHERE
      customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
      GROUP BY customers.id, customers.name, customers.email, customers.image_url
      ORDER BY customers.name ASC
    `;

    const customers = data.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

// このファイルは、データベースから情報を取得するための関数が集められたものです。
// 具体的には、顧客情報や請求書情報をデータベースから取り出して、
// それを使いやすい形に整えて返す役割を持っています。

// 例えば、`fetchCustomers`関数は、すべての顧客の名前とIDを取得し、
// 名前順に並べて返します。

// また、`fetchFilteredCustomers`関数は、特定の条件に合う顧客を探し出し、
// その顧客が持つ請求書の情報も一緒にまとめて返します。
// これにより、アプリケーションの他の部分で、
// 必要な顧客情報を簡単に利用できるようになります。

// ■ fetchRevenue関数
// `fetchRevenue`関数は、データベースから収益データを取得するための非同期関数です。
// この関数の処理の流れを詳しく説明します。

// 1. **関数の宣言**: `fetchRevenue`は`async`キーワードを使って宣言されており、
//    非同期処理を行うことができる関数です。これにより、`await`キーワードを使用して
//    非同期操作の完了を待つことができます。

// 2. **tryブロックの開始**: 関数の中で、データベース操作を行う部分は`try`ブロック内に
//    記述されています。これにより、データベース操作中にエラーが発生した場合に
//    `catch`ブロックでエラーを処理することができます。

// 3. **データベースクエリの実行**: `sql<Revenue[]>`という構文を使って、
//    データベースから収益データを取得するクエリを実行します。
//    `SELECT * FROM revenue`というSQL文を使用して、`revenue`テーブルから
//    すべてのデータを取得します。このクエリは、`Revenue`型の配列として
//    結果を返します。

// 4. **データの返却**: クエリの結果として取得したデータをそのまま返します。
//    これにより、関数を呼び出した側でこのデータを利用することができます。

// 5. **catchブロックの開始**: `try`ブロック内でエラーが発生した場合、
//    `catch`ブロックが実行されます。ここでは、エラーメッセージをコンソールに
//    出力し、`new Error('Failed to fetch revenue data.')`をスローします。
//    これにより、関数を呼び出した側でエラーをキャッチして適切に処理することが
//    できます。

// 以上が`fetchRevenue`関数の処理の流れです。この関数は、データベースから
// 収益データを取得し、エラーが発生した場合には適切にエラーハンドリングを行う
// 構造になっています。
