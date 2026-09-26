import Image from "next/image";
import Link from "next/link";

export default function WorkoutCard({ workout }) {
  return (
    <Link href={`/workout/${workout.id}`}>
      <div className="bg-[#111827] rounded-2xl overflow-hidden border border-slate-800 hover:border-lime-400 transition">

        <div className="relative h-52">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {(workout.categories || []).map((tag) => (
              <span
                key={tag}
                className="bg-lime-400 text-black text-xs px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-white font-bold uppercase text-xl">
            {workout.name}
          </h3>

          <p className="text-gray-400 text-sm mt-1">
            {workout.equipment}
          </p>

          <div className="flex justify-between mt-4 text-lime-400 text-sm">
            <span>🕒 {workout.duration}</span>
            <span>🔥 {workout.calories}</span>
            <span>⭐ {workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}