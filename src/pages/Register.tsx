import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import API from "../services/api";
import toast from "react-hot-toast";

const schema = yup.object({
  username: yup
    .string()
    .min(3, "Lo username deve avere almeno 3 caratteri")
    .required("Lo username è obbligatorio"),
  email: yup
    .string()
    .email("Inserisci un'email valida")
    .required("L'email è obbligatoria"),
  password: yup
    .string()
    .min(8, "La password deve avere almeno 8 caratteri")
    .required("La password è obbligatoria"),
});

type RegisterFormInputs = yup.InferType<typeof schema>;

const Register = () => {
  const { register, handleSubmit, reset } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const res = await API.post("/api/auth/register", data);
      toast.success(res.data.message);
      reset();
      // puoi fare redirect qui
    } catch (err: any) {
      console.error(err);
      toast.error(
        err.response?.data?.error || "Errore durante la registrazione"
      );
    }
  };

  return (
    <div
      style={{ minHeight: "calc(100vh - 64px)" }}
      className="flex justify-center items-center bg-gradient-to-br from-blue-500 to-purple-600"
    >
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8">
          Crea il tuo account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Inserisci il tuo username"
              {...register("username")}
              className="w-full text-black px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              {...register("email")}
              className="w-full text-black px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className="w-full text-black px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold hover:from-blue-600 hover:to-purple-700 transition transform hover:scale-105 shadow-lg"
          >
            Registrati
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
