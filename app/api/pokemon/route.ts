import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { apiVerifyToken } from "@/lib/token";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const itemPerPage = Number(searchParams.get("itemPerPage") || 10);
    const currentPage = Number(searchParams.get("currentPage") || 1);
    const skip = (currentPage - 1) * itemPerPage;

    const count = await db.pokemon.count();
    const data = await db.pokemon.findMany({ skip, take: itemPerPage });
    return NextResponse.json({
      meta: {
        totalItems: count,
        currentPage,
        totalPages: Math.ceil(count / itemPerPage),
        itemPerPage: itemPerPage,
      },
      data,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function POST(req: Request) {
  const userId = await apiVerifyToken(req.headers.get("Authorization"));
  console.log(userId);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const requestBody = await req.json();
  const body = {
    name: requestBody.name,
    image: requestBody.image,
    type: requestBody.type.split(","),
    height: requestBody.height,
    weight: requestBody.weight,
    candy: requestBody.candy,
    egg: requestBody.egg,
    multipliers:
      requestBody.multipliers.split(",").map((i: string) => Number(i)) || [],
    weaknesses: requestBody.weaknesses.split(","),
    candyCount: Number(requestBody.candyCount),
    spawnChance: Number(requestBody.spawnChance),
    avgSpawns: Number(requestBody.avgSpawns),
    spawnTime: requestBody.spawnTime,
    // prevEvolution: {
    //   create: requestBody.prev_evolution || [],
    // },
    // nextEvolution: {
    //   create: requestBody.next_evolution || [],
    // },
  };
  console.log(body);
  try {
    const count = await db.pokemon.count();
    const num = (count + 1).toString().padStart(3, "0");
    const groups = await db.pokemon.create({
      data: { num, ...body },
    });
    return NextResponse.json(groups);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "create user failed" }, { status: 400 });
  }
}
