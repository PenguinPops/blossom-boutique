import { NextResponse } from 'next/server';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';
import { ensureTableExists, ensureOrderTable, ensureOrderDetailTable, ensureProductTable } from '@/app/db';

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

// Function to fetch user details
async function getUserDetails(username: string) {
  const User = await ensureTableExists();
  const Order = await ensureOrderTable();
  const OrderDetail = await ensureOrderDetailTable();
  const Product = await ensureProductTable();

  // Fetch user details from the User table
  const userDetails = await db
    .select()
    .from(User)
    .where(eq(User.username, username));

  if (userDetails.length === 0) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const userId = userDetails[0].id;

  // Fetch user's orders
  const orders = await db
    .select({
      orderId: Order.id,
      total: Order.total,
    })
    .from(Order)
    .where(eq(Order.user_id, userId));

  // Fetch order details for each order
  const ordersWithDetails = await Promise.all(orders.map(async (order) => {
    const orderDetails = await db
      .select({
        productId: OrderDetail.product_id,
        quantity: OrderDetail.quantity,
        productName: Product.name,
        productPrice: Product.price,
        productImage: Product.image,
      })
      .from(OrderDetail)
      .innerJoin(Product, eq(OrderDetail.product_id, Product.id))
      .where(eq(OrderDetail.order_id, order.orderId));

    return {
      ...order,
      details: orderDetails,
    };
  }));

  return { user: userDetails[0], orders: ordersWithDetails };
}

export async function GET(req: Request, { params }: { params: { username: string } }) {
  const { username } = params;

  try {
    const userData = await getUserDetails(username);
    return NextResponse.json(userData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch user details' }, { status: 500 });
  }
}

