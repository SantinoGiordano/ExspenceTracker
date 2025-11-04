'use client'
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

  useEffect(() => {
    if (!username) return;

    async function fetchUser() {
      const res = await fetch(`http://localhost:8080/api/user/${username}`);
      const data = await res.json();
      setUser(data);
    }
    fetchUser();
  }, [username]);

  if (!username) return <div>Please log in</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="p-10 text-green-500">My Wallet</h1>
      <div className="text-xl p-4">💰 Balance: ${user.money}</div>
      <div className="text-lg p-4">Weekly Budget: ${user.budgetPerWeek}</div>
    </main>
  );
}
