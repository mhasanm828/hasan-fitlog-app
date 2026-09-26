import Image from "next/image";

async function getWorkout(id) {
  const res = await fetch(
    `https://api.api-store.workers.dev/api/fitlog/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Workout not found");

  return res.json();
}

export default async function WorkoutDetails({ params }) {
  const workout = await getWorkout(params.id);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 text-white">
      <div className="grid lg:grid-cols-2 gap-10">
        <Image
          src={workout.image}
          alt={workout.name}
          width={600}
          height={600}
          className="rounded-2xl w-full object-cover"
        />

        <div>
          <h1 className="text-4xl font-bold uppercase">{workout.name}</h1>

          <p className="text-gray-300 mt-4">{workout.description}</p>

          <div className="flex gap-2 mt-5">
            {workout.category.map((tag) => (
              <span
                key={tag}
                className="bg-lime-400 text-black px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Add specs & buttons here */}
        </div>
      </div>
    </section>
  );
}