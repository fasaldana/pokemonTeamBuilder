/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from "react";
import Login from "~/components/Login";
import SignIn from "../components/signIn";

export default function Home() {
  interface User {
    name: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const handleLogin = async (email: unknown, password: unknown) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (response.status === 404) {
        setErrorMessage("Incorrect email or password");
        return;
      }
      const result = await response.json();
      setUser(result);
      localStorage.setItem("user", JSON.stringify(result));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignIn = async (
    name: string,
    email: string,
    password: string,
  ) => {
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      const result = await response.json();
      setUser(result);
      localStorage.setItem("user", JSON.stringify(result));
    } catch (error) {
      setErrorMessage("Error del servidor");
    }
  };

  const handleSignOut = async () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <div className="m-4 flex h-full flex-col items-center justify-center rounded-lg bg-zinc-800 p-4 shadow-lg">
      <h1 className="text-center text-4xl text-white">
        Welcome to the Pokedex
      </h1>
      {user ? (
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl text-white">Welcome {user.name}</h2>
          <button
            className="rounded bg-orange-300 px-4 py-2 font-bold text-white hover:bg-orange-400"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <Login handleLogin={handleLogin} errorMessage={errorMessage} />
          <SignIn handleSignIn={handleSignIn} />
        </div>
      )}
    </div>
  );
}
