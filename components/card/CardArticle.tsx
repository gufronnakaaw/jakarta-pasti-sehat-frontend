import { formatDateWithoutTime } from "@/utils/formatDate";
import { CalendarMinus, Clock } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

type CardArticleProp = {
  article_id: string;
  slug: string;
  pillar: string;
  subpillar: string;
  content: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  reading_time: string;
};

export default function CardArticle(article: CardArticleProp) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group grid overflow-hidden rounded-2xl bg-white shadow-[4px_2px_18px_rgba(0,0,0,0.1)]"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={article.image_url}
          alt="thumbnail article"
          width={800}
          height={800}
          className="aspect-square object-cover object-center transition-all group-hover:scale-110"
        />

        {/* === overlay === */}
        <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-tr from-green/30 to-orange/30" />
      </div>

      <div className="grid gap-4 [padding:2rem_1.5rem]">
        <div className="inline-flex items-center gap-2 text-orange">
          <p className="text-[10px] font-medium">{article.pillar}</p>
          <div className="size-1 rounded-full bg-orange" />
          <p className="line-clamp-1 text-[10px] font-medium">
            {article.subpillar}
          </p>
        </div>

        <div className="grid gap-2">
          <h1 className="line-clamp-2 text-[22px] font-extrabold leading-[120%] text-black group-hover:text-orange">
            {article.title}
          </h1>
          <p className="line-clamp-2 text-sm font-medium leading-[180%] text-gray">
            {article.description}
          </p>
        </div>

        <div className="mt-2 inline-flex items-center gap-4 text-gray">
          <div className="inline-flex items-center gap-1">
            <CalendarMinus weight="bold" size={14} />
            <p className="text-[10px] font-medium">
              {formatDateWithoutTime(article.created_at)}
            </p>
          </div>

          <div className="inline-flex items-center gap-1">
            <Clock weight="bold" size={14} />
            <p className="text-[10px] font-medium capitalize">
              {article.reading_time}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
