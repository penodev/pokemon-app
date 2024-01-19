import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { apiVerifyToken } from "@/lib/token";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await db.pokemon.findUnique({
      where: { id: params.id },
      include: {
        nextEvolution: true,
        prevEvolution: true,
      },
    });
    const nextEvolution = await db.pokemon.findMany({
      where: {
        OR: data?.nextEvolution.map((nextEvo) => {
          return { num: { contains: nextEvo.num } };
        }),
      },
    });
    const prevEvolution = await db.pokemon.findMany({
      where: {
        OR: data?.prevEvolution.map((prevEvo) => {
          return { num: { contains: prevEvo.num } };
        }),
      },
    });
    return NextResponse.json({
      data,
      nextEvolution: nextEvolution,
      prevEvolution: prevEvolution,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "not allow" }, { status: 400 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
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

  try {
    const data = await db.pokemon.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "update failed" }, { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await apiVerifyToken(req.headers.get("Authorization"));
    console.log(userId);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await db.pokemon.delete({
      where: { id: params.id },
    });
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "delete failed" }, { status: 400 });
  }
}
