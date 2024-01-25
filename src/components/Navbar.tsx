import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex w-full flex-col items-center justify-center bg-black bg-opacity-70 px-4 py-8">
      <Image src="/logo.png" width={150} height={150} alt="logo" />
      <div className="mt-4 flex gap-14 space-x-4 text-base text-white">
        <Link href="/">Home</Link>
        <Link href="/pokedex">Pokedex</Link>
        <Link href="/my-teams">My Teams</Link>
      </div>
    </nav>
  );
};

export default Navbar;
