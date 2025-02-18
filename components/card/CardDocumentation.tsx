import { Documentation } from "@/types/documentation";
import Image from "next/image";
import Link from "next/link";

export default function CardDocumentation(documentation: Documentation) {
  return (
    <Link
      href={`/documentations/${documentation.slug}`}
      className="group grid overflow-hidden rounded-2xl bg-white shadow-[4px_2px_18px_rgba(0,0,0,0.1)]"
    >
      <div className="relative h-[380px] overflow-hidden">
        <Image
          src={documentation.thumbnail_url}
          alt={documentation.title}
          width={800}
          height={1000}
          className="h-full w-full object-cover object-center transition-all group-hover:scale-110"
        />

        <div className="absolute left-0 top-0 z-10 flex h-full w-full items-end bg-gradient-to-tr from-green/70 to-orange/70 p-6">
          <div className="grid gap-3">
            <div className="inline-flex items-center gap-2 text-white">
              <p className="text-sm font-medium">{documentation.pillar}</p>
              <div className="size-1 rounded-full bg-white" />
              <p className="line-clamp-1 text-sm font-medium">
                {documentation.subpillar}
              </p>
            </div>

            <h1 className="line-clamp-2 text-[22px] font-extrabold leading-[120%] text-white group-hover:text-orange">
              {documentation.title}
            </h1>
          </div>
        </div>
      </div>
    </Link>
  );
}
