import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import API from "../services/api";
import { useEffect } from "react";

const schema = yup.object({
  username: yup.string().required("Username obbligatorio"),
  email: yup.string().email("Email non valida").required("Email obbligatoria"),
  currentPassword: yup.string().when("newPassword", {
    is: (val: string) => val && val.length > 0,
    then: (schema) => schema.required("Devi inserire la password attuale"),
  }),
  newPassword: yup
    .string()
    .min(8, "La nuova password deve avere almeno 8 caratteri")
    .notRequired(),
  confirmPassword: yup.string().when("newPassword", {
    is: (val: string) => val && val.length > 0,
    then: (schema) =>
      schema
        .required("Devi confermare la nuova password")
        .oneOf([yup.ref("newPassword")], "Le due password non coincidono"),
  }),
});

type ProfileFormInputs = yup.InferType<typeof schema>;

const Profile = () => {
  const { user, logout } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormInputs>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (user) {
      API.get(`/api/users/${user.id}`)
        .then((res) => {
          reset({
            username: res.data.username,
            email: res.data.email,
          });
        })
        .catch((err) => {
          console.error(err);
          toast.error(
            err.response?.data?.error || "Errore nel caricamento del profilo"
          );
        });
    }
  }, [user, reset]);

  const onSubmit = async (data: ProfileFormInputs) => {
    try {
      await API.put(`/api/users/${user?.id}`, data);
      toast.success("Profilo aggiornato!");
      reset({
        username: data.username,
        email: data.email,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      console.error(error);
      toast.error(
        error.response?.data?.error || "Errore durante il salvataggio."
      );
    }
  };

  if (!user) {
    return (
      <div
        style={{ minHeight: "calc(100vh - 64px)" }}
        className="flex justify-center items-center bg-gradient-to-br from-blue-500 to-purple-600"
      >
        <p className="text-white text-lg">Nessun utente loggato.</p>
      </div>
    );
  }

  return (
    <div
      style={{ minHeight: "calc(100vh - 64px)" }}
      className="flex justify-center items-center bg-gradient-to-br from-blue-500 to-purple-600"
    >
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
          Il tuo Profilo
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              {...register("username")}
              placeholder="Inserisci il tuo username"
              className={`w-full text-black px-4 py-3 rounded-xl border ${
                errors.username
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-300"
              } focus:outline-none focus:ring-4 transition`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="es. email@example.com"
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

          {/* Password attuale */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password attuale
            </label>
            <input
              type="password"
              {...register("currentPassword")}
              placeholder="Inserisci la password attuale"
              className={`w-full text-black px-4 py-3 rounded-xl border ${
                errors.currentPassword
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-300"
              } focus:outline-none focus:ring-4 transition`}
            />
            {errors.currentPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* Nuova password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Nuova Password
            </label>
            <input
              type="password"
              {...register("newPassword")}
              placeholder="Inserisci la nuova password"
              className={`w-full text-black px-4 py-3 rounded-xl border ${
                errors.newPassword
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-300"
              } focus:outline-none focus:ring-4 transition`}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Conferma password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Conferma nuova password
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Ripeti la nuova password"
              className={`w-full text-black px-4 py-3 rounded-xl border ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-300"
              } focus:outline-none focus:ring-4 transition`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold hover:from-blue-600 hover:to-purple-700 transition transform hover:scale-105 shadow-lg"
          >
            Salva Modifiche
          </button>

          <button
            onClick={logout}
            type="button"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-bold hover:from-red-600 hover:to-red-700 transition transform hover:scale-105 shadow-lg"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
