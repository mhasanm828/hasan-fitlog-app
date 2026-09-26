import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#080C12] border-t border-[#1A2433] mt-16">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Left */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={Logo}
            alt="FitLog Logo"
            width={34}
            height={34}
            className="object-contain"
          />
          <h2 className="text-white font-extrabold tracking-wider text-lg">
            FITLOG
          </h2>
        </Link>

        {/* Right */}
        <div className="text-center md:text-right">
          <p className="text-xs text-gray-400">
            © 2026 FitLog — Workout Library. Train hard, log honest.
          </p>
          <p className="text-[11px] text-gray-500 mt-1">
            Developed by <span className="text-lime-400 font-semibold">Md Hasan Mahmud</span>
          </p>
        </div>

      </div>
    </footer>
  );
}