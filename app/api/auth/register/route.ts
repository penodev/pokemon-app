import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, name, password } = await req.json();
    console.log(email);
    const existingUser = await db.user.findMany({
      where: {
        email,
      },
    });
    if (!!existingUser[0]) {
      return NextResponse.json({ error: "Email taken" }, { status: 422 });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await db.user.create({
      data: {
        email,
        name,
        hashedPassword,
        createdAt: new Date(),
      },
    });
    return NextResponse.json("success");
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err }, { status: 400 });
  }
}
