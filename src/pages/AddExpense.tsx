import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import API from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../context/AuthContext";

const categories = [
  { value: "", label: "-- Seleziona categoria --" },
  { value: "Cibo", label: "Cibo" },
  { value: "Affitto", label: "Affitto" },
  { value: "Trasporti", label: "Trasporti" },
  { value: "Svago", label: "Svago" },
  { value: "Stipendio", label: "Stipendio" },
  { value: "Rimborso", label: "Rimborso" },
];

const schema = yup.object({
  type: yup.string().oneOf(["income", "expense"], "Seleziona tipo").required(),
  category: yup.string().required("Categoria obbligatoria"),
  description: yup.string().required("Descrizione obbligatoria"),
  amount: yup
    .number()
    .typeError("Inserisci un numero valido")
    .positive("L'importo deve essere maggiore di zero")
    .required("Importo obbligatorio"),
  date: yup.date().required("Data obbligatoria"),
});

type ExpenseFormInputs = yup.InferType<typeof schema>;

const AddExpense = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExpenseFormInputs>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const { user } = useAuth();

  const onSubmit = async (data: ExpenseFormInputs) => {
    try {
      const payload = {
        ...data,
        userId: user?.id,
        id: uuidv4(),
      };

      await API.post("/api/expenses", payload);
      toast.success("Movimento salvato!");
      reset();

      navigate("/expenses");
    } catch (error: any) {
      console.error(error);
      toast.error(
        error.response?.data?.error || "Errore durante il salvataggio."
      );
    }
  };

  return (
    <div
      style={{ minHeight: "calc(100vh - 64px)" }}
      className="flex justify-center items-center bg-gradient-to-br from-blue-500 to-purple-600"
    >
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
          Aggiungi Movimento
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Tipo */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Tipo</label>
            <select
              {...register("type")}
              className={`
                w-full px-4 py-3 rounded-xl border
                ${
                  errors.type
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-blue-300"
                }
                focus:outline-none focus:ring-4
                text-gray-700
                transition
                bg-white
                appearance-none
              `}
            >
              <option value="">-- Seleziona tipo --</option>
              <option value="expense">Spesa</option>
              <option value="income">Entrata</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
            )}
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Categoria
            </label>
            <select
              {...register("category")}
              className={`
                w-full px-4 py-3 rounded-xl border
                ${
                  errors.category
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-blue-300"
                }
                focus:outline-none focus:ring-4
                text-gray-700
                transition
                bg-white
                appearance-none
              `}
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Descrizione */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Descrizione
            </label>
            <input
              type="text"
              {...register("description")}
              placeholder="es. Supermercato, Stipendio"
              className={`w-full text-black px-4 py-3 rounded-xl border ${
                errors.description
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-300"
              } focus:outline-none focus:ring-4 transition`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex gap-4">
            {/* Importo */}
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Importo
              </label>
              <input
                type="number"
                step="0.01"
                min={0}
                {...register("amount")}
                placeholder="es. 50.00"
                className={`w-full text-black px-4 py-3 rounded-xl border ${
                  errors.amount
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-blue-300"
                } focus:outline-none focus:ring-4 transition`}
              />
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.amount.message}
                </p>
              )}
            </div>

            {/* Data */}
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Data
              </label>
              <Controller
                control={control}
                name="date"
                render={({ field }) => (
                  <DatePicker
                    name={field.name}
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Seleziona una data"
                    className={`w-full block text-black px-4 py-3 rounded-xl border ${
                      errors.date
                        ? "border-red-500 focus:ring-red-300"
                        : "border-gray-300 focus:ring-blue-300"
                    } focus:outline-none focus:ring-4 transition`}
                  />
                )}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.date.message}
                </p>
              )}
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold hover:from-blue-600 hover:to-purple-700 transition transform hover:scale-105 shadow-lg"
          >
            Salva
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
