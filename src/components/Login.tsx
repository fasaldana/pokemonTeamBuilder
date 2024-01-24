import { useState } from "react";

const Login = ({ handleLogin }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin(email, password);
    }
    
    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center bg-zinc-800 rounded-lg shadow-lg p-4 m-4">
                    <h1 className="text-2xl text-white">Login</h1>
                    <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                        <input
                            className="rounded-lg shadow-lg p-4 m-4"
                            type="email"
                            placeholder="Email"
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <input
                            className="rounded-lg shadow-lg p-4 m-4"
                            type="password"
                            placeholder="Password"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <button
                            className="rounded-lg shadow-lg p-4 m-4 bg-zinc-900 text-white"
                            type="submit"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;