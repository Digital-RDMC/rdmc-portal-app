/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name } = req.body;
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB); // Replace 'myDatabase' with your database name
      const collection = db.collection('emps'); // Replace 'users' with your collection name
      const result = await collection.insertOne({ name });
      res.status(200).json({ message: `Hello, ${name}!`, result });
    } catch (error) {
      res.status(500).json({ error: 'Failed to connect to database ' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}