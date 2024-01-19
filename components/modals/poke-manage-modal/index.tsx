"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { NextEvolution, PrevEvolution } from "@prisma/client";

import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import useDataGroupModal from "@/hooks/use-data-group-modal";
import { patchPokemonById, postPokemon } from "@/services/pokemon";
import { InputBox } from "@/components/ui-components/input-box";

export const PekeManageModal = () => {
  const { isOpen, onClose, data } = useDataGroupModal();
  const [num, setNum] = useState<string>();
  const [name, setName] = useState<string>();
  const [image, setImage] = useState<string>();
  const [type, setType] = useState<string>(); // should be string[]
  const [height, setHeight] = useState<string>();
  const [weight, setWeight] = useState<string>();
  const [candy, setCandy] = useState<string>();
  const [egg, setEgg] = useState<string>();

  const [multipliers, setMultipliers] = useState<string>(); // should be number[]
  const [weaknesses, setWeakness] = useState<string>(); // should be string[]
  const [candyCount, setCandyCount] = useState<number | null>();
  const [spawnChance, setSpawnChance] = useState<number>();
  const [avgSpawns, setAvgSpawns] = useState<number>();
  const [spawnTime, setSpawnTime] = useState<string>();

  const [prevEvoId, setPrevEvoId] = useState<PrevEvolution[]>();
  const [nextEvoId, setNextEvoId] = useState<NextEvolution[]>();

  useEffect(() => {
    setNum(data?.num);
    setName(data?.name);
    setImage(data?.image);
    setType(data?.type[0] ? String(data?.type) : undefined);
    setHeight(data?.height);
    setWeight(data?.weight);
    setCandy(data?.candy);
    setEgg(data?.egg);
    setMultipliers(
      data?.multipliers[0] ? String(data?.multipliers) : undefined
    );
    setWeakness(data?.weaknesses[0] ? String(data?.weaknesses) : undefined);
    setCandyCount(data?.candyCount);
    setSpawnChance(data?.spawnChance);
    setAvgSpawns(data?.avgSpawns);
    setSpawnTime(data?.spawnTime);
  }, [data]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (data?.id && name) {
      const res = await patchPokemonById(data.id, {
        name,
        image,
        type,
        height,
        weight,
        candy,
        egg,
        multipliers,
        weaknesses,
        candyCount,
        spawnChance,
        avgSpawns,
        spawnTime,
      });
      if (res) {
        onClose();
      }
    } else {
      if (
        name &&
        image &&
        type &&
        height &&
        weight &&
        candy &&
        egg &&
        multipliers &&
        weaknesses &&
        candyCount &&
        spawnChance &&
        avgSpawns &&
        spawnTime
      ) {
        const res = await postPokemon({
          name,
          image,
          type,
          height,
          weight,
          candy,
          egg,
          multipliers,
          weaknesses,
          candyCount,
          spawnChance,
          avgSpawns,
          spawnTime,
        });
        if (!!res) {
          onClose();
        }
      }
    }
  };

  return (
    <Modal
      title='Pokemon management'
      description='You can create or edit pokemon list here'
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={onSubmit} className='flex flex-col gap-4'>
        <div className='flex gap-3'>
          <InputBox
            name='num'
            label='num'
            setState={setNum}
            value={num}
            disabled
          />
          <InputBox name='name' label='name' setState={setName} value={name} />
        </div>
        <InputBox
          name='image'
          label='image'
          setState={setImage}
          value={image}
        />
        <div className='flex gap-3'>
          {/* should be select dropdown */}
          <InputBox name='type' label='type' setState={setType} value={type} />
          <InputBox
            name='height'
            label='height'
            setState={setHeight}
            value={height}
          />
          <InputBox
            name='weight'
            label='weight'
            setState={setWeight}
            value={weight}
          />
        </div>
        <div className='flex gap-3'>
          <InputBox
            name='candy'
            label='candy'
            setState={setCandy}
            value={candy}
          />
          <InputBox name='egg' label='egg' setState={setEgg} value={egg} />
          <InputBox
            name='multipliers'
            label='multipliers' //should be select dropdown
            setState={setMultipliers}
            value={multipliers}
          />
        </div>
        <InputBox
          name='weaknesses'
          label='weaknesses' //should be select dropdown
          setState={setWeakness}
          value={weaknesses}
        />
        <div className='flex gap-3'>
          <InputBox
            name='candyCount'
            label='candyCount'
            setState={setCandyCount}
            value={candyCount || undefined}
          />
          <InputBox
            name='spawnChance'
            label='spawnChance'
            setState={setSpawnChance}
            value={spawnChance}
          />
          <InputBox
            name='avgSpawns'
            label='avgSpawns'
            setState={setAvgSpawns}
            value={avgSpawns}
          />
          <InputBox
            name='spawnTime'
            label='spawn time'
            setState={setSpawnTime}
            value={spawnTime}
          />
        </div>
        <Button type='submit'>Submit</Button>
      </form>
    </Modal>
  );
};
