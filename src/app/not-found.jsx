import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-[#070B11] px-4">
      <div className="max-w-xl text-center">
        <p className="text-lime-400 font-bold tracking-[0.25em] uppercase mb-3">
          Error 404
        </p>

        <h1 className="text-6xl md:text-7xl font-extrabold text-white uppercase">
          Page Not Found
        </h1>

        <p className="text-gray-400 mt-6 leading-7">
          The workout or page you're looking for doesn't exist. Let's get you
          back to the FitLog library.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Link
            href="/"
            className="bg-lime-400 hover:bg-lime-300 text-black font-bold px-7 py-3 rounded-full transition"
          >
            Browse Workouts
          </Link>

          <Link
            href="/my-plan"
            className="border border-slate-600 hover:border-lime-400 text-white px-7 py-3 rounded-full transition"
          >
            My Plan
          </Link>
        </div>

        <div className="mt-12 text-8xl opacity-20">🏋️</div>
      </div>
    </section>
  );
}