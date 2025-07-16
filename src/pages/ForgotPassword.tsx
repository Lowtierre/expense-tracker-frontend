import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import API from "../services/api";

const ForgotPassword = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await API.post("/api/auth/forgot-password", data);
      toast.success("Email di recupero inviata!");
      reset();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.error || "Errore nel recupero password");
    }
  };

  return (
    <div
      style={{ minHeight: "calc(100vh - 64px)" }}
      className="flex justify-center items-center bg-gradient-to-br from-blue-500 to-purple-600"
    >
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
          Password dimenticata
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="email@example.com"
              className="w-full text-black px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-300 transition"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold hover:from-blue-600 hover:to-purple-700 transition transform hover:scale-105 shadow-lg"
          >
            Recupera Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
