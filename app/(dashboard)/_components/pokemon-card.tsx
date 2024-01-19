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
        className='h-52 w-40 md:h-80 md:w-60 flex flex-col border border-solid
      rounded-md p-3 gap-1 text-xs md:gap-2 md:text-base'
      >
        <Link
          href={`/pokemon-detail?pokeId=${pokemon.id}`}
          className='relative w-24 h-28 md:w-32 md:h-40 mx-auto flex justify-center cursor-pointer'
        >
          <Image
            src={pokemon.image}
            className='object-cover'
            alt='pokemon'
            fill
          />
        </Link>
        <div>#{pokemon.num}</div>
        <div>{pokemon.name}</div>
        <div className='flex gap-2 overflow-hidden'>
          {pokemon.type.map((type) => (
            <Button
              key={type + pokemon.num}
              className='h-6 md:h-10 text-xs md:text-base px-2 md:px-4'
            >
              {type}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
