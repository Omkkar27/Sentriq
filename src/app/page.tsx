export default function Home() {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-[#08111f] px-6 py-12 text-white">
      <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl" />
      <main className="relative w-full max-w-5xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-12">
        <div className="mb-16 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300 text-lg font-black text-slate-950">
            s
          </span>
          <span className="text-xl font-semibold tracking-tight">SENTRIQ</span>
        </div>
        <div className="max-w-2xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            Your space, kept simple
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
            A quieter way to manage your account.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Sentriq keeps the essentials close, secure, and easy to reach
            whenever you need them.
          </p>
        </div>
      </main>
    </div>
  );
}
