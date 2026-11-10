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
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-10">
      <div className="w-80 p-8 bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl">
        <h1 className="text-3xl font-bold tracking-tight text-white text-center mb-6">
          Profile
        </h1>

        <hr className="border-white/20 mb-6" />

        <p className="text-gray-300 text-center text-sm">
          Welcome to your profile page.
        </p>
        <h2 className="inline-flex items-center gap-2 rounded-xl border border-green-400/20 bg-gradient-to-r from-green-500/15 to-emerald-500/10 px-5 py-3 text-sm font-semibold text-green-400 shadow-lg shadow-green-500/5 transition-all duration-300 hover:border-green-400/40 hover:shadow-green-500/15">
          {data === "nothing" ? (
            <span className="text-gray-400">Nothing to display</span>
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
      <button
        onClick={logout}
        className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-500 transition-all duration-300 hover:border-red-500 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/20 active:scale-95 m-3"
      >
        Logout
      </button>
      <button
        onClick={getUserDetail}
        className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-green-500 transition-all duration-300 hover:border-green-900 hover:bg-red-900 hover:text-white hover:shadow-lg hover:shadow-red-500/20 active:scale-95 m-3"
      >
        Get User Details
      </button>
    </div>
  );
}
