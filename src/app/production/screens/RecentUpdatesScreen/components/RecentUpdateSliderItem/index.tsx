"use client";

import { FC } from "react";
import Image from "next/image";
import { IRecentUpdateSliderItemProps } from "./types";

const RecentUpdateSliderItem: FC<IRecentUpdateSliderItemProps> = ({ item }) => {
  return (
    <article className="relative overflow-hidden">
      <div className="relative aspect-[1/1] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/45 to-black/90"></div>

        <div className="absolute inset-0 p-8 flex flex-col z-10">
          <div>
            <span className="inline-block p-4 border border-white/60 rounded-full">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </span>
          </div>

          <div className="mt-auto">
            <h3 className="text-2xl text-white font-light leading-tight">
              {item.title}
            </h3>
          </div>

          <div className="mt-6">
            <p className="text-white/80 text-sm font-light">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default RecentUpdateSliderItem;
