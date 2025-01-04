// import postgres from 'postgres';

// // Setup connection with postgres.js
// const client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`);

// // Raw SQL query to create the "Order" table if it doesn't exist
// async function createOrderTable() {
//   try {
//     await client`
//       CREATE TABLE IF NOT EXISTS "Order" (
//         id SERIAL PRIMARY KEY,
//         userId INTEGER NOT NULL,  -- You can change this to match your user schema
//         productId INTEGER NOT NULL,
//         quantity INTEGER NOT NULL,
//         status VARCHAR(50) NOT NULL DEFAULT 'pending',
//         FOREIGN KEY (productId) REFERENCES "Product" (id) ON DELETE CASCADE
//       );
//     `;
//     console.log('Order table created successfully (if not already exists)');
//   } catch (error) {
//     console.error('Error creating Order table:', error);
//   }
// }

// // Call the function to create the Order table
// createOrderTable();
