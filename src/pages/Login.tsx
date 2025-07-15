import { useState } from "react";
import API from "../services/api";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/auth/login", {
        email,
        password
      });

      setMessage(res.data.message);
      localStorage.setItem("token", res.data.token);
      setEmail("");
      setPassword("");
    } catch (err: any) {
      console.error(err);
      setMessage(err.response?.data?.error || "Errore");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Accedi</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;