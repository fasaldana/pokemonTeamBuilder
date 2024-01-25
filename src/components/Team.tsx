/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import Image from "next/image";

const Team = ({
  teams,
  saving,
  teamName,
  handleDeleteTeam,
}: {
  teams: unknown;
  saving: boolean;
  teamName: string;
  handleDeleteTeam: (teamName: string) => void;
}) => {
  return (
    <div
      key={teamName}
      className="m-4 flex flex-col items-center justify-center p-4 capitalize"
    >
      <h1 className="text-xl text-white">{teamName}</h1>
      <div className="flex flex-wrap">
        {teams[teamName].map((team) => (
          <div
            key={team.pokemonName}
            className="m-2 flex flex-col items-center justify-center rounded-xl bg-zinc-800 p-4 shadow-lg"
          >
            <Image
              src={team.pokemonImg}
              width={150}
              height={150}
              alt="pokemon"
            />
            <h1 className="text-lg text-white">{team.pokemonName}</h1>
            <h1 className="text-lg text-orange-300">{team.pokemonType}</h1>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mt-6 rounded bg-orange-300 px-4 py-2 font-bold text-white hover:bg-orange-400"
        onClick={() => handleDeleteTeam(teamName)}
      >
        {saving ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};

export default Team;
