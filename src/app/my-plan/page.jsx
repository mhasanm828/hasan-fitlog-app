"use client";

import { useMemo, useState } from "react";
import { usePlan } from "@/context/PlanContext";

import PlanList from "./PlanList";
import SavedList from "./SavedList";
import EmptyState from "./EmptyState";

export default function MyPlan() {
  const { plan, saved } = usePlan();

  const [tab, setTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");

  // Metrics
  const exercises = plan.length;
  const minutes = plan.reduce((sum, item) => sum + item.duration, 0);
  const calories = plan.reduce(
    (sum, item) => sum + item.caloriesBurned,
    0
  );

  // Sort
  const activeData = useMemo(() => {
    const list = [...(tab === "plan" ? plan : saved)];

    switch (sortBy) {
      case "rating":
        return list.sort((a, b) => b.rating - a.rating);

      case "calories":
        return list.sort(
          (a, b) => b.caloriesBurned - a.caloriesBurned
        );

      default:
        return list.sort((a, b) => b.duration - a.duration);
    }
  }, [plan, saved, tab, sortBy]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 text-white">
      {/* Header */}
      <div>
        <h1 className="text-5xl font-extrabold uppercase">MY PLAN</h1>
        <p className="text-gray-400 mt-2">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <StatCard title="Exercises" value={exercises} />
        <StatCard title="Minutes" value={minutes} />
        <StatCard title="Calories" value={calories} />
      </div>

      {/* Tabs + Sort */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
        <div className="flex gap-2">
          <button
            onClick={() => setTab("plan")}
            className={`px-5 py-2 rounded-full font-semibold transition ${
              tab === "plan"
                ? "bg-lime-400 text-black"
                : "bg-[#1E293B] text-gray-300"
            }`}
          >
            Today's Plan ({plan.length})
          </button>

          <button
            onClick={() => setTab("saved")}
            className={`px-5 py-2 rounded-full font-semibold transition ${
              tab === "saved"
                ? "bg-lime-400 text-black"
                : "bg-[#1E293B] text-gray-300"
            }`}
          >
            Saved ({saved.length})
          </button>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-[#111827] border border-slate-700 rounded-lg px-4 py-2 text-white"
        >
          <option value="duration">Duration</option>
          <option value="calories">Calories</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* Content */}
      <div className="mt-6 bg-[#101827] border border-slate-800 rounded-2xl p-4 min-h-[360px]">
        {activeData.length === 0 ? (
          <EmptyState />
        ) : tab === "plan" ? (
          <PlanList data={activeData} />
        ) : (
          <SavedList data={activeData} />
        )}
      </div>
    </section>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-[#111827] border border-slate-800 rounded-xl p-5">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-4xl font-bold text-lime-400 mt-2">{value}</h2>
    </div>
  );
}