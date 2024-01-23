import Image from "next/image";

const SelectedPoke = ({ image, name }: { image: string, name: string }) => {
    return (
      <>
        <div className="w-20 h-20 rounded-full bg-white"
          style={{ backgroundImage: "url('/pokeball.png')", backgroundSize: "cover", backgroundPosition: "center" }} >
          <Image src={image} alt={name} width={200} height={200} />
        </div>
      </> 
    );
}

export default SelectedPoke;