import { useEffect, useState } from "react";
import Login from "~/components/Login";
import SignIn from "../components/signIn";

export default function Home() {

  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const handleLogin = async (email, password) => {
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
  }

  const handleSignIn = async (name: string, email: string, password: string) => {
    console.log("Sign In");
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
      console.log(error);
      setErrorMessage("Error del servidor");
    }
  }

  const handleSignOut = async () => {
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <div className="flex flex-col justify-center items-center bg-zinc-800 rounded-lg shadow-lg p-4 m-4 h-full">
      <h1 className="text-4xl text-center text-white">Welcome to the Pokedex</h1>
      {user ? (
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-2xl text-white">Welcome {user.name}</h2>
          <button className="bg-orange-300 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <Login handleLogin={handleLogin} errorMessage={errorMessage} />
          <SignIn handleSignIn={handleSignIn} />
        </div>
      )}
    </div>
  )
}
