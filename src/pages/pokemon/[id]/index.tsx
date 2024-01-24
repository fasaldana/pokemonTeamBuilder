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
        <div className="flex flex-col justify-center items-center bg-black bg-opacity-70 rounded-lg shadow-lg p-4 m-4">
            <Image 
                src="/arrow_back.png" 
                alt="back arrow" 
                width={25} 
                height={25} 
                className="hover:cursor-pointer hover:opacity-50 flex-1 self-start"
                onClick={() => router.back()}
            />
            <div className="flex justify-center items-center rounded-lg shadow-lg p-4 m-4">
                <Image src={image} alt={name} width={500} height={500} />
                <div className="flex flex-col justify-center items-start bg-zinc-800 rounded-lg p-4 w-1/2" >
                    <div className="flex flex-row justify-between w-full">
                        <h3 className="text-sm text-white">{name}</h3>
                        <h3 className="text-sm text-white">N° {id}</h3>
                    </div>
                    
                    <div className="flex flex-col justify-center items-start mt-3 gap-3">
                        <h4 className="text-sm font-bold text-orange-300">{types}</h4>
                        <p className="text-sm text-white">{pokemon.description}</p>
                    </div>
                    <div className="flex gap-28 w-full mt-3">
                        <p className="text-sm text-white flex flex-col items-center">
                            <strong>Heigth</strong>
                            {height}
                        </p>
                        <p className="text-sm text-white flex flex-col items-center">
                            <strong>Weigth</strong>
                            {weight}
                        </p>
                        <p className="text-sm text-white flex flex-col items-center">
                            <strong>Growth rate</strong>
                            {pokemon.growth_rate}
                        </p>
                    </div>
                    <div className="flex justify-center items-start mt-3 gap-28">
                        <ul className="text-sm text-white flex flex-col items-start">
                            <strong className="text-sm font-bold text-white">Abilities</strong>
                            {abilities}
                        </ul>
                        <ul className="text-sm text-white flex flex-col items-start">
                            <strong className="text-sm font-bold text-white">Egg groups</strong>
                            {pokemon.egg_groups}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
    };

export default PokeInfo;