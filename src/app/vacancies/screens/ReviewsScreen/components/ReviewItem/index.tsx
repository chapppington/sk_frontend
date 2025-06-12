import { FC } from "react";
import Image from "next/image";
import { ReviewItemProps } from "./types";

const ReviewItem: FC<ReviewItemProps> = ({ review, onClick }) => {
  return (
    <div
      className="flex flex-col p-8 border border-white/40 rounded-xl shadow-md h-full bg-white/5 cursor-pointer hover:border-white/60 transition-all"
      onClick={onClick}
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-end w-full gap-0 lg:gap-8">
        <div className="w-40 h-40 rounded-lg overflow-hidden mb-6 lg:mb-0 flex items-center justify-center bg-white">
          <Image
            src={review.image}
            alt={review.name}
            width={160}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-left lg:ml-0 flex-1">
          <div className="font-semibold text-white text-lg mb-1 lg:mb-0">
            {review.name}
          </div>
          <div className="text-white/60 text-base mb-3 lg:mb-0">
            {review.position}
          </div>
        </div>
      </div>
      <div className="text-white/80 text-base leading-relaxed mt-4 lg:mt-7">
        {review.shortText}
      </div>
      <div className="mt-4 text-sm text-white/50 flex items-center">
        <span className="mr-2">Читать полностью</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M13 7l5 5-5 5M5 12h13"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default ReviewItem; 