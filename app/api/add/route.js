import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body || !body.handle) {
      return NextResponse.json(
        { success: false, error: true, message: "Handle is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("linktree");
    const collection = db.collection("links");

    // Optional: check if handle already exists
    const existing = await collection.findOne({ handle: body.handle });
    if (existing) {
      return NextResponse.json(
        { success: false, error: true, message: "Handle already exists" },
        { status: 409 }
      );
    }

    const result = await collection.insertOne(body);

    return NextResponse.json({
      success: true,
      error: false,
      message: "Your Bittree has been created successfully",
      result: result,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: true, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
