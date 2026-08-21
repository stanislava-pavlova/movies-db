import { NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("disney-clone");
    const profiles = await db.collection("profiles").find({}).toArray();

    return NextResponse.json(profiles);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch profiles" },
      { status: 500 },
    );
  }
}
