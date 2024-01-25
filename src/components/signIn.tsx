import { useState } from "react";

type HandleSignInFunction = (
  name: string,
  email: string,
  password: string,
) => void;

const SignIn = ({ handleSignIn }: { handleSignIn: HandleSignInFunction }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    try {
      handleSignIn(name, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-4 flex flex-col items-center justify-center rounded-lg bg-zinc-800 p-4 shadow-lg">
      <form onSubmit={handleSubmit} className="flex  items-center">
        <h1 className="text-2xl text-white">Sign In</h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="m-4 rounded-lg p-2 shadow-lg"
        />

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="m-4 rounded-lg p-2 shadow-lg"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="m-4 rounded-lg p-2 shadow-lg"
        />

        <button
          type="button"
          onClick={handleSubmit}
          className="m-4 rounded-lg bg-zinc-900 p-4 text-white shadow-lg hover:bg-zinc-700"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
