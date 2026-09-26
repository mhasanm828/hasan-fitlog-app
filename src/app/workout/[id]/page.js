"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

export default function WorkoutDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [workout, setWorkout] = useState(null);

  useEffect(() => {
    fetch(`https://api.api-store.workers.dev/api/fitlog/${id}`)
      .then((res) => res.json())
      .then(setWorkout);
  }, [id]);

  if (!workout) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  // Add to Today's Plan
  const addToPlan = () => {
    const plan = JSON.parse(localStorage.getItem("plan")) || [];

    if (!plan.find((item) => item.id === workout.id)) {
      plan.push(workout);
      localStorage.setItem("plan", JSON.stringify(plan));
    }

    router.push("/my-plan");
  };

  // Save for Later
  const saveWorkout = () => {
    const saved = JSON.parse(localStorage.getItem("saved")) || [];

    if (!saved.find((item) => item.id === workout.id)) {
      saved.push(workout);
      localStorage.setItem("saved", JSON.stringify(saved));
    }

    router.push("/my-plan");
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 text-white">
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Left Image */}
        <div className="relative h-[520px] rounded-3xl overflow-hidden">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Right */}
        <div>
          <h1 className="text-5xl font-bold uppercase">{workout.name}</h1>

          <p className="text-gray-300 mt-4">{workout.description}</p>

          {/* Tags */}
          <div className="flex gap-2 mt-5">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="bg-lime-400 text-black px-3 py-1 rounded-full text-xs font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Specs */}
          <div className="bg-[#121A27] rounded-2xl p-5 mt-7 border border-slate-800">
            <div className="space-y-3 text-sm">
              <Spec title="Equipment" value={workout.equipment} />
              <Spec title="Difficulty" value={workout.difficulty} />
              <Spec title="Sets" value={workout.sets} />
              <Spec title="Reps" value={workout.reps} />
              <Spec title="Duration" value={`${workout.duration} min`} />
              <Spec title="Calories" value={`${workout.caloriesBurned} kcal`} />
              <Spec title="Rating" value={workout.rating} />
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8">
            <h3 className="font-bold text-xl uppercase mb-4">Instructions</h3>

            <ol className="space-y-2 text-gray-300 text-sm">
              {workout.instructions.map((step, i) => (
                <li key={i}>
                  {i + 1}. {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={addToPlan}
              className="btn bg-lime-400 hover:bg-lime-300 border-0 text-black rounded-full px-6"
            >
              ➕ Add to today's plan
            </button>

            <button
              onClick={saveWorkout}
              className="btn btn-outline rounded-full px-6 text-white"
            >
              ♡ Save for later
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Spec({ title, value }) {
  return (
    <div className="flex justify-between border-b border-slate-700 pb-2">
      <span className="text-gray-400 uppercase">{title}</span>
      <span>{value}</span>
    </div>
  );
}