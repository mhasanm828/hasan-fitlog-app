import Image from "next/image";

async function getWorkout(id) {
  const res = await fetch(
    `https://api.api-store.workers.dev/api/fitlog/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Workout not found");
  }

  return res.json();
}

export default async function WorkoutDetails({ params }) {
  // ✅ Next.js 16 fix
  const { id } = await params;

  const workout = await getWorkout(id);

  return (
    <section className="max-w-7xl mx-auto p-8 text-white">
      <div className="grid lg:grid-cols-2 gap-8">
        <Image
          src={workout.image}
          alt={workout.name}
          width={600}
          height={600}
          className="rounded-2xl w-full object-cover"
        />

        <div>
          <h1 className="text-5xl font-bold uppercase">{workout.name}</h1>
          <p className="mt-4 text-gray-300">{workout.description}</p>
        </div>
      </div>
    </section>
  );
}