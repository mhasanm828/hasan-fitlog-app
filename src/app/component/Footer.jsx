import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#080C12] border-t border-[#1A2433]">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        {/* Left Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lime-400 text-lg">✚</span>
          <h2 className="text-white font-bold tracking-wider text-sm">
            FITLOG
          </h2>
        </Link>

        {/* Right Text */}
        <p className="text-[11px] text-gray-500 text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}