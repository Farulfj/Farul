import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_NAME);

    switch (req.method) {
      case "POST":
        try {
          const body = req.body;  // No need to parse

          // Validate incoming data
          if (typeof body !== "object" || Array.isArray(body)) {
            throw new Error('Invalid request format');
          }
          if (!body.title) {
            throw new Error('Title is required');
          }

          // Insert data into the database
          const myWork = await db.collection("work").insertOne(body);
          res.status(201).json({ data: myWork });
        } catch (err) {
          console.error("Error in POST request:", err);
          res.status(422).json({ message: err.message });
        }
        break;

      case "GET":
        try {
          const allPosts = await db.collection("work").find({}).toArray();
          res.status(200).json({ data: allPosts });
        } catch (err) {
          console.error("Error in GET request:", err);
          res.status(500).json({ message: "Failed to fetch data" });
        }
        break;

      default:
        res.status(405).json({ message: "Method Not Allowed" });
        break;
    }
  } catch (err) {
    console.error("Database connection error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}
