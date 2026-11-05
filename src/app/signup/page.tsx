"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  //what data need to accuumlate
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisalbled, setButtonDisalbled] = React.useState(false);

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisalbled(false);
    } else {
      setButtonDisalbled(true);
    }
  }, [user]);

  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);

      toast.error(error.message);
    } finally {
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-white mb-6 capitalize">
        {loading ? "Proccesing" : "SignUp"}
      </h1>
      <hr />
      <label
        className="w-64 text-sm font-medium text-gray-300 mb-1 mt-3 capitalize"
        htmlFor="username"
      >
        username
      </label>
      <input
        className="w-64 px-4 py-3 bg-white/10 border border-white/15 text-white placeholder-gray-400 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 transition-all duration-200"
        type="email"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />

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
        onClick={onSignup}
        disabled={buttonDisalbled}
        className="w-64 mt-6 px-5 py-3 bg-linear-to-r from-indigo-500 via-purple-500 to-violet-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.98] transition-all duration-200 cursor-pointer"
      >
        {buttonDisalbled ? "No SignUp" : "SignUp"}
      </button>
      <hr className="w-64 border-white/20 my-5" />
      <Link
        href="/login"
        className="text-sm text-indigo-300 hover:text-white hover:underline transition-colors duration-200 mt-2"
      >
        Already a User? Login
      </Link>
    </div>
  );
}
