import { drizzle } from 'drizzle-orm/postgres-js';
import { pgTable, serial, varchar, real, integer } from 'drizzle-orm/pg-core';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';
import { genSaltSync, hashSync } from 'bcrypt-ts';

// Initialize database connection
let client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`);
let db = drizzle(client);

// Define the ProductCategory table
export async function ensureProductCategoryTable() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'ProductCategory'
    );`;

  if (!result[0].exists) {
    await client`
      CREATE TABLE "ProductCategory" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        description TEXT,
        slug VARCHAR(128) UNIQUE NOT NULL
      );`;
  }

  const productCategoryTable = pgTable('ProductCategory', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 128 }),
    description: varchar('description', { length: 256 }),
    slug: varchar('slug', { length: 128 }).unique(),
    image: varchar('image', { length: 256 }),
  });

  return productCategoryTable;
}

// Define the Product table
export async function ensureProductTable() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'Product'
    );`;

  if (!result[0].exists) {
    await client`
      CREATE TABLE "Product" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(128),
        description VARCHAR(256),
        price REAL,
        image VARCHAR(256),
        categoryid INTEGER,
        FOREIGN KEY (categoryid) REFERENCES "ProductCategory" (id) ON DELETE SET NULL
      );`;
  }

  const productCategoryTable = await ensureProductCategoryTable(); // Ensure ProductCategory table is defined first

  const productTable = pgTable('Product', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 128 }),
    description: varchar('description', { length: 256 }),
    price: real('price'),
    image: varchar('image', { length: 256 }),
    // Now explicitly reference the column
    categoryid: integer('categoryid').references(() => productCategoryTable.id)
  });

  return productTable;
}




// Define the Order table
export async function ensureOrderTable() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'Order'
    );`;

  if (!result[0].exists) {
    // await client`
    //   CREATE TABLE "Order" (
    //     id SERIAL PRIMARY KEY,
    //     user_id INTEGER,
    //     total REAL
    //   );`;
  }

  const orderTable = pgTable('Order', {
    id: serial('id').primaryKey(),
    user_id: integer('userid'),
    total: real('total'),
  });

  return orderTable;
}

// Define the OrderDetail table
export async function ensureOrderDetailTable() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'OrderDetail'
    );`;

  if (!result[0].exists) {
    // await client`
    //   CREATE TABLE "OrderDetail" (
    //     id SERIAL PRIMARY KEY,
    //     order_id INTEGER,
    //     product_id INTEGER,
    //     quantity INTEGER
    //   );`;
  }

  const orderDetailTable = pgTable('OrderDetail', {
    id: serial('id').primaryKey(),
    order_id: integer('orderid'),
    product_id: integer('productid'),
    quantity: integer('quantity'),
  });

  return orderDetailTable;
}

// User management functions
export async function getUser(email: string) {
  const users = await ensureTableExists();
  return await db.select().from(users).where(eq(users.email, email));
}

export async function createUser(email: string, password: string) {
  const users = await ensureTableExists();
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);

  return await db.insert(users).values({ email, password: hash });
}

// Ensure the User table exists (as you already have it)
export async function ensureTableExists() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'User'
    );`;

  if (!result[0].exists) {
    await client`
      CREATE TABLE "User" (
        id SERIAL PRIMARY KEY,
        email VARCHAR(64),
        password VARCHAR(64)
      );`;
  }

  const table = pgTable('User', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 64 }),
    password: varchar('password', { length: 64 }),
    username: varchar('username', { length: 40 }),
  });

  return table;
}