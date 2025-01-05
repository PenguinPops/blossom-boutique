// pages/api/user/data.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "app/db"; // Import your DB function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Invalid email" });
  }

  // Get user data from the database
  const user = await getUser(email);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Return user data including the username
  return res.status(200).json({
    username: user.name,
    email: user.email,
    id: user.id,
  });
}
