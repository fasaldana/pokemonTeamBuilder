import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PokeInfo = () => {
  const router = useRouter();
  const { id, name, image, types, height, weight, abilities } = router.query;

  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    const request = async () => {
      const result = await fetch(`/api/pokemon/${id}`);
      const resultJson = await result.json();
      setPokemon(resultJson);
    };
    void request();
  }, []);

  return (
    <div className="m-4 flex flex-col items-center justify-center rounded-lg bg-black bg-opacity-70 p-4 shadow-lg">
      <Image
        src="/arrow_back.png"
        alt="back arrow"
        width={25}
        height={25}
        className="flex-1 self-start hover:cursor-pointer hover:opacity-50"
        onClick={() => router.back()}
      />
      <div className="m-4 flex items-center justify-center rounded-lg p-4 shadow-lg">
        <Image src={image} alt={name} width={500} height={500} />
        <div className="flex w-1/2 flex-col items-start justify-center rounded-lg bg-zinc-800 p-4">
          <div className="flex w-full flex-row justify-between">
            <h3 className="text-sm text-white">{name}</h3>
            <h3 className="text-sm text-white">N° {id}</h3>
          </div>

          <div className="mt-3 flex flex-col items-start justify-center gap-3">
            <h4 className="text-sm font-bold text-orange-300">{types}</h4>
            <p className="text-sm text-white">{pokemon.description}</p>
          </div>
          <div className="mt-3 flex w-full gap-28">
            <p className="flex flex-col items-center text-sm text-white">
              <strong>Heigth</strong>
              {height}
            </p>
            <p className="flex flex-col items-center text-sm text-white">
              <strong>Weigth</strong>
              {weight}
            </p>
            <p className="flex flex-col items-center text-sm text-white">
              <strong>Growth rate</strong>
              {pokemon.growth_rate}
            </p>
          </div>
          <div className="mt-3 flex items-start justify-center gap-28">
            <ul className="flex flex-col items-start text-sm text-white">
              <strong className="text-sm font-bold text-white">
                Abilities
              </strong>
              {abilities}
            </ul>
            <ul className="flex flex-col items-start text-sm text-white">
              <strong className="text-sm font-bold text-white">
                Egg groups
              </strong>
              {pokemon.egg_groups}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokeInfo;
