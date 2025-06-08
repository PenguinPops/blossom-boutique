import { NextResponse } from 'next/server';
import { sql, eq, and } from 'drizzle-orm';
import { ensureProductTable, ensureOrderTable, ensureOrderDetailTable, ensureTableExists } from '@/app/db';
import { auth } from '@/app/auth';
import { db } from '@/app/db';

// Function to fetch order details by order ID
async function getOrderDetails(orderId: number, username: string) {
  const Product = await ensureProductTable();
  const Order = await ensureOrderTable();
  const OrderDetail = await ensureOrderDetailTable();
  const User = await ensureTableExists();

  console.log('Fetching order details for orderId:', orderId);  // Debugging log

  const userResult = await db
    .select({ userId: User.id })
    .from(User)
    .where(eq(User.name, username));

  if (userResult.length === 0) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const userId = userResult[0].userId;

  // Perform the query to get order and its details
  const result = await db
    .select({
      orderId: Order.id,
      userId: Order.user_id,
      total: Order.total,
      productId: OrderDetail.product_id,
      quantity: OrderDetail.quantity,
      productName: Product.name,
      productPrice: Product.price,
      productImage: Product.image,
    })
    .from(Order)
    .innerJoin(OrderDetail, sql`"OrderDetail".orderid = "Order".id`)
    .innerJoin(Product, sql`"Product".id = "OrderDetail".productid`)
    .where(and(eq(Order.id, orderId), eq(Order.user_id, userId)));

  console.log('Query result:', result);  // Debugging log

  if (result.length === 0) {
    // Handle no results
    return NextResponse.json({ error: 'No products found for this order' }, { status: 404 });
  }

  return result;
}

export async function GET(req: Request, { params }: { params: { orderid: string, username: string } }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if(session.user.name !== params.username) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const { orderid, username } = params;
  const orderId = parseInt(orderid, 10);

  if (isNaN(orderId)) {
    return NextResponse.json({ error: 'Invalid order ID' }, { status: 400 });
  }

  try {
    const orderDetails = await getOrderDetails(orderId, username);
    return NextResponse.json(orderDetails);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch order details' }, { status: 500 });
  }
};
