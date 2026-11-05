"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  //what data need to accuumlate
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Successfull", response.data);

      toast.success("login succesfull");

      router.push("/profile");
    } catch (error: any) {
      console.log("login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-white mb-6 capitalize">
        {loading ? "Proccesing" : "Login"}
      </h1>
      <hr />

      <label
        className="w-64 text-sm font-medium text-gray-300 mb-1 mt-3 capitalize"
        htmlFor="email"
      >
        email
      </label>
      <input
        className="w-64 px-4 py-3 bg-white/10 border border-white/15 text-white placeholder-gray-400 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 transition-all duration-200"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />

      <label
        className="w-64 text-sm font-medium text-gray-300 mb-1 mt-3 capitalize"
        htmlFor="password"
      >
        password
      </label>
      <input
        className="w-64 px-4 py-3 bg-white/10 border border-white/15 text-white placeholder-gray-400 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 transition-all duration-200"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />

      <button
        onClick={onLogin}
        className="w-64 mt-6 px-5 py-3 bg-linear-to-r from-indigo-500 via-purple-500 to-violet-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.98] transition-all duration-200 cursor-pointer"
      >
        {buttonDisabled ? "Cant" : "Login"}
      </button>
      <hr className="w-64 border-white/20 my-5" />
      <Link
        href="/signup"
        className="text-sm text-indigo-300 hover:text-white hover:underline transition-colors duration-200 mt-2"
      >
        New User? Signup
      </Link>
    </div>
  );
}
