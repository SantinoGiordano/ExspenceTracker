"use client";
import { useUserStore } from "@/app/store/store";
import { API_ROUTES } from "@/app/utils/routes";
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
  purchases: Purchase[];
}

export default function PurchasePage() {
  const { username } = useUserStore();
  const [user, setUser] = useState<UserData | null>(null);
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!username) return;
    async function fetchUser() {
      const res = await fetch(`${API_ROUTES}/api/user/${username}`);
      const data = await res.json();
      setUser(data);
    }
    fetchUser();
  }, [username]);

  if (!username)
    return (
      <div className="text-center mt-20 text-red-500 text-xl">
        Please log in
      </div>
    );

  if (!user)
    return (
      <span className="text-center loading loading-spinner loading-xs"></span>
    );

  async function handlePurchase(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!item || !price || isNaN(Number(price))) {
      setError("Please enter a valid item name and price");
      return;
    }

    const res = await fetch(`${API_ROUTES}/api/user/${username}/purchase`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item, price }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Failed to make purchase");
      return;
    }

    setSuccess(`Purchased ${item} for $${price}!`);
    setItem("");
    setPrice("");

    // Refresh user data
    const updatedRes = await fetch(`${API_ROUTES}/api/user/${username}`);
    const updatedData = await updatedRes.json();
    setUser(updatedData);
  }

  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 py-16 px-4">
      <h1 className="text-4xl font-bold text-yellow-700 mb-10">
        Make a Purchase
      </h1>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 mb-8 border border-yellow-200">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold text-gray-700">Balance</span>
          <span className="text-2xl font-bold text-yellow-600">
            ${user.money}
          </span>
        </div>
      </div>

      <form
        onSubmit={handlePurchase}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-yellow-200 flex flex-col gap-4"
      >
        <label className="text-gray-600 font-medium">Item Name</label>
        <input
          type="text"
          placeholder="Enter item name"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          className="input input-bordered focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-lg px-4 py-2 text-gray-700"
        />

        <label className="text-gray-600 font-medium">Price ($)</label>
        <input
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="input input-bordered focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-lg px-4 py-2 text-gray-700"
        />

        <button
          type="submit"
          className="btn bg-yellow-600 text-white font-bold hover:bg-yellow-700 transition-colors py-2 rounded-lg"
        >
          Make Purchase
        </button>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        {success && (
          <p className="text-green-600 text-center mt-2">{success}</p>
        )}
      </form>

      {user.purchases && user.purchases.length > 0 && (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 border border-yellow-200 mt-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Purchase History
          </h2>
          <ul className="flex flex-col gap-3">
            {user.purchases.map((purchase) => (
              <li
                key={purchase.itemId}
                className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg shadow-sm"
              >
                <span className="font-medium text-gray-800">
                  {purchase.item}
                </span>
                <span className="font-semibold text-yellow-600">
                  ${purchase.price}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
