import Image from "next/image";
import Link from "next/link";

const Navbar = () => {

  return (
    <nav className="flex items-center w-full px-4 py-8 bg-black bg-opacity-70 justify-center flex-col">
      <Image src="/logo.png" width={100} height={100} alt="logo" />
      <div className="flex space-x-4 mt-4 text-white text-base gap-14">
        <Link href="/">Home</Link>
        <Link href="/pokedex">Pokedex</Link>
        <Link href="/my-teams">My Teams</Link>
      </div>
    </nav>
  );
};

export default Navbar;