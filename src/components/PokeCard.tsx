import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const PokeCard = ({ id, name, image, types, handleSelectedPoke, height, weight, abilities, selectedNumber }:
    { id: number, name: string, image: string, types: string, height: number, weight: number, abilities: string, selectedNumber: number,
        handleSelectedPoke: (id: number, image: string, name: string, isChecked: boolean, types: string) => void }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleClick = () => {
        if(selectedNumber === 6 && !isChecked) {
            alert("You can only select 6 pokemon");
            return;
        }
        setIsChecked(!isChecked);
        handleSelectedPoke(id, image, name, isChecked, types);
    }

    return (
        <div className="flex flex-col justify-center items-center bg-zinc-800 rounded-lg shadow-lg p-4 m-4">
            <Image src={image} alt={name} width={200} height={200} />
            <h3 className="text-sm text-white">N° {id}</h3>
            <Link 
                className="text-lg text-white hover:text-orange-300 hover:cursor-pointer" 
                href={{
                    pathname: `/pokemon/${id}`,
                    query: {
                        id,
                        name,
                        image,
                        types,
                        height,
                        weight,
                        abilities
                    }
                }} >
                    {name}
            </Link>
            <div className="flex flex-row justify-center items-center">
                <div className="px-4 py-1 m-1">
                    <h4 className="text-lg font-bold text-orange-300">{types}</h4>
                </div>
            </div>
            <label>
                <input type="checkbox" checked={isChecked} className="form-checkbox h-5 w-5 text-gray-600" onChange={handleClick} />
            </label>
        </div>
    );
}

export default PokeCard;