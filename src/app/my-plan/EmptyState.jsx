import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {/* Icon */}
      <div className="w-24 h-24 rounded-full bg-[#1A2332] border border-slate-700 flex items-center justify-center mb-6">
        <span className="text-5xl">🏋️</span>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-extrabold uppercase text-white">
        NOTHING HERE YET
      </h2>

      {/* Description */}
      <p className="text-gray-400 mt-3 max-w-md leading-7">
        Browse the library and add a lift to get today's workout moving.
      </p>

      {/* Button */}
      <Link
        href="/"
        className="mt-8 bg-lime-400 hover:bg-lime-300 text-black font-bold px-7 py-3 rounded-full transition"
      >
        GO TO WORKOUTS
      </Link>
    </div>
  );
}