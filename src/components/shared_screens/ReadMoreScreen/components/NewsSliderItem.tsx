import { FC } from "react";
import Image from "next/image";
import TransitionLink from "@/components/ui/TransitionLink";
import { INewsItem } from "../types";

interface NewsSliderItemProps {
  item: INewsItem;
}

const NewsSliderItem: FC<NewsSliderItemProps> = ({ item }) => {
  return (
    <TransitionLink href={item.link} className="block">
      <article className="group relative overflow-hidden">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg transition-all duration-300 ease-in-out">
          <Image
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover md:transition-transform md:duration-500 md:ease-in-out md:group-hover:scale-105"
            fill
          />
          {/* Default overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60 transition-opacity duration-300 ease-in-out"></div>

          {/* Darker overlay that appears on hover */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/45 to-black/90 opacity-100"></div>

          {/* Content overlay */}
          <div className="absolute inset-0 p-6 flex flex-col z-10">
            {/* Top content */}
            <div>
              <span className="inline-block px-4 py-2 bg-black/80 backdrop-blur-sm text-white text-sm rounded font-light">
                {item.category}
              </span>
            </div>

            {/* Bottom content */}
            <div className="mt-auto xl:transition-transform xl:duration-300 xl:ease-in-out xl:group-hover:-translate-y-36">
              <div className="flex items-center space-x-3 text-white/80 text-sm mb-3">
                <span>{item.date}</span>
                <span>•</span>
                <span>{item.readTime}</span>
              </div>
              <h3 className="text-2xl text-white font-light leading-tight">
                {item.title}
              </h3>
            </div>

            {/* Description and Button that appear on hover (desktop only) */}
            <div className="absolute bottom-6 left-6 right-6 hidden xl:block transform translate-y-16 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
              <p className="text-white/80 text-sm mb-6">
                {item.description.length > 80
                  ? `${item.description.slice(0, 80)}...`
                  : item.description}
              </p>
              <div className="inline-flex items-center group/news-button">
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover/news-button:border-white/60 transition-colors duration-300">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 17L17 7M17 7H7M17 7V17"
                    ></path>
                  </svg>
                </div>
                <span className="ml-4 text-white text-lg border-b border-white/30 transition-colors duration-300 group-hover/news-button:border-white">
                  Читать
                </span>
              </div>
            </div>

            {/* Button for mobile and tablet devices */}
            <div className="mt-6 block xl:hidden">
              <div className="inline-flex items-center group/news-button">
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 17L17 7M17 7H7M17 7V17"
                    ></path>
                  </svg>
                </div>
                <span className="ml-4 text-white text-lg border-b border-white/30">
                  Читать
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </TransitionLink>
  );
};

export default NewsSliderItem;
