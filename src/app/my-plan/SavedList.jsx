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
          className="bg-[#0F172A] border border-slate-800 rounded-2xl p-4 flex items-center gap-4"
        >
          {/* Image */}
          <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <h3 className="text-lg font-bold uppercase text-white">
              {item.name}
            </h3>

            <p className="text-gray-400 text-sm mt-1">
              {item.equipment}
            </p>

            <div className="flex flex-wrap gap-4 mt-2 text-sm text-lime-400">
              <span>🕒 {item.duration} min</span>
              <span>🔥 {item.caloriesBurned} kcal</span>
              <span>⭐ {item.rating}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2">
            <Link
              href={`/workout/${item.id}`}
              className="btn btn-xs rounded-full bg-slate-700 hover:bg-slate-600 border-0 text-white"
            >
              View Details
            </Link>

            <button
              onClick={() => handleRemove(item.id)}
              className="btn btn-circle btn-xs bg-slate-700 hover:bg-red-500 border-0 text-white self-end"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}