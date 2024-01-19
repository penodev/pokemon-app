import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";
import { generateToken } from "@/lib/token";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    console.log(email);
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser || !existingUser.email || !existingUser.hashedPassword) {
      return NextResponse.json(
        { error: "Invalid credentials!" },
        { status: 403 }
      );
    }

    // const hashedPassword = await bcrypt.hash(password, 12);

    const matchesPassword = await bcrypt.compare(
      password,
      existingUser.hashedPassword
    );

    if (matchesPassword) {
      const token = await generateToken({
        id: existingUser.id,
        email: existingUser.email,
      });
      console.log(token);
      return NextResponse.json(token);
    }

    return NextResponse.json("success");
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err }, { status: 400 });
  }
}
