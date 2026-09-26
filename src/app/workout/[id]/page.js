"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { usePlan } from "@/context/PlanContext";

export default function WorkoutDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { addPlan, addSaved } = usePlan();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const res = await fetch(
          `https://api.api-store.workers.dev/api/fitlog/${id}`
        );

        if (!res.ok) {
          router.replace("/not-found");
          return;
        }

        const data = await res.json();

        if (!data || !data.id) {
          router.replace("/not-found");
          return;
        }

        setWorkout(data);
      } catch (error) {
        router.replace("/not-found");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!workout) return null;

  const handlePlan = () => {
    if (addPlan(workout)) {
      toast.success("Added to Today's Plan");
      router.push("/my-plan");
    } else {
      toast.error("Already added or Maximum 5 workouts");
    }
  };

  const handleSave = () => {
    if (addSaved(workout)) {
      toast.success("Saved Successfully");
      router.push("/my-plan");
    } else {
      toast.error("Already Saved");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 text-white">
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Left */}
        <div className="relative h-[520px] rounded-3xl overflow-hidden border border-slate-800">
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

          <p className="text-gray-300 mt-4 leading-7">
            {workout.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-5">
            {workout?.muscleGroups?.map((tag) => (
              <span
                key={tag}
                className="bg-lime-400 text-black px-3 py-1 rounded-full text-xs font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Specs */}
          <div className="bg-[#121A27] border border-slate-800 rounded-2xl p-5 mt-8">
            <h3 className="text-lg font-bold uppercase mb-4">Key Specs</h3>

            <div className="space-y-3">
              <Spec title="Equipment" value={workout.equipment} />
              <Spec title="Difficulty" value={workout.difficulty} />
              <Spec title="Sets" value={workout.sets} />
              <Spec title="Reps" value={workout.reps} />
              <Spec title="Duration" value={`${workout.duration} min`} />
              <Spec
                title="Calories"
                value={`${workout.caloriesBurned} kcal`}
              />
              <Spec title="Rating" value={`⭐ ${workout.rating}`} />
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8">
            <h3 className="text-xl font-bold uppercase mb-4">
              Instructions
            </h3>

            <ol className="space-y-3 text-gray-300">
              {workout?.instructions?.map((step, index) => (
                <li key={index} className="flex gap-3">
                  <span className="text-lime-400 font-bold">
                    {index + 1}.
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <button
              onClick={handlePlan}
              className="btn bg-lime-400 hover:bg-lime-300 text-black border-0 rounded-full px-6"
            >
              ➕ Add to Today's Plan
            </button>

            <button
              onClick={handleSave}
              className="btn btn-outline border-slate-600 text-white rounded-full px-6"
            >
              ♡ Save for Later
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Spec({ title, value }) {
  return (
    <div className="flex justify-between border-b border-slate-700 pb-2 text-sm">
      <span className="text-gray-400 uppercase">{title}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}