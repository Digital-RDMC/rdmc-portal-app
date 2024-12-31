// app/api/users/route.ts

/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextRequest, NextResponse } from "next/server";
import { database } from "../../../firebaseConfig";
import { get, ref, set, update, remove } from "firebase/database";

// GET: Fetch all users
export async function GET(request: NextRequest) {
  try {
    const dbRef = ref(database, "users");
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      return NextResponse.json({ data: snapshot.val() });
    } else {
      return NextResponse.json({ message: "No data found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data", details: error },
      { status: 500 }
    );
  }
}

// POST: Add new user
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { key, value } = data;

    if (!key || !value) {
      return NextResponse.json(
        { error: "Key and Value are required" },
        { status: 400 }
      );
    }

    const dbRef = ref(database, `users/${key}`);
    await set(dbRef, value);

    return NextResponse.json({ message: "Data added successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add data", details: error },
      { status: 500 }
    );
  }
}

// PUT: Update user data
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { key, value } = data;

    if (!key || !value) {
      return NextResponse.json(
        { error: "Key and Value are required" },
        { status: 400 }
      );
    }

    const dbRef = ref(database, `users/${key}`);
    await update(dbRef, value);

    return NextResponse.json({ message: "Data updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update data", details: error },
      { status: 500 }
    );
  }
}

// DELETE: Delete user
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const key = url.searchParams.get("key");

    if (!key) {
      return NextResponse.json(
        { error: "Key is required to delete data" },
        { status: 400 }
      );
    }

    const dbRef = ref(database, `users/${key}`);
    await remove(dbRef);

    return NextResponse.json({ message: "Data deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete data", details: error },
      { status: 500 }
    );
  }
}
