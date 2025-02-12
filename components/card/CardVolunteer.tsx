import { Button } from "@heroui/react";
import { ArrowUpRight, CalendarMinus } from "@phosphor-icons/react";
import { useRouter } from "next/router";

export default function CardVolunteer() {
  const router = useRouter();

  return (
    <div className="flex flex-wrap items-center justify-between gap-12 rounded-2xl bg-white p-8 shadow-[4px_2px_18px_rgba(0,0,0,0.1)]">
      <div className="grid flex-1 gap-6">
        <div className="grid gap-2">
          <div className="inline-flex items-center gap-2 text-orange">
            <p className="font-medium">Pilar 1</p>
            <div className="size-1.5 rounded-full bg-orange" />
            <p className="line-clamp-1 font-medium">Penyakit Tidak Menular</p>
          </div>

          <h1 className="line-clamp-2 text-[20px] font-extrabold leading-[120%] text-black md:text-[24px]">
            Open Reqruitment Volunteer Batch 2 Jakarta Pasti Sehat
          </h1>
        </div>

        <div className="inline-flex items-center gap-2 text-gray">
          <CalendarMinus weight="bold" size={16} />
          <p className="text-sm font-medium">
            Diupload: Jumat, 7 Februari 2025
          </p>
        </div>
      </div>

      <Button
        color="primary"
        endContent={<ArrowUpRight weight="bold" size={18} />}
        onPress={() => router.push("/volunteers/asd")}
        className="w-full px-8 font-bold lg:w-max"
      >
        Apply
      </Button>
    </div>
  );
}
