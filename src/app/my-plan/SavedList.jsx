"use client";

import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { usePlan } from "@/context/PlanContext";

export default function SavedList({ data }) {
  const { removeSaved } = usePlan();

  const handleRemove = (id) => {
    removeSaved(id);
    toast.success("Removed from Saved");
  };

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div
          key={item.id}
          className="bg-[#0F172A] border border-slate-800 rounded-2xl px-4 py-3 flex items-center justify-between hover:border-slate-700 transition"
        >
          {/* Left Side */}
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h3 className="text-white font-bold uppercase text-base">
                {item.name}
              </h3>

              <p className="text-gray-400 text-xs mt-1">
                {item.equipment}
              </p>

              <div className="flex items-center gap-3 mt-2 text-xs text-lime-400">
                <span>🕒 {item.duration} min</span>
                <span>🔥 {item.caloriesBurned} kcal</span>
                <span>⭐ {item.rating}</span>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <Link
              href={`/workout/${item.id}`}
              className="border border-slate-600 hover:border-lime-400 text-white text-xs px-4 py-2 rounded-full transition"
            >
              View Details
            </Link>

            <button
              onClick={() => handleRemove(item.id)}
              className="w-8 h-8 rounded-full bg-[#1E293B] hover:bg-red-500 text-white flex items-center justify-center transition"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}