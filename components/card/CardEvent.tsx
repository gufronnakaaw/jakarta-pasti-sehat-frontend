import { formatDateWithoutTime } from "@/utils/formatDate";
import { Chip, Tooltip } from "@heroui/react";
import { CalendarMinus } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

type CardEventProps = {
  event_id: string;
  slug: string;
  image_url: string;
  title: string;
  start: string;
  end: string;
  pillar: string;
  subpillar: string;
  status: string;
};

export default function CardEvent(event: CardEventProps) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className="group grid overflow-hidden rounded-2xl bg-white shadow-[4px_2px_18px_rgba(0,0,0,0.1)]"
    >
      <div className="relative h-[380px] overflow-hidden">
        <Image
          src={event.image_url}
          alt="thumbnail article"
          width={800}
          height={1000}
          className="h-[380px] w-auto object-cover object-center transition-all group-hover:scale-110"
        />

        <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col justify-between gap-2 bg-gradient-to-tr from-green/70 to-orange/70 p-6">
          <Tooltip
            content={`Event ${event.status}`}
            classNames={{
              content: "font-semibold text-black capitalize",
            }}
          >
            <Chip
              color="primary"
              className="self-end"
              classNames={{
                content: "font-bold px-4 capitalize",
              }}
            >
              {event.status}
            </Chip>
          </Tooltip>

          <div className="grid gap-3">
            <div className="inline-flex items-center gap-1 text-white">
              <CalendarMinus weight="bold" size={16} />
              <p className="text-sm font-medium">
                {formatDateWithoutTime(event.start)}
              </p>
            </div>

            <h1 className="line-clamp-2 text-[22px] font-extrabold leading-[120%] text-white group-hover:text-orange">
              {event.title}
            </h1>
          </div>
        </div>
      </div>
    </Link>
  );
}
