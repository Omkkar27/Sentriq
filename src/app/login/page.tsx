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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#08111f] px-4 py-10 text-white">
      <div className="absolute left-0 top-1/4 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl" />
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.06] p-7 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-9">
        <div className="mb-8 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-300 text-base font-black text-slate-950">
            s
          </span>
          <span className="text-lg font-semibold tracking-tight">SENTRIQ</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">
          {loading ? "Signing you in" : "Welcome back"}
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Sign in to continue to your account.
        </p>
        <div className="mt-8 space-y-5">
          <label
            className="block text-sm font-medium text-slate-300"
            htmlFor="email"
          >
            Email address
          </label>
          <input
            className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none transition-all placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10"
            type="text"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="you@example.com"
          />
          <label
            className="block text-sm font-medium text-slate-300"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none transition-all placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10"
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter your password"
          />
          <button
            onClick={onLogin}
            className="mt-2 w-full rounded-xl bg-cyan-300 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-300/10 transition-all hover:bg-cyan-200 hover:shadow-cyan-300/20 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {buttonDisabled ? "Enter your details" : "Login"}
          </button>
        </div>
        <div className="my-7 border-t border-white/10" />
        <Link
          href="/signup"
          className="text-sm text-slate-400 transition-colors hover:text-cyan-300"
        >
          New here?{" "}
          <span className="font-medium text-cyan-300">Create an account</span>
        </Link>
      </div>
    </div>
  );
}
