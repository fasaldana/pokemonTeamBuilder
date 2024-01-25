import { useState } from "react";

type HandleLoginFunction = (email: string, password: string) => void;

const Login = ({
  handleLogin,
  errorMessage,
}: {
  handleLogin: HandleLoginFunction;
  errorMessage: string;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    handleLogin(email, password);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="m-4 flex flex-col items-center justify-center rounded-lg bg-zinc-800 p-4 shadow-lg">
          <h1 className="text-2xl text-white">Login</h1>
          <form
            className="flex flex-col items-center justify-center"
            onSubmit={handleSubmit}
          >
            <input
              className="m-4 rounded-lg p-4 shadow-lg"
              type="email"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              className="m-4 rounded-lg p-4 shadow-lg"
              type="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              className="m-4 rounded-lg bg-orange-300 px-4 py-2 font-bold text-white hover:bg-orange-400"
              type="submit"
            >
              Login
            </button>
            {errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : null}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
