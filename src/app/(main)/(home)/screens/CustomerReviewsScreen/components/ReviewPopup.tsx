import { FC, useRef, useState, useEffect } from "react";
import Image from "next/image";

interface ReviewPopupProps {
  image: string;
  isClosing: boolean;
  onClose: () => void;
}

const ReviewPopup: FC<ReviewPopupProps> = ({ image, isClosing, onClose }) => {
  const [imgSize, setImgSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setImgSize({
        width: imgRef.current.naturalWidth,
        height: imgRef.current.naturalHeight,
      });
    }
  }, []);

  const handleImageLoad = () => {
    if (imgRef.current) {
      setImgSize({
        width: imgRef.current.naturalWidth,
        height: imgRef.current.naturalHeight,
      });
    }
  };

  // A4 proportional sizing - 90% height on desktop, auto width
  const getImageStyles = () => {
    const screenWidth = window.innerWidth;
    const isDesktop = screenWidth >= 1024;

    if (isDesktop) {
      // On desktop: 90% height, width auto-calculated to maintain A4 ratio
      return {
        height: "90vh",
        width: "auto",
        maxWidth: "95vw", // Prevent overflow
      };
    } else {
      // On mobile: fit to screen
      return {
        maxHeight: "85vh",
        maxWidth: "90vw",
        height: "auto",
        width: "auto",
      };
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 z-50 flex items-center justify-center ${
        isClosing ? "animate-fadeOut" : "animate-fadeIn"
      }`}
    >
      <div
        className="absolute inset-0 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Main content area */}
      <div className="relative flex items-center justify-center">
        {/* Image */}
        <Image
          ref={imgRef}
          src={image}
          alt="Отзыв клиента"
          width={imgSize?.width || 800}
          height={imgSize?.height || 600}
          className={`rounded-lg bg-white object-contain shadow-2xl ${
            isClosing ? "animate-scaleOut" : "animate-scaleIn"
          }`}
          style={getImageStyles()}
          onLoad={handleImageLoad}
        />

        {/* Close button - positioned to the right of image */}
        <button
          className="absolute -right-12 lg:-right-16 top-4 lg:top-6 w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-white/80 hover:text-white bg-black/60 hover:bg-black/80 transition-colors shadow-lg"
          onClick={onClose}
        >
          <svg
            className="w-5 h-5 lg:w-6 lg:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ReviewPopup;
