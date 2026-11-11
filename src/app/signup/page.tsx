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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#08111f] px-4 py-10 text-white">
      <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl" />
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.06] p-7 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-9">
        <div className="mb-8 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-300 text-base font-black text-slate-950">
            s
          </span>
          <span className="text-lg font-semibold tracking-tight">SENTRIQ</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">
          {loading ? "Creating your account" : "Create an account"}
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Set up your sentriq account in a few seconds.
        </p>
        <div className="mt-8 space-y-5">
          <label
            className="block text-sm font-medium text-slate-300"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none transition-all placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10"
            type="email"
            id="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Choose a username"
          />
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
            placeholder="Create a password"
          />
          <button
            onClick={onSignup}
            disabled={buttonDisalbled}
            className="mt-2 w-full rounded-xl bg-cyan-300 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-300/10 transition-all hover:bg-cyan-200 hover:shadow-cyan-300/20 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {buttonDisalbled ? "Complete the form" : "Create account"}
          </button>
        </div>
        <div className="my-7 border-t border-white/10" />
        <Link
          href="/login"
          className="text-sm text-slate-400 transition-colors hover:text-cyan-300"
        >
          Already have an account?{" "}
          <span className="font-medium text-cyan-300">Login</span>
        </Link>
      </div>
    </div>
  );
}
