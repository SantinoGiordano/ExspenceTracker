'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "../store/store";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser } = useUserStore();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Login failed");
      return;
    }

    // ✅ Save user in Zustand
    setUser(data.username, data.userId);

    // Optionally save in localStorage for persistence
    localStorage.setItem("username", data.username);
    localStorage.setItem("userId", data.userId);

    router.push("/wallet"); // navigate to wallet page
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-6 text-green-500">Sign In</h1>

      <form onSubmit={handleLogin} className="flex flex-col w-80 space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input input-bordered"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered"
        />

        <button type="submit" className="btn btn-primary">Login</button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </main>
  );
}
