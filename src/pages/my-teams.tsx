import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import {
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";

const MyTeams = () => {
  const [teams, setTeams] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const request = async () => {
      const result = await fetch(
        `/api/teams/${JSON.parse(localStorage.getItem("user")).id}`,
      );
      const resultJson = await result.json();
      setLoading(false);
      setTeams(resultJson);
    };
    void request();
  }, []);

  const handleDeleteTeam = async (teamName: string) => {
    try {
      await fetch(`/api/teams/${JSON.parse(localStorage.getItem("user")).id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teamName: teamName,
        }),
      });
      // remove the team from the state
      const newTeams = { ...teams };
      delete newTeams[teamName];
      setTeams(newTeams);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-4 flex flex-col items-center justify-center rounded-lg bg-black bg-opacity-70 p-4 shadow-lg">
      <h1 className="text-2xl text-white">My Teams</h1>
      <div className="flex flex-wrap justify-center">
        {loading ? <h1 className="text-2xl text-white">Loading...</h1> : null}
        {Object.keys(teams).map((teamName) => (
          <div
            key={teamName}
            className="m-4 flex flex-col items-center justify-center p-4"
          >
            <h1 className="text-xl text-white">{teamName}</h1>
            <div className="flex flex-wrap">
              {teams[teamName].map(
                (team: {
                  pokemonName:
                    | boolean
                    | Key
                    | ReactElement<
                        unknown,
                        string | JSXElementConstructor<unknown>
                      >
                    | Iterable<ReactNode>
                    | PromiseLikeOfReactNode
                    | null
                    | undefined;
                  pokemonImg: string | StaticImport;
                  pokemonType:
                    | string
                    | number
                    | boolean
                    | ReactElement<
                        unknown,
                        string | JSXElementConstructor<unknown>
                      >
                    | Iterable<ReactNode>
                    | ReactPortal
                    | PromiseLikeOfReactNode
                    | null
                    | undefined;
                }) => (
                  <div
                    key={team.pokemonName}
                    className="m-4 flex flex-col items-center justify-center rounded-xl bg-zinc-800 shadow-lg"
                  >
                    <Image
                      src={team.pokemonImg}
                      width={150}
                      height={150}
                      alt="pokemon"
                    />
                    <h1 className="text-lg text-white">{team.pokemonName}</h1>
                    <h1 className="text-lg text-orange-300">
                      {team.pokemonType}
                    </h1>
                  </div>
                ),
              )}
            </div>
            <button
              type="button"
              className="rounded bg-orange-300 px-4 py-2 font-bold text-white hover:bg-orange-400"
              onClick={() => handleDeleteTeam(teamName)}
            >
              Delete team
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTeams;
