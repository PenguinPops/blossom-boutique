// import { NextResponse } from 'next/server';
// import { eq } from 'drizzle-orm';
// import { ensureTableExists } from '@/app/db';
// import { db } from '@/app/db';


// // Function to fetch user data by email
// async function getUserData(email: string) {
//   const User = await ensureTableExists();

//   // Query to find the user by email
//   const userResult = await db
//     .select({
//       userId: User.id,
//       username: User.name,
//       userEmail: User.email,
//     })
//     .from(User)
//     .where(eq(User.email, email));

//   if (userResult.length === 0) {
//     return NextResponse.json({ error: 'User not found' }, { status: 404 });
//   }

//   return userResult[0]; // Return the first matching user
// }

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const email = searchParams.get('email');

//   if (!email) {
//     return NextResponse.json({ error: 'Email is required' }, { status: 400 });
//   }

//   try {
//     const userData = await getUserData(email);
//     return NextResponse.json(userData);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
//   }
// }
