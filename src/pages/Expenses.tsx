import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { LuArrowDownFromLine, LuArrowUpToLine } from "react-icons/lu";

export interface Expense {
  id: string;
  type: "income" | "expense";
  category: string;
  description: string;
  amount: number;
  date: string;
}

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const navigate = useNavigate();
  const totalIncomes = expenses
    .filter((e) => e.type === "income")
    .reduce((acc, e) => acc + e.amount, 0)
    .toFixed(2);
  const totalExpenses = expenses
    .filter((e) => e.type === "expense")
    .reduce((acc, e) => acc + e.amount, 0)
    .toFixed(2);
  const total = Number(totalIncomes) - Number(totalExpenses);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await API.get("/api/expenses");
      setExpenses(res.data);
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.error || "Errore nel caricamento spese");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Sei sicuro di voler eliminare questa spesa?")) return;
    try {
      await API.delete(`/api/expenses/${id}`);
      toast.success("Spesa eliminata!");
      fetchExpenses();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.error || "Errore nell'eliminazione");
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/edit-expense/${id}`);
  };

  const handleAdd = () => {
    navigate("/add-expense");
  };

  return (
    <div
      style={{ minHeight: "calc(100vh - 64px)" }}
      className="bg-gradient-to-br from-blue-500 to-purple-600 flex justify-center items-start py-10"
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800">
            Le tue spese
          </h2>
          <button
            onClick={handleAdd}
            className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-blue-900 to-purple-900 hover:from-blue-800 hover:to-purple-800 text-white px-4 py-2 rounded-lg font-semibold transition shadow-lg"
          >
            <FaPlus /> Aggiungi Movimento
          </button>
        </div>

        {expenses.length === 0 ? (
          <p className="text-gray-600">Non hai ancora inserito spese.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Data
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Tipo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Categoria
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Descrizione
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Importo
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Azioni
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td className="px-4 py-3 text-gray-700">
                      {new Date(expense.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {expense.type === "income" ? (
                        <span>
                          <LuArrowUpToLine className="inline mr-1 text-green-600" />
                          Entrata
                        </span>
                      ) : (
                        <span>
                          <LuArrowDownFromLine className="inline mr-1 text-red-600" />
                          Spesa
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {expense.category}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {expense.description}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      € {expense.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 flex justify-end gap-4">
                      <button
                        onClick={() => handleEdit(expense.id)}
                        className="
                          flex items-center justify-center
                          bg-blue-100 text-blue-800 opacity-70
                          hover:bg-blue-50 hover:opacity-100
                          px-2 py-2 rounded-lg
                          transition duration-300 ease-in-out
                          shadow-sm cursor-pointer
                        "
                        title="Modifica"
                      >
                        <FaEdit size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(expense.id)}
                        className="
                          flex items-center justify-center
                          bg-red-100 text-red-800 opacity-70
                          hover:bg-red-50 hover:opacity-100
                          px-2 py-2 rounded-lg
                          transition duration-300 ease-in-out
                          shadow-sm cursor-pointer
                        "
                        title="Elimina"
                      >
                        <FaTrash size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="flex justify-between gap-6 pt-4 px-3 text-gray-600 font-semibold border-t border-gray-200">
          <div className="flex justify-start gap-6">
            <p>
              Totale spese:{" "}
              <span className="text-red-600">€ {totalExpenses}</span>
            </p>
            <p>
              Totale entrate:{" "}
              <span className="text-green-600">€ {totalIncomes}</span>
            </p>
          </div>
          <div>
            <p>
              Saldo totale:{" "}
              <span className={total >= 0 ? "text-green-600" : "text-red-600"}>
                € {total}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
