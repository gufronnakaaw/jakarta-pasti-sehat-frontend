import { Button, Chip } from "@heroui/react";
import { ArrowUpRight, Clock, MapPin } from "@phosphor-icons/react";

export default function CardCareer() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-12 rounded-2xl bg-white p-8 shadow-[4px_2px_18px_rgba(0,0,0,0.1)]">
      <div className="grid flex-1 gap-6">
        <div className="grid gap-2">
          <Chip
            color="success"
            variant="flat"
            classNames={{
              content: "font-bold px-4",
            }}
          >
            Tersedia
          </Chip>

          <h1 className="line-clamp-2 text-[20px] font-extrabold leading-[120%] text-black md:text-[24px]">
            SEO Marketing Manager
          </h1>
        </div>

        <div className="inline-flex items-center gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-orange text-orange [padding:6px_12px]">
            <MapPin weight="fill" size={18} />
            <p className="text-sm font-bold md:text-base">Onsite</p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border-2 border-orange text-orange [padding:6px_12px]">
            <Clock weight="fill" size={18} />
            <p className="text-sm font-bold md:text-base">Fulltime</p>
          </div>
        </div>
      </div>

      <Button
        color="primary"
        endContent={<ArrowUpRight weight="bold" size={18} />}
        className="w-full px-8 font-bold lg:w-max"
      >
        Apply
      </Button>
    </div>
  );
}
