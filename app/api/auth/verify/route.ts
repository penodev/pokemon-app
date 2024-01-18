import { verifyToken } from "@/lib/token";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    const res = await verifyToken(token);
    return NextResponse.json(res);
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}
