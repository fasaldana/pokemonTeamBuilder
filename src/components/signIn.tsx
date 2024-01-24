import { useState } from "react";

const SignIn = ({ handleSignIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = async () => {
        try {
            await handleSignIn(
                name,
                email,
                password,
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center bg-zinc-800 rounded-lg shadow-lg p-4 m-4">
            <form onSubmit={handleSubmit}>
                <h1 className="text-2xl text-white">Sign In</h1>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-lg shadow-lg p-2 m-4"
                />

                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-lg shadow-lg p-2 m-4"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-lg shadow-lg p-2 m-4"
                />

                <button
                    type="button"
                    onClick={handleSubmit}
                    className="rounded-lg shadow-lg p-4 m-4 bg-zinc-900 text-white"
                >
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default SignIn;