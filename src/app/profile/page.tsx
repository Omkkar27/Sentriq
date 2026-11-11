"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout succesfull");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const getUserDetail = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#08111f] px-4 py-10 text-white">
      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl" />
      <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">
        <div className="mb-10 flex items-center justify-between">
          <span className="text-lg font-semibold tracking-tight">SENTRIQ</span>
          <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-medium text-emerald-300">
            Secure session
          </span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">Your profile</h1>
        <p className="mt-2 text-sm text-slate-400">
          Welcome back. Your account details are ready when you are.
        </p>
        <div className="mt-8 rounded-2xl border border-white/10 bg-slate-950/30 p-5">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            Account identifier
          </p>
          <h2 className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300">
            {data === "nothing" ? (
              <span className="text-slate-500">Nothing to display</span>
            ) : (
              <>
                <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                <Link
                  href={`/profile/${data}`}
                  className="transition-colors hover:text-emerald-200"
                >
                  {data}
                </Link>
              </>
            )}
          </h2>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={logout}
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-300 transition-all hover:border-red-300/30 hover:bg-red-400/10 hover:text-red-200 active:scale-[0.98]"
          >
            Logout
          </button>
          <button
            onClick={getUserDetail}
            className="flex-1 rounded-xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition-all hover:bg-cyan-200 active:scale-[0.98]"
          >
            Get User Details
          </button>
        </div>
      </div>
    </div>
  );
}
