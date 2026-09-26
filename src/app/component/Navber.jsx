"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import Logo from "@/assets/logo.png";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <header className="bg-[#0B0F14] border-b border-slate-800 sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto h-20 px-4 lg:px-8">

        {/* Logo */}
        <div className="navbar-start">
          <Link href="/" className="flex items-center gap-3">
            <Image src={Logo} alt="FitLog" width={34} height={34} />
            <h1 className="text-xl font-extrabold tracking-wider text-white">
              FITLOG
            </h1>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-3">
            <li>
              <Link
                href="/"
                className={`rounded-full px-5 py-2 font-semibold transition ${
                  pathname === "/"
                    ? "bg-lime-400 text-black"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Workouts
              </Link>
            </li>

            <li>
              <Link
                href="/my-plan"
                className={`rounded-full px-5 py-2 font-semibold transition ${
                  pathname === "/my-plan"
                    ? "bg-lime-400 text-black"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                My Plan
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Badges */}
        <div className="navbar-end gap-3">

          {/* Plan Badge */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 hover:opacity-90 transition"
          >
            <span className="hidden sm:block text-xs text-gray-400">
              Plan
            </span>

            <div className="w-7 h-7 rounded-full bg-lime-400 text-black flex items-center justify-center text-xs font-bold">
              {plan.length}
            </div>
          </Link>

          {/* Saved Badge */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 hover:opacity-90 transition"
          >
            <span className="hidden sm:block text-xs text-gray-400">
              Saved
            </span>

            <div className="w-7 h-7 rounded-full border border-gray-500 text-white flex items-center justify-center text-xs font-bold">
              {saved.length}
            </div>
          </Link>

          {/* Mobile Menu */}
          <div className="dropdown dropdown-end lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost text-white">
              ☰
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 w-48 rounded-xl bg-[#111827] p-2 shadow-xl z-50"
            >
              <li>
                <Link href="/">Workouts</Link>
              </li>

              <li>
                <Link href="/my-plan">My Plan</Link>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </header>
  );
}