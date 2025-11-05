"use client";
import { useUserStore } from "@/app/store/store";
import { useEffect, useState } from "react";

interface Purchase {
  itemId: string;
  item: string;
  price: string;
}

interface UserData {
  id: string;
  username: string;
  money: string;
  budgetPerWeek: string;
  purchases: Purchase[];
}

export default function Wallet() {
  const { username } = useUserStore();
  const [user, setUser] = useState<UserData | null>(null);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!username) return;

    async function fetchUser() {
      const res = await fetch(`http://localhost:8080/api/user/${username}`);
      const data = await res.json();
      setUser(data);
    }
    fetchUser();
  }, [username]);

  if (!username) return <div className="text-center mt-20 text-red-500 text-xl">Please log in</div>;
  if (!user) return <div className="text-center mt-20 text-gray-500 text-xl">Loading...</div>;

  async function handleAddMoney(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!amount || isNaN(Number(amount))) {
      setError("Please enter a valid amount");
      return;
    }

    const res = await fetch(
      `http://localhost:8080/api/user/${username}/add-money`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Failed to add money");
      return;
    }

    setSuccess("💰 Money added successfully!");
    setAmount("");

    // Refresh user data
    const updatedRes = await fetch(`http://localhost:8080/api/user/${username}`);
    const updatedData = await updatedRes.json();
    setUser(updatedData);
  }

  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-16 px-4">
      <h1 className="text-4xl font-bold text-green-700 mb-10 shadow-sm">
        My Wallet
      </h1>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 mb-8 border border-green-200">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold text-gray-700">💰 Balance</span>
          <span className="text-2xl font-bold text-green-600">${user.money}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-gray-500">Weekly Budget</span>
          <span className="text-lg font-semibold text-green-500">${user.budgetPerWeek}</span>
        </div>
      </div>

      <form
        onSubmit={handleAddMoney}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 mb-4 border border-green-200 flex flex-col gap-4"
      >
        <label className="text-gray-600 font-medium">Add Money</label>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input input-bordered focus:outline-none focus:ring-2 focus:ring-green-400 rounded-lg px-4 py-2 text-gray-700"
        />
        <button
          type="submit"
          className="btn bg-green-600 text-white font-bold hover:bg-green-700 transition-colors py-2 rounded-lg"
        >
          Add Money
        </button>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        {success && <p className="text-green-600 text-center mt-2">{success}</p>}
      </form>

      {/* Optional: Purchase history section */}
      {user.purchases.length > 0 && (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 border border-green-200 mt-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Purchase History</h2>
          <ul className="flex flex-col gap-3">
            {user.purchases.map((purchase) => (
              <li
                key={purchase.itemId}
                className="flex justify-between items-center p-3 bg-green-50 rounded-lg shadow-sm"
              >
                <span className="font-medium text-gray-800">{purchase.item}</span>
                <span className="font-semibold text-green-600">${purchase.price}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
