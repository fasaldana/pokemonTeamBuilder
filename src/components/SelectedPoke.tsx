import Image from "next/image";

const SelectedPoke = ({
  id,
  image,
  name,
  types,
  handleRemove,
}: {
  id: number;
  image: string;
  name: string;
  types: string;
  handleRemove: (
    id: number,
  ) => void;
}) => {

  const handleClick = () => {
    handleRemove(id);
  };
  
  return (
    <div className="flex items-center w-full justify-between">
      <div
        className="h-20 w-20 rounded-full bg-white"
        style={{
          backgroundImage: "url('/pokeball.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Image src={image} alt={name} width={300} height={300} />
      </div>
      <div className="flex flex-col items-end capitalize">
        <h3 className="text-base text-white">{name}</h3>
        <h4 className="text-base text-orange-300 pt-1">{types}</h4>
        <button 
          className="text-base text-red-400 pt-1"
          onClick={handleClick}
        >
          remove
        </button>
      </div>
    </div>
  );
};

export default SelectedPoke;
