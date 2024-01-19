"use client";

import { useEffect, useState } from "react";

import { PokemonResponseType, getPokemon } from "@/services/pokemon";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui-components/loading";

import { PokemonCard } from "./pokemon-card";

export const PokemonList = () => {
  const [itemPerPage, setItemPerPage] = useState<number>(10);
  const [data, setData] = useState<PokemonResponseType>();
  // const { data, error } = useSWR(
  //   getPokemon.url(`itemPerPage=${itemPerPage}`),
  //   getPokemon
  // );

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemon(
        getPokemon.url(`itemPerPage=${itemPerPage}`)
      );
      setData(data);
    };
    fetchData();
  }, [itemPerPage]);

  if (!data) return <Loading />;

  const handleLoadMore = () => {
    if (data && itemPerPage < data?.meta.totalItems) {
      setItemPerPage(itemPerPage + 10);
    }
  };

  return (
    <div className='py-8 flex flex-col items-center'>
      <div className='w-full py-8 max-w-screen-md grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4'>
        {data?.data.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      {data && itemPerPage < data?.meta.totalItems && (
        <Button variant='outline' onClick={handleLoadMore}>
          Load more
        </Button>
      )}
    </div>
  );
};
