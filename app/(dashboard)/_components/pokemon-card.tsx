"use client";

import { Pokemon } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <div>
      <div
        className='h-80 w-60 flex flex-col border border-solid
      rounded-md p-3 gap-2'
      >
        <Link
          href={`/pokemon-detail?pokeId=${pokemon.id}`}
          className='w-full h-40 flex justify-center cursor-pointer'
        >
          <Image src={pokemon.image} alt='pokemon' width={160} height={160} />
        </Link>
        <div>#{pokemon.num}</div>
        <div>{pokemon.name}</div>
        <div className='flex gap-2'>
          {pokemon.type.map((type) => (
            <Button key={type + pokemon.num}>{type}</Button>
          ))}
        </div>
      </div>
    </div>
  );
};
