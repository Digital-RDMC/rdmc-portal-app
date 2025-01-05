// app/api/emps/route.ts
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

// Handle GET requests
export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB); // Ensure MONGODB_DB is set in your .env file
    const collection = db.collection("emps"); // Replace 'emps' with your collection name

    // Fetch all documents from the collection
    const emps = await collection.find({}).toArray();

    return NextResponse.json({ result: emps });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve data from the database" },
      { status: 500 }
    );
  }
}

// Handle POST requests
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB); // Ensure `MONGODB_DB` is set in your .env file
    const collection = db.collection("emps"); // Replace 'emps' with your collection name

    if (Array.isArray(data)) {
      // Process an array of data for upsert
      const results = [];
      for (const item of data) {
        const { _id, ...rest } = item;
        const filter = _id ? { _id } : { uniqueField: rest.uniqueField }; // Use a unique field for matching
        const result = await collection.updateOne(
          filter,
          { $set: rest },
          { upsert: true }
        );
        results.push(result);
      }
      return NextResponse.json({ message: "Records processed successfully", results });
    } else if (typeof data === "object" && data !== null) {
      // Process a single document for upsert
      const { _id, ...rest } = data;
      const filter = _id ? { _id } : { uniqueField: rest.uniqueField }; // Use a unique field for matching
      const result = await collection.updateOne(
        filter,
        { $set: rest },
        { upsert: true }
      );
      return NextResponse.json({ message: "Record processed successfully", result });
    } else {
      return NextResponse.json(
        { error: "Invalid data format: expected an object or array of objects" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { error: "Failed to connect to the database" },
      { status: 500 }
    );
  }
}
