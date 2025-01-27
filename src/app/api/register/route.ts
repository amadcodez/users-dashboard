import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password, contact, profilePicture } = body;

    // Validate the profile picture (optional, can add stricter checks for size and type)
    if (profilePicture && !profilePicture.startsWith("data:image")) {
      return NextResponse.json(
        { success: false, message: "Invalid profile picture format." },
        { status: 400 }
      );
    }

    // Check if email already exists
    const client = await clientPromise;
    const db = client.db("myDBClass");
    const existingUser = await db.collection("myCollectionMyDBClass").findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already registered." },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user
    const result = await db.collection("myCollectionMyDBClass").insertOne({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      contact,
      profilePicture, // Store the profile picture in the database
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
