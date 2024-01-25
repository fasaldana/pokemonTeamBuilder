/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import Image from "next/image";
import { useEffect, useState } from "react";
import Team from "~/components/Team";

const MyTeams = () => {
  const [teams, setTeams] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
    setSaving(true);
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
      setSaving(false);
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
          <Team
            key={teamName}
            teamName={teamName}
            teams={teams}
            saving={saving}
            handleDeleteTeam={handleDeleteTeam}
          />
        ))}
      </div>
    </div>
  );
};

export default MyTeams;
