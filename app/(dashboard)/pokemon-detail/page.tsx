"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { ArrowLeft, ArrowLeftCircle } from "lucide-react";
import Link from "next/link";

import { getPokemonById } from "@/services/pokemon";
import { Loading } from "@/components/ui-components/loading";

import { LabelItem } from "./_components/label-item";
import { PokemonCard } from "../_components/pokemon-card";

const PokemonDetailPage = () => {
  const searchParams = useSearchParams();
  const pokeId = searchParams.get("pokeId");

  const { data, error } = useSWR(
    getPokemonById.url(pokeId || ""),
    getPokemonById
  );

  if (!pokeId) {
    return <div>404 Not found</div>;
  }

  if (!data) return <Loading />;

  return (
    <div className='flex justify-center'>
      <Link href='/' className='absolute left-2 top-2'>
        <ArrowLeftCircle
          className='text-neutral-500 h-8 w-8 cursor-pointer
        hover:scale-105 hover:text-neutral-600'
        />
      </Link>
      <div className='w-full max-w-screen-md py-16 space-y-4'>
        <div className='text-3xl text-center'>
          {data.data.name} #{data.data.num}
        </div>
        <div className='flex flex-col md:flex-row items-center gap-4'>
          <div className='px-4'>
            <Image
              src={data.data.image}
              alt='pokemon'
              width={400}
              height={400}
            />
          </div>
          <div className='flex flex-col space-y-1 text-sm md:text-base'>
            <LabelItem title='type' value={String(data.data.type)} />
            <LabelItem title='height' value={data.data.height} />
            <LabelItem title='weight' value={data.data.weight} />
            <LabelItem title='candy' value={data.data.candy} />
            <LabelItem title='egg' value={data.data.egg} />
            <LabelItem
              title='multipliers'
              value={String(data.data.multipliers)}
            />
            <LabelItem
              title='weaknesses'
              value={String(data.data.weaknesses)}
            />
            <LabelItem title='candy count' value={data.data.candyCount!} />
            <LabelItem title='spawn chance' value={data.data.spawnChance} />
            <LabelItem title='average spawn' value={data.data.avgSpawns} />
            <LabelItem title='spawn time' value={data.data.spawnTime} />
          </div>
        </div>
        <div className='space-y-2 px-4'>
          <label>Previous Evolution</label>
          <div className='flex flex-wrap gap-4'>
            {data.prevEvolution.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        </div>
        <div className='space-y-2 px-4'>
          <label>Next Evolution</label>
          <div className='flex flex-wrap gap-4'>
            {data.nextEvolution.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailPage;
