import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{ minHeight: "calc(100vh - 64px)" }}
      className="flex flex-col justify-center items-center bg-gradient-to-br from-red-500 to-purple-600 text-white text-center p-6"
    >
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-8">Pagina non trovata</h2>

      <Link
        to="/"
        className="px-6 py-3 bg-white text-red-600 font-semibold rounded-xl hover:bg-gray-100 transition"
      >
        Torna alla Home
      </Link>
    </div>
  );
};

export default NotFound;
