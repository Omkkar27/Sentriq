"use client";

import axios from "axios";
import { set } from "mongoose";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function verifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/src/app/api/users/verifytoken", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#08111f] px-4 py-10 text-white">
      <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.06] p-8 text-center shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300 text-xl font-black text-slate-950">
          s
        </div>
        <p className="mt-5 text-sm font-semibold tracking-tight text-cyan-300">
          SENTRIQ
        </p>
        <h1 className="mt-8 text-3xl font-semibold tracking-tight">
          Verify your email
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          We are checking the link connected to your account.
        </p>
        <h2 className="mt-6 rounded-xl border border-white/10 bg-slate-950/30 px-4 py-3 text-xs text-slate-500">
          {token
            ? "Verification link received"
            : "Waiting for a verification link"}
        </h2>
        {verified && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-emerald-300">
              Email verified
            </h2>
            <link href="/login">Login</link>
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-xl border border-red-300/20 bg-red-400/10 px-4 py-3">
            <h2 className="text-sm font-medium text-red-200">
              This verification link could not be used.
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
