import { db } from "@/lib/db";
import { apiVerifyToken } from "@/lib/token";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const userId = await apiVerifyToken(request.headers.get("Authorization"));
    console.log(userId);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const users = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "not allow" }, { status: 400 });
  }
}
