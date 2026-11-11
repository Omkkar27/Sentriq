export const instant = false;
export default async function UserProfile({ params }: any) {
  const { id } = await params;
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#08111f] px-4 py-10 text-white">
      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">
        <p className="text-sm font-semibold tracking-tight text-cyan-300">
          SENTRIQ
        </p>
        <h1 className="mt-8 text-3xl font-semibold tracking-tight">
          Profile details
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          A closer look at this account.
        </p>
        <div className="mt-8 rounded-2xl border border-white/10 bg-slate-950/30 p-5">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            Username
          </p>
          <p className="mt-3 break-all text-sm font-medium text-white">{id}</p>
        </div>
      </div>
    </div>
  );
}
