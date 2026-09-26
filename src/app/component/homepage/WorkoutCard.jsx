import Image from "next/image";
import Link from "next/link";

export default function WorkoutCard({ workout }) {
  return (
    <Link href={`/workout/${workout.id}`}>
      <div className="bg-[#121A27] rounded-2xl overflow-hidden border border-[#263244] hover:border-lime-400 transition-all duration-300 hover:-translate-y-1 cursor-pointer">

        {/* Image */}
        <div className="relative h-52">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mb-3">
            {workout.category.map((tag) => (
              <span
                key={tag}
                className="bg-lime-400 text-black text-[11px] font-semibold px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-white text-2xl font-bold uppercase leading-tight">
            {workout.name}
          </h3>

          {/* Equipment */}
          <p className="text-gray-400 text-sm mt-2">
            {workout.equipment.join(", ")}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 mt-5 text-sm text-lime-400 font-medium">
            <span>🕒 {workout.duration}</span>
            <span>🔥 {workout.calories}</span>
            <span>⭐ {workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}