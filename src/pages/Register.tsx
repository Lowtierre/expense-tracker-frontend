import { useState } from "react";
import API from "../services/api";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/auth/register", {
        username,
        email,
        password
      });
      setMessage(res.data.message);
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      console.error(err);
      setMessage(err.response?.data?.error || "Errore");
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="w-full max-w-md p-10 bg-white shadow-2xl rounded-3xl">
        <h2 className="mb-8 text-3xl font-extrabold text-center text-gray-800">
          Crea il tuo account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Inserisci il tuo username"
              className="w-full px-4 py-3 transition border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="w-full px-4 py-3 transition border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 transition border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 font-bold text-white transition transform shadow-lg rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105"
          >
            Registrati
          </button>
        </form>
        {message && (
          <p className="mt-4 font-medium text-center text-green-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Register;
