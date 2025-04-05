// Backend: In the same route as your GET request
import { NextResponse } from 'next/server';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';
import { ensureTableExists, ensureOrderTable, ensureOrderDetailTable, ensureProductTable } from '@/app/db';
import { auth } from '@/app/auth';

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

// Function to fetch user details (existing)
async function getUserDetails(username: string) {
  const User = await ensureTableExists();
  const Order = await ensureOrderTable();
  const OrderDetail = await ensureOrderDetailTable();
  const Product = await ensureProductTable();

  // Fetch user details from the User table
  const userDetails = await db
    .select()
    .from(User)
    .where(eq(User.name, username));

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

// Function to update user details
async function updateUserDetails(username: string, name: string, email: string) {
  const User = await ensureTableExists();

  // Update user name and email
  const updatedUser = await db
    .update(User)
    .set({
      name: name,
      email: email,
    })
    .where(eq(User.name, username));

  if (updatedUser.count === 0) {
    return NextResponse.json({ error: 'Failed to update user details' }, { status: 400 });
  }

  return NextResponse.json({ message: 'User details updated successfully' });
}

// Handle GET and POST requests
export async function GET(req: Request, { params }: { params: { username: string } }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (session.user.name !== params.username) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { username } = params;

  try {
    const userData = await getUserDetails(username);
    return NextResponse.json(userData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch user details' }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { username: string } }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (session.user.name !== params.username) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  
  const { username } = params;
  const { name, email } = await req.json();  // Get name and email from the body of the request

  try {
    const updateResult = await updateUserDetails(username, name, email);
    return updateResult;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update user details' }, { status: 500 });
  }
}
