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
}: {
  id: number;
  name: string;
  image: string;
  types: string;
  height: number;
  weight: number;
  abilities: string;
  selectedNumber: number;
  handleSelectedPoke: (
    id: number,
    image: string,
    name: string,
    isChecked: boolean,
    types: string,
  ) => void;
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    if (selectedNumber === 6 && !isChecked) {
      alert("You can only select 6 pokemon");
      return;
    }
    setIsChecked(!isChecked);
    handleSelectedPoke(id, image, name, isChecked, types);
  };

  return (
    <div className="m-4 flex flex-col items-center justify-center rounded-lg bg-zinc-800 p-4 shadow-lg">
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
        <div className="m-1 px-4 py-1">
          <h4 className="text-lg font-bold text-orange-300">{types}</h4>
        </div>
      </div>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          className="form-checkbox h-5 w-5 text-gray-600"
          onChange={handleClick}
        />
      </label>
    </div>
  );
};

export default PokeCard;
