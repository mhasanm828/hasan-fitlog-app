import React from "react";
import Link from "next/link";

const getExercise = async () => {
  const res = await fetch("https://api.api-store.workers.dev/api/fitlog", {
    cache: "no-store",
  });
  return res.json();
};

const Library = async () => {
  const exerciseData = await getExercise();

  return (
    <section id="library" className="max-w-7xl mx-auto px-4 py-12">
      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-5xl font-extrabold uppercase text-white">
          THE LIBRARY
        </h2>
        <p className="text-gray-400 mt-2">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {exerciseData.map((exercise) => (
          <Link href={`/workout/${exercise.id}`} key={exercise.id}>
            <div className="bg-[#121A27] rounded-2xl overflow-hidden border border-[#243244] hover:border-lime-400 transition-all duration-300 hover:-translate-y-1 cursor-pointer">

              {/* Image */}
              <img
                src={exercise.image}
                alt={exercise.name}
                className="w-full h-52 object-cover"
              />

              {/* Content */}
              <div className="p-4">
                {/* Muscle Groups */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {exercise.muscleGroups.map((group) => (
                    <span
                      key={group}
                      className="bg-lime-400 text-black text-[11px] font-semibold px-3 py-1 rounded-full"
                    >
                      {group}
                    </span>
                  ))}
                </div>

                {/* Name */}
                <h3 className="text-white text-2xl font-extrabold uppercase leading-tight">
                  {exercise.name}
                </h3>

                {/* Equipment */}
                <p className="text-gray-400 text-sm mt-2">
                  {exercise.equipment}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 mt-5 text-sm font-medium text-lime-400">
                  <span>🕒 {exercise.duration} min</span>
                  <span>🔥 {exercise.caloriesBurned} kcal</span>
                  <span>⭐ {exercise.rating}</span>
                </div>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Library;