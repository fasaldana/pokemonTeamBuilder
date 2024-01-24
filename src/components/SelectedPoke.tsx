import Image from "next/image";

const SelectedPoke = ({
  image,
  name,
  types,
}: {
  image: string;
  name: string;
  types: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="h-20 w-20 rounded-full bg-white"
        style={{
          backgroundImage: "url('/pokeball.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Image src={image} alt={name} width={200} height={200} />
      </div>
      <h3 className="text-sm text-white">{name}</h3>
      <h4 className="text-sm text-orange-300">{types}</h4>
    </div>
  );
};

export default SelectedPoke;
