import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB); // Ensure MONGODB_DB is set in your .env file
    const collection = db.collection("emps"); // Replace 'emps' with your collection name

    // Extract query parameters for pagination
    const page = parseInt(request.nextUrl.searchParams.get("page") || "1", 10);
    const pageSize = parseInt(
      request.nextUrl.searchParams.get("pageSize") || "10",
      10
    );

    // Calculate the number of documents to skip
    const skip = (page - 1) * pageSize;

    // Fetch paginated data
    const total = await collection.countDocuments();
    const emps = await collection
      .find({})
      .skip(skip)
      .limit(pageSize)
      .toArray();

    return NextResponse.json({
      result: emps,
      total,
      page,
      pageSize,
    });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve data from the database" },
      { status: 500 }
    );
  }
}
