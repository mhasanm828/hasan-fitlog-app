import Link from "next/link";

export default function Navbar() {
  const planCount = 0;
  const savedCount = 0;

  return (
    <div className="bg-[#0B0F14] border-b border-lime-400/20">
      <div className="navbar max-w-7xl mx-auto h-20 px-4 lg:px-8">

        {/* Left - Logo */}
        <div className="navbar-start">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lime-400 text-2xl">⚡</span>
            <h1 className="text-xl font-extrabold text-white tracking-wider">
              FITLOG
            </h1>
          </Link>
        </div>

        {/* Center Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-3 px-1 text-sm font-medium">
            <li>
              <Link
                href="/"
                className="rounded-full bg-lime-400 text-black px-5 py-2 font-bold"
              >
                Workouts
              </Link>
            </li>
            <li>
              <Link
                href="/my-plan"
                className="text-gray-300 hover:text-white px-3 py-2"
              >
                My Plan
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Counters */}
        <div className="navbar-end gap-3">
          <Link href="/my-plan" className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Plan</span>
            <div className="badge rounded-full bg-lime-400 text-black border-0 w-6 h-6 p-0">
              {planCount}
            </div>
          </Link>

          <Link href="/my-plan" className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Saved</span>
            <div className="badge badge-outline border-gray-500 text-white rounded-full w-6 h-6 p-0">
              {savedCount}
            </div>
          </Link>

          {/* Mobile Menu */}
          <div className="dropdown dropdown-end lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost text-white">
              ☰
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 z-50 w-44 rounded-box bg-[#111827] p-2 shadow text-white"
            >
              <li><Link href="/">Workouts</Link></li>
              <li><Link href="/my-plan">My Plan</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}