import { PublicCareer } from "@/types/career";
import { Button } from "@heroui/react";
import { ArrowUpRight, Clock, MapPin } from "@phosphor-icons/react";
import { useRouter } from "next/router";

type CardCareerProps = PublicCareer;

export default function CardCareer(career: CardCareerProps) {
  const router = useRouter();

  return (
    <div className="flex flex-wrap items-center justify-between gap-12 rounded-2xl bg-white p-8 shadow-[4px_2px_18px_rgba(0,0,0,0.1)]">
      <div className="grid flex-1 gap-6">
        <div className="grid gap-2">
          <div className="inline-flex items-center gap-2 text-orange">
            <p className="font-medium">{career.pillar}</p>
            <div className="size-1.5 rounded-full bg-orange" />
            <p className="line-clamp-1 font-medium">{career.subpillar}</p>
          </div>

          <h1 className="line-clamp-2 text-[20px] font-extrabold capitalize leading-[120%] text-black md:text-[24px]">
            {career.title}
          </h1>
        </div>

        <div className="inline-flex items-center gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-orange text-orange [padding:4px_12px]">
            <MapPin weight="fill" size={18} />
            <p className="text-[12px] font-bold capitalize md:text-base">
              {career.location}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border-2 border-orange text-orange [padding:4px_12px]">
            <Clock weight="fill" size={18} />
            <p className="text-[12px] font-bold capitalize md:text-base">
              {career.type}
            </p>
          </div>
        </div>
      </div>

      <Button
        color="primary"
        endContent={<ArrowUpRight weight="bold" size={18} />}
        onPress={() => router.push(`/careers/${career.slug}`)}
        className="w-full px-8 font-bold lg:w-max"
      >
        Apply
      </Button>
    </div>
  );
}
