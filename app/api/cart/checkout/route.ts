import { NextResponse } from 'next/server';
import { ensureOrderInfoTable, ensureOrderTable, ensureOrderDetailTable } from '@/app/db';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import { ensureTableExists } from '@/app/db';
import { auth } from '@/app/auth';
import { db } from '@/app/db';

type CartItem = {
    id: number; 
    name: string;
    price: number;
    quantity: number;
  };

async function getUserDetails(username: string) {
  const User = await ensureTableExists();
  
  // Fetch user details from the User table
  const userDetails = await db
    .select()
    .from(User)
    .where(eq(User.name, username));

  if (userDetails.length === 0) {
    return 0;
  }

  const userId = userDetails[0].id;

  return userId;
}
  
let activeOrders = new Set();

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userName = session.user.name;
    const { userDetails, cartItems } = await req.json();

    if (activeOrders.has(userName)) {
      return NextResponse.json({ error: 'Order already in progress.' }, { status: 429 });
    }

    activeOrders.add(userName);

    // Server-side validation
    if (!userDetails || typeof userDetails !== 'object') {
      return NextResponse.json({ error: 'Invalid user details' }, { status: 400 });
    }

    const requiredFields = [
      'name',
      'surname',
      'postalCode',
      'address',
      'country',
      'voivodeship',
      'phoneNumber',
    ];

    const errors: Record<string, string> = {};

    // Validate userDetails fields
    requiredFields.forEach((field) => {
      if (!userDetails[field]) {
        errors[field] = `${field} is required.`;
      }
    });

    if (!/^[A-ZŻŹĄĆÓŁŃŚ][a-ząłóżśźć]+(\s?-?[A-ZŻŹĄĆÓŁŃŚ][a-ząłóżśźć]+)*$/.test(userDetails.name)) {
      errors.name = 'Invalid name format.';
    }

    if (!/^[A-ZŻŹĄĆÓŁŃŚ][a-ząłóżśźć]+(\s?-?[A-ZŻŹĄĆÓŁŃŚ][a-ząłóżśźć]+)*$/.test(userDetails.surname)) {
      errors.surname = 'Invalid surname format.';
    }

    if (!/^[0-9]{2}-[0-9]{3}$/.test(userDetails.postalCode)) {
      errors.postalCode = 'Invalid postal code format.';
    }

    // if (!/^[A-Za-zÀ-ž0-9\s,]+$/.test(userDetails.address)) {
    //   errors.address = 'Invalid address format.';
    // }

    if (!/^[A-Za-zÀ-ž\s]+$/.test(userDetails.country)) {
      errors.country = 'Invalid country format.';
    }

    if (!/^[A-Za-zÀ-ž]+$/.test(userDetails.voivodeship)) {
      errors.voivodeship = 'Invalid voivodeship format.';
    }

    if (!/^(\+\d\d)?[0-9]{9}$/.test(userDetails.phoneNumber)) {
      errors.phoneNumber = 'Invalid phone number format.';
    }

    // Validate cartItems
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      errors.cartItems = 'Cart items are required.';
    } else {
      cartItems.forEach((item, index) => {
        if (
          !item.id ||
          typeof item.id !== 'number' ||
          !item.name ||
          typeof item.name !== 'string' ||
          !item.price ||
          typeof item.price !== 'number' ||
          !item.quantity ||
          typeof item.quantity !== 'number'
        ) {
          errors[`cartItem${index}`] = `Invalid cart item at index ${index}.`;
        }
      });
    }

    // Return errors if any
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: 'Validation failed', details: errors }, { status: 400 });
    }

    const userId = session.user.id;

    // Business logic to insert into the database
    const orderTable = await ensureOrderTable();
    const orderDetailTable = await ensureOrderDetailTable();
    const orderInfoTable = await ensureOrderInfoTable();

    const total = cartItems.reduce(
      (sum: number, item: CartItem) => sum + item.price * item.quantity,
      0
    );

    const [newOrder] = await db
      .insert(orderTable)
      .values({ user_id: Number(userId), total })
      .returning();

    for (const item of cartItems) {
      await db.insert(orderDetailTable).values({
        order_id: newOrder.id,
        product_id: item.id,
        quantity: item.quantity,
      });
    }

    await db.insert(orderInfoTable).values({
      name: userDetails.name,
      surname: userDetails.surname,
      postalcode: userDetails.postalCode,
      number: userDetails.phoneNumber,
      address: userDetails.address,
      country: userDetails.country,
      voivodeship: userDetails.voivodeship,
      order_id: newOrder.id,
      user_id: Number(userId),
    });

    activeOrders.delete(userName);
    return NextResponse.json({ message: 'Order placed successfully!', orderId: newOrder.id });
  } catch (error) {
    
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userName = session.user.name;

    activeOrders.delete(userName);
    console.error(error);
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 });
  }
}
