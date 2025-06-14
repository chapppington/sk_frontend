import { FC } from "react";
import Image from "next/image";
import TransitionLink from "@/components/ui/TransitionLink";
import CircleIconButton from "@/components/ui/CircleIconButton";

interface NewsGridItemProps {
  id: string | number;
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
}

const NewsGridItem: FC<NewsGridItemProps> = ({
  id,
  slug,
  title,
  description,
  date,
  readTime,
}) => {
  return (
    <article
      key={id}
      className="group relative overflow-hidden rounded-lg p-1 transition-all duration-300"
      style={{ opacity: 0 }}
    >
      <TransitionLink href={`/news/${slug}`} className="block">
        <div className="relative w-full h-56 mb-4 overflow-hidden rounded-lg aspect-[4/3]">
          <Image
            src="/news_bg.webp"
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="space-y-4">
          {/* Meta Info */}
          <div className="flex items-center space-x-4 text-white/60 text-sm md:text-base lg:text-base">
            <span>{date}</span>
            <span>•</span>
            <span>{readTime}</span>
          </div>
          <h3 className="text-xl font-medium text-white line-clamp-2 transition-colors duration-300 group-hover:text-white/80">
            {title}
          </h3>

          <p className="text-white/60 transition-colors duration-300 group-hover:text-white/80">
            {description}
          </p>
        </div>
      </TransitionLink>
      <CircleIconButton href={`/news/${slug}`} text="Читать" className="mt-6" />
    </article>
  );
};

export default NewsGridItem;
