import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header
      className="
        fixed w-full top-0 z-50
        bg-gray-800 text-white px-8 py-4
        flex justify-between items-center
        shadow-md
      "
    >
      <h1 className="text-2xl font-bold">
        <Link to="/">Expense Tracker</Link>
      </h1>

      <div className="flex gap-8 items-center gap-4">
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/expenses">Spese</Link>
            <Link to="/profile">Profilo</Link>
            <Link to="/login" className="text-white" onClick={logout}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registrati</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
