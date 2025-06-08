// import { drizzle } from 'drizzle-orm/postgres-js';
// import { pgTable, serial, varchar, real, integer } from 'drizzle-orm/pg-core';
// import { eq } from 'drizzle-orm';
// import postgres from 'postgres';
// import { genSaltSync, hashSync } from 'bcrypt-ts';

// // Initialize database connection
// let client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`);
// let connectionCount = 0;
// console.log(`Creating connection #${++connectionCount} at ${new Date()}`);
// export const db = drizzle(client);

// export async function ensureOrderInfoTable() {
//   const result = await client`
//     SELECT EXISTS (
//     SELECT FROM information_schema.tables
//     WHERE table_schema = 'public'
//     AND table_name = 'OrderInfo'
//     );`;

//   const orderInfoTable = pgTable('OrderInfo', {
//     id: serial('id').primaryKey(),
//     name: varchar('name', { length: 40 }),
//     surname: varchar('surname', { length: 40 }),
//     postalcode: varchar('postalcode', { length: 6 }),
//     number: varchar('number', { length: 12 }),
//     address: varchar('address', { length: 255 }),
//     country: varchar('country', { length: 30 }),
//     voivodeship: varchar('voivodeship', { length: 30 }),
//     order_id: integer('orderid'),
//     user_id: integer('userid'),
//   });

//   return orderInfoTable;
// }

// // Define the ProductCategory table
// export async function ensureProductCategoryTable() {
//   const result = await client`
//     SELECT EXISTS (
//       SELECT FROM information_schema.tables 
//       WHERE table_schema = 'public' 
//       AND table_name = 'ProductCategory'
//     );`;

//   if (!result[0].exists) {
//     await client`
//       CREATE TABLE "ProductCategory" (
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(128) NOT NULL,
//         description TEXT,
//         slug VARCHAR(128) UNIQUE NOT NULL
//       );`;
//   }

//   const productCategoryTable = pgTable('ProductCategory', {
//     id: serial('id').primaryKey(),
//     name: varchar('name', { length: 128 }),
//     description: varchar('description', { length: 256 }),
//     slug: varchar('slug', { length: 128 }).unique(),
//     image: varchar('image', { length: 256 }),
//   });

//   return productCategoryTable;
// }

// // Define the ProductDetail table
// export async function ensureProductDetailTable() {
//   const result = await client`
//     SELECT EXISTS (
//       SELECT FROM information_schema.tables 
//       WHERE table_schema = 'public' 
//       AND table_name = 'ProductDetail'
//     );`;

//   if (!result[0].exists) {
//     await client`
//       CREATE TABLE "ProductDetail" (
//         id SERIAL PRIMARY KEY,
//         product_id INTEGER,
//         description TEXT
//       );`;
//   }

//   const productDetailTable = pgTable('ProductDetail', {
//     id: serial('id').primaryKey(),
//     product_id: integer('productid'),
//     detail: varchar('description', { length: 256 }),
//   });

//   return productDetailTable;
// }

// // Define the Product table
// export async function ensureProductTable() {
//   const result = await client`
//     SELECT EXISTS (
//       SELECT FROM information_schema.tables 
//       WHERE table_schema = 'public' 
//       AND table_name = 'Product'
//     );`;

//   if (!result[0].exists) {
//     await client`
//       CREATE TABLE "Product" (
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(128),
//         description VARCHAR(256),
//         price REAL,
//         image VARCHAR(256),
//         categoryid INTEGER,
//         FOREIGN KEY (categoryid) REFERENCES "ProductCategory" (id) ON DELETE SET NULL
//       );`;
//   }

//   const productCategoryTable = await ensureProductCategoryTable(); // Ensure ProductCategory table is defined first

//   const productTable = pgTable('Product', {
//     id: serial('id').primaryKey(),
//     name: varchar('name', { length: 128 }),
//     description: varchar('description', { length: 256 }),
//     price: real('price'),
//     image: varchar('image', { length: 256 }),
//     // Now explicitly reference the column
//     categoryid: integer('categoryid').references(() => productCategoryTable.id)
//   });

//   return productTable;
// }






// // Define the Order table
// export async function ensureOrderTable() {
//   const result = await client`
//     SELECT EXISTS (
//       SELECT FROM information_schema.tables 
//       WHERE table_schema = 'public' 
//       AND table_name = 'Order'
//     );`;

//   if (!result[0].exists) {
//     // await client`
//     //   CREATE TABLE "Order" (
//     //     id SERIAL PRIMARY KEY,
//     //     user_id INTEGER,
//     //     total REAL
//     //   );`;
//   }

//   const orderTable = pgTable('Order', {
//     id: serial('id').primaryKey(),
//     user_id: integer('userid'),
//     total: real('total'),
//   });

//   return orderTable;
// }

// // Define the OrderDetail table
// export async function ensureOrderDetailTable() {
//   const result = await client`
//     SELECT EXISTS (
//       SELECT FROM information_schema.tables 
//       WHERE table_schema = 'public' 
//       AND table_name = 'OrderDetail'
//     );`;

//   if (!result[0].exists) {
//     // await client`
//     //   CREATE TABLE "OrderDetail" (
//     //     id SERIAL PRIMARY KEY,
//     //     order_id INTEGER,
//     //     product_id INTEGER,
//     //     quantity INTEGER
//     //   );`;
//   }

//   const orderDetailTable = pgTable('OrderDetail', {
//     id: serial('id').primaryKey(),
//     order_id: integer('orderid'),
//     product_id: integer('productid'),
//     quantity: integer('quantity'),
//   });

//   return orderDetailTable;
// }

// // User management functions
// export async function getUser(email: string) {
//   const users = await ensureTableExists();
//   const user = await db.select().from(users).where(eq(users.email, email)).limit(1);

//   if (user.length === 0) return null;

//   return user[0];  // Returning the full user object, including username
// }


// export async function createUser(email: string, password: string, username: string) {
//   const users = await ensureTableExists();
//   let salt = genSaltSync(10);
//   let hash = hashSync(password, salt);

//   // Insert email, password, and username into the User table
//   return await db.insert(users).values({
//     email,
//     password: hash,
//     name: username,  // Store the username in the 'name' column
//   });
// }

// // Ensure the User table exists (as you already have it)
// export async function ensureTableExists() {
//   const result = await client`
//     SELECT EXISTS (
//       SELECT FROM information_schema.tables 
//       WHERE table_schema = 'public' 
//       AND table_name = 'User'
//     );`;

//   if (!result[0].exists) {
//     await client`
//       CREATE TABLE "User" (
//         id SERIAL PRIMARY KEY,
//         email VARCHAR(64),
//         password VARCHAR(64)
//       );`;
//   }



//   const table = pgTable('User', {
//     id: serial('id').primaryKey(),
//     email: varchar('email', { length: 64 }),
//     password: varchar('password', { length: 64 }),
//     name: varchar('name', { length: 40 }),
//   });

//   return table;
// }

// // Update user details function
// export async function updateUserDetails(email: string, name: string, newEmail?: string) {
//   const users = await ensureTableExists();

//   // Perform the update query
//   const updatedUser = await db
//     .update(users)
//     .set({ name, email: newEmail || email })  // Update the name and optionally the email
//     .where(eq(users.email, email));

//   return updatedUser;
// }