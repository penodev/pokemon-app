import { NextResponse } from "next/server";

import { pokeList } from "@/constants/pokemon-init";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    // for (const pokemon of pokeList) {
    //   await db.pokemon.upsert({
    //     where: { num: pokemon.num },
    //     update: {},
    //     create: {
    //       num: pokemon.num,
    //       name: pokemon.name,
    //       image: pokemon.img,
    //       type: pokemon.type,
    //       height: pokemon.height,
    //       weight: pokemon.weight,
    //       candy: pokemon.candy,
    //       egg: pokemon.egg,
    //       multipliers: pokemon.multipliers || [],
    //       weaknesses: pokemon.weaknesses,
    //       candyCount: pokemon.candy_count,
    //       spawnChance: pokemon.spawn_chance,
    //       avgSpawns: pokemon.avg_spawns,
    //       spawnTime: pokemon.spawn_time,
    //       prevEvolution: {
    //         create: pokemon.prev_evolution || [],
    //       },
    //       nextEvolution: {
    //         create: pokemon.next_evolution || [],
    //       },
    //     },
    //   });
    // }

    return NextResponse.json({ success: "Seed success!" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "not allow" }, { status: 400 });
  }
}
