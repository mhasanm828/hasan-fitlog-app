"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function MyPlan() {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [tab, setTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");

  useEffect(() => {
    setPlan(JSON.parse(localStorage.getItem("plan")) || []);
    setSaved(JSON.parse(localStorage.getItem("saved")) || []);
  }, []);

  // Summary
  const exercises = plan.length;
  const minutes = plan.reduce((t, i) => t + i.duration, 0);
  const calories = plan.reduce((t, i) => t + i.caloriesBurned, 0);

  // Sorting
  const activeData = useMemo(() => {
    const data = tab === "plan" ? [...plan] : [...saved];

    return data.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "calories")
        return b.caloriesBurned - a.caloriesBurned;
      return b.duration - a.duration;
    });
  }, [plan, saved, tab, sortBy]);

  // Remove from Plan
  const removePlan = (id) => {
    const updated = plan.filter((item) => item.id !== id);
    setPlan(updated);
    localStorage.setItem("plan", JSON.stringify(updated));
  };

  // Remove Saved
  const removeSaved = (id) => {
    const updated = saved.filter((item) => item.id !== id);
    setSaved(updated);
    localStorage.setItem("saved", JSON.stringify(updated));
  };

  // Mark Done
  const markDone = (id) => {
    removePlan(id);
    alert("Workout completed!");
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 text-white">
      {/* Header */}
      <h1 className="text-5xl font-bold uppercase">MY PLAN</h1>
      <p className="text-gray-400 mt-2">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        <StatCard title="Exercises" value={exercises} />
        <StatCard title="Minutes" value={minutes} />
        <StatCard title="Calories" value={calories} />
      </div>

      {/* Tabs */}
      <div className="flex justify-between items-center mt-8">
        <div className="flex gap-2">
          <button
            onClick={() => setTab("plan")}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              tab === "plan"
                ? "bg-lime-400 text-black"
                : "bg-[#1E293B] text-white"
            }`}
          >
            Today's Plan
          </button>

          <button
            onClick={() => setTab("saved")}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              tab === "saved"
                ? "bg-lime-400 text-black"
                : "bg-[#1E293B] text-white"
            }`}
          >
            Saved
          </button>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-[#1E293B] border border-slate-700 rounded-lg px-3 py-2 text-sm"
        >
          <option value="duration">Duration</option>
          <option value="calories">Calories</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* List */}
      <div className="mt-6 bg-[#101827] rounded-2xl border border-slate-800 p-4 min-h-[380px]">
        {activeData.length === 0 ? (
          <div className="h-[300px] flex flex-col justify-center items-center text-center">
            <h2 className="text-2xl font-bold uppercase">
              NOTHING HERE YET
            </h2>

            <p className="text-gray-400 mt-2">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/"
              className="mt-6 bg-lime-400 text-black px-6 py-3 rounded-full font-semibold"
            >
              GO TO WORKOUTS
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {activeData.map((item) => (
              <div
                key={item.id}
                className="bg-[#111827] border border-slate-800 rounded-xl p-3 flex items-center gap-4"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-bold text-lg uppercase">
                    {item.name}
                  </h3>

                  <p className="text-gray-400 text-sm">
                    {item.equipment}
                  </p>

                  <div className="flex gap-4 mt-2 text-lime-400 text-sm">
                    <span>🕒 {item.duration} min</span>
                    <span>🔥 {item.caloriesBurned} kcal</span>
                    <span>⭐ {item.rating}</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-2">
                  <Link
                    href={`/workout/${item.id}`}
                    className="px-4 py-2 rounded-full bg-[#1E293B] hover:bg-slate-700 text-sm"
                  >
                    View Details
                  </Link>

                  {tab === "plan" && (
                    <button
                      onClick={() => markDone(item.id)}
                      className="px-4 py-2 rounded-full bg-lime-400 hover:bg-lime-300 text-black text-sm font-semibold"
                    >
                      ✔ Mark as Done
                    </button>
                  )}

                  <button
                    onClick={() =>
                      tab === "plan"
                        ? removePlan(item.id)
                        : removeSaved(item.id)
                    }
                    className="w-9 h-9 rounded-full bg-[#1E293B] hover:bg-red-500"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Summary Card
function StatCard({ title, value }) {
  return (
    <div className="bg-[#101827] border border-slate-800 rounded-xl p-5">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-4xl font-bold text-lime-400 mt-2">{value}</h2>
    </div>
  );
}