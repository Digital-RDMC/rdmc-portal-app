// app/api/emps/route.ts
 

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

// Handle GET requests
export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB); // Ensure MONGODB_DB is set in your .env file
    const collection = db.collection("emps"); // Replace 'emps' with your collection name

    const email = request.nextUrl.searchParams.get("email"); // Get 'email' query parameter

    if (email) {
      // Check if the email exists in the database
      const record = await collection.findOne({ email });

      if (record) {
        return NextResponse.json({ result: record });
      } else {
        return NextResponse.json(
          { error: "No record found with the specified email" },
          { status: 404 }
        );
      }
    }

    // Fetch all documents from the collection if no email is provided
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
