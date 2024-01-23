import Image from "next/image";
import { useState } from "react";

const PokeCard = ({ id, name, image, types, handleSelectedPoke }: { id: number, name: string, image: string, types: string, handleSelectedPoke: (image: string, name: string) => void }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleClick = () => {
        handleSelectedPoke(image, name);
        console.log("click");
    }

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    }

    return (
        <div className="flex flex-col justify-center items-center bg-zinc-800 rounded-lg shadow-lg p-4 m-4"
            onClick={handleClick}
        >
            <Image src={image} alt={name} width={200} height={200} />
            <h3 className="text-sm text-white">N° {id}</h3>
            <h2 className="text-lg text-white">{name}</h2>
            <div className="flex flex-row justify-center items-center">
                <div className="px-4 py-1 m-1">
                    <h4 className="text-lg font-bold text-orange-300">{types}</h4>
                </div>
            </div>
            <label>
                <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
            </label>
        </div>
    );
}

export default PokeCard;