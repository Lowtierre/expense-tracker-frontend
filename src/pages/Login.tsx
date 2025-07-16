import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import API from "../services/api";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";

const schema = yup.object({
  email: yup
    .string()
    .email("Inserisci un'email valida")
    .required("L'email è obbligatoria"),
  password: yup
    .string()
    .min(8, "La password deve avere almeno 8 caratteri")
    .required("La password è obbligatoria"),
});

type LoginFormInputs = yup.InferType<typeof schema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const res = await API.post("/api/auth/login", data);
      login(res.data.token);
      reset();
      // 🔥 redirect alla pagina da cui proveniva l'utente
      const redirectTo = (location.state as any)?.from?.pathname || "/";
      navigate(redirectTo, { replace: true });
      toast.success("Login effettuato!");
      // puoi fare redirect qui, se vuoi
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.error || "Errore durante il login");
    }
  };

  return (
    <div
      style={{ minHeight: "calc(100vh - 64px)" }}
      className="flex justify-center items-center bg-gradient-to-br from-blue-500 to-purple-600"
    >
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8">Accedi</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              {...register("email")}
              className={`w-full text-black px-4 py-3 rounded-xl border ${
                errors.email
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-300"
              } focus:outline-none focus:ring-4 transition`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className={`w-full text-black px-4 py-3 rounded-xl border ${
                errors.password
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-300"
              } focus:outline-none focus:ring-4 transition`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold hover:from-blue-600 hover:to-purple-700 transition transform hover:scale-105 shadow-lg"
          >
            Accedi
          </button>
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Hai dimenticato la password?{" "}
              <Link
                to="/forgot-password"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Recuperala qui
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
