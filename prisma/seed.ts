import { pokeList } from "@/constants/pokemon-init";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const createPokemon = async () => {
    for (const pokemon of pokeList) {
      await prisma.pokemon.upsert({
        where: { num: pokemon.num },
        update: {},
        create: {
          num: pokemon.num,
          name: pokemon.name,
          image: pokemon.img,
          type: pokemon.type,
          height: pokemon.height,
          weight: pokemon.weight,
          candy: pokemon.candy,
          egg: pokemon.egg,
          multipliers: pokemon.multipliers || [],
          weaknesses: pokemon.weaknesses,
          candyCount: pokemon.candy_count,
          spawnChance: pokemon.spawn_chance,
          avgSpawns: pokemon.avg_spawns,
          spawnTime: pokemon.spawn_time,
          prevEvolution: {
            createMany: {
              data: pokemon.prev_evolution || [],
            },
          },
          nextEvolution: {
            createMany: {
              data: pokemon.next_evolution || [],
            },
          },
        },
      });
    }
  };
  await createPokemon();
}

// * npx prisma db seed
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
