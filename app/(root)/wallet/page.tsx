'use client'
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
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("http://localhost:8080/api/users");
      const data = await res.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  if (users.length === 0) return <div>Loading...</div>;

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="p-10 text-green-500">Wallets</h1>

      {users.map((user) => (
        <div key={user.id} className="p-5 border-b border-gray-600 w-80">
          <p className="text-xl font-bold">{user.username}</p>
          <p>💰 Money: ${user.money}</p>
          <p>Weekly Budget: ${user.budgetPerWeek}</p>
        </div>
      ))}
    </main>
  );
}
