export const instant = false;
export default async function UserProfile({ params }: any) {
  const { id } = await params;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-10">
      <div className="w-80 p-8 bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl">
        <h1 className="text-3xl font-bold tracking-tight text-white text-center mb-6">
          Profile
        </h1>

        <hr className="border-white/20 mb-6" />

        <p className="text-gray-300 text-center text-sm">
          Welcome to your profile page {id}
        </p>
      </div>
    </div>
  );
}
