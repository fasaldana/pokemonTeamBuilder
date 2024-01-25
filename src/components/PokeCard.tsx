import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const PokeCard = ({
  id,
  name,
  image,
  types,
  handleSelectedPoke,
  height,
  weight,
  abilities,
  selectedNumber,
  isChecked,
}: {
  id: number;
  name: string;
  image: string;
  types: string;
  height: number;
  weight: number;
  abilities: string;
  selectedNumber: number;
  isChecked: boolean;
  handleSelectedPoke: (
    id: number,
    image: string,
    name: string,
    types: string,
    isChecked: boolean,
  ) => void;
}) => {

  const handleClick = () => {
    if (selectedNumber === 6 && !isChecked) {
      alert("You can only select 6 pokemon");
      return;
    }
    handleSelectedPoke(id, image, name, types, isChecked);
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-zinc-800 p-4 shadow-lg w-auto">
      <Image src={image} alt={name} width={200} height={200} />
      <h3 className="text-sm text-white">N° {id}</h3>
      <Link
        className="text-lg text-white hover:cursor-pointer hover:text-orange-300"
        href={{
          pathname: `/pokemon/${id}`,
          query: {
            id,
            name,
            image,
            types,
            height,
            weight,
            abilities,
          },
        }}
      >
        {name}
      </Link>
      <div className="flex flex-row items-center justify-center">
        <h4 className="text-lg font-bold text-orange-300">{types}</h4>
      </div>
      <label className="flex items-center mt-4">
        <input
          type="checkbox"
          checked={isChecked}
          className="form-checkbox h-5 w-5 text-gray-600"
          onChange={() => handleSelectedPoke(id, image, name, types, isChecked)}
        />
      </label>
    </div>
  );
};

export default PokeCard;
