import { Pokemon } from "@prisma/client";

import { request, SuccessResponseType } from "./request";

const subUrl = "/pokemon";

export interface PokemonResponseType {
  data: Pokemon[];
  meta: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    itemPerPage: number;
  };
}

export interface PokemonWithEvoResponseType {
  data: Pokemon;
  nextEvolution: Pokemon[];
  prevEvolution: Pokemon[];
}

interface PostPokemonType {
  name: string;
  image: string;
  type: string;
  height: string;
  weight: string;
  candy: string;
  egg: string;
  multipliers: string;
  weaknesses: string;
  candyCount: number | null;
  spawnChance: number;
  avgSpawns: number;
  spawnTime: string;
}

interface PatchPokemonType {
  name?: string;
  image?: string;
  type?: string;
  height?: string;
  weight?: string;
  candy?: string;
  egg?: string;
  multipliers?: string;
  weaknesses?: string;
  candyCount?: number | null;
  spawnChance?: number;
  avgSpawns?: number;
  spawnTime?: string;
}

export const getPokemon = (url: string) =>
  request.get<PokemonResponseType>(url);
getPokemon.url = (params: string) => `${subUrl}?${params}`;

export const getPokemonById = (url: string) =>
  request.get<PokemonWithEvoResponseType>(url);
getPokemonById.url = (id: string) => `${subUrl}/${id}`;

export const postPokemon = async (body: PostPokemonType) => {
  const url = subUrl;
  const data = await request<SuccessResponseType>({
    method: "post",
    url: url,
    body: JSON.stringify(body),
  });
  return data;
};

export const patchPokemonById = async (id: string, body: PatchPokemonType) => {
  const url = `${subUrl}/${id}`;
  const data = await request<SuccessResponseType>({
    method: "patch",
    url: url,
    body: JSON.stringify(body),
  });
  return data;
};

export const deletePokemonById = async (id: string) => {
  const url = `${subUrl}/${id}`;
  const data = await request<SuccessResponseType>({
    method: "delete",
    url: url,
  });
  return data;
};
