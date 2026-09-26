import React from "react";

const getExercise = async () => {
  const response = await fetch(
    "https://api.api-store.workers.dev/api/fitlog",
    {
      cache: "no-store",
    }
  );

  const data = await response.json();
  return data; // ✅ return the data
};

const Library = async () => {
  const exerciseData = await getExercise();

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-white uppercase mb-6">
        THE LIBRARY
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exerciseData.map((exercise) => (
          <div
            key={exercise.id}
            className="bg-slate-900 p-4 rounded-xl text-white"
          >
            <img
              src={exercise.image}
              alt={exercise.name}
              className="w-full h-48 object-cover rounded-lg"
            />

            <h3 className="mt-3 text-xl font-bold">{exercise.name}</h3>
            <p className="text-gray-400">{exercise.equipment}</p>

            <div className="flex justify-between mt-3 text-lime-400 text-sm">
              <span>🕒 {exercise.duration}</span>
              <span>🔥 {exercise.calories}</span>
              <span>⭐ {exercise.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Library;