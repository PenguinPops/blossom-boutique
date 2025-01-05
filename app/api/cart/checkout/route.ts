import { NextResponse } from 'next/server';
import { ensureOrderInfoTable, ensureOrderTable, ensureOrderDetailTable } from '@/app/db';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

type CartItem = {
    id: number; 
    name: string;
    price: number;
    quantity: number;
  };
  

export async function POST(req: Request) {
    const { userDetails, cartItems, userId } = await req.json();

    if (!userDetails || !cartItems || !userId) {
        return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    try {
        const orderTable = await ensureOrderTable();
        const orderDetailTable = await ensureOrderDetailTable();
        const orderInfoTable = await ensureOrderInfoTable();

        const total = cartItems.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);

        const [newOrder] = await db
        .insert(orderTable)
        .values({ user_id: userId, total })
        .returning();

    // Add order details
    for (const item of cartItems) {
      await db.insert(orderDetailTable).values({
        order_id: newOrder.id,
        product_id: item.id,
        quantity: item.quantity,
      });
    }

    // Add order info
    await db.insert(orderInfoTable).values({
      name: userDetails.name,
      surname: userDetails.surname,
      postalcode: userDetails.postalCode,
      number: userDetails.phoneNumber,
      address: userDetails.address,
      country: userDetails.country,
      voivodeship: userDetails.voivodeship,
      order_id: newOrder.id,
      user_id: userId,
    });

    return NextResponse.json({ message: 'Order placed successfully!' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 });
  }
}