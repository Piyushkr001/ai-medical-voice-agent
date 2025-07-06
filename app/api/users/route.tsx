import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, clerkId, image } = body;

    if (!email || !name || !clerkId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingUsers = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (existingUsers.length === 0) {
      const result = await db
        .insert(usersTable)
        //@ts-ignore
        .values({
          name,
          email,
          clerkId,
          credits: 10,
        })
        //@ts-ignore
        .returning({usersTable});

      return NextResponse.json(result[0]?.usersTable);
    }

    return NextResponse.json(existingUsers[0]);
  } catch (error: any) {
    console.error("❌ API /users error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// continue to 1:04:30