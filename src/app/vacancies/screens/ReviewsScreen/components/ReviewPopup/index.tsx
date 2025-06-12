import { FC } from "react";
import Image from "next/image";
import { ReviewPopupProps } from "./types";

const ReviewPopup: FC<ReviewPopupProps> = ({ review, isClosing, onClose }) => {
  return (
    <div
      className={`fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4 ${
        isClosing ? "animate-fadeOut" : "animate-fadeIn"
      }`}
    >
      <div
        className="absolute inset-0 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div
        className={`bg-gray-900 rounded-xl p-8 max-w-4xl w-full relative z-10 border border-white/20 ${
          isClosing ? "animate-scaleOut" : "animate-scaleIn"
        }`}
      >
        <button
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white bg-white/10 hover:bg-white/20 transition-colors"
          onClick={onClose}
        >
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <div className="flex flex-col sm:flex-row items-end gap-6 mb-8">
          <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-lg overflow-hidden bg-white flex-shrink-0">
            <Image
              src={review.image}
              alt={review.name}
              width={192}
              height={192}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-white text-2xl font-bold mb-2">
              {review.name}
            </h3>
            <p className="text-white/70 text-lg">
              {review.position}
            </p>
          </div>
        </div>

        <div className="text-white/90 text-lg leading-relaxed">
          {review.text}
        </div>
      </div>
    </div>
  );
};

export default ReviewPopup; 