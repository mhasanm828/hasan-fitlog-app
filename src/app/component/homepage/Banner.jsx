import Image from "next/image";
import BannerImg from "@/assets/banner.png";

export default function Banner() {
  return (
    <section className="px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#111827] border border-slate-800 rounded-3xl">
          <div className="grid lg:grid-cols-2 items-center gap-8 p-8 lg:p-14">

            <div>
              <p className="text-lime-400 text-xs font-bold uppercase tracking-[3px] mb-4">
                WORKOUT LIBRARY
              </p>

              <h1 className="text-white text-5xl lg:text-6xl font-bold uppercase leading-tight mb-6">
                TRAIN WITH INTENT.
                <br />
                LOG EVERY SET.
              </h1>

              <p className="text-gray-300 leading-7 mb-8 max-w-md">
                FitLog is a dark, no-nonsense gym companion: pick a lift,
                lock it into today's plan, and watch the week's work add up.
              </p>

              <a
                href="#library"
                className="inline-flex items-center gap-2 bg-lime-400 hover:bg-lime-300 text-black px-6 py-3 rounded-full font-semibold"
              >
                Browse Workouts →
              </a>
            </div>

            <div className="flex justify-center">
              <Image
                src={BannerImg}
                alt="Workout Banner"
                className="w-full max-w-md h-auto"
                priority
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}