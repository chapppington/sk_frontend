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

  // Calculate responsive sizes
  const getPopupSize = () => {
    if (!imgSize) return { maxWidth: "95vw", maxHeight: "95vh" };

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Minimum sizes for different devices
    const minDesktopWidth = 700;
    const minDesktopHeight = 500;
    const minMobileWidth = 350;
    const minMobileHeight = 250;

    // Maximum percentages of screen
    const maxWidthPercent = screenWidth >= 1024 ? 0.85 : 0.98; // 85% on desktop, 98% on mobile
    const maxHeightPercent = screenWidth >= 1024 ? 0.85 : 0.98; // 85% on desktop, 98% on mobile

    // Calculate target dimensions
    let targetWidth = Math.max(
      imgSize.width,
      screenWidth >= 1024 ? minDesktopWidth : minMobileWidth
    );
    let targetHeight = Math.max(
      imgSize.height,
      screenWidth >= 1024 ? minDesktopHeight : minMobileHeight
    );

    // Constrain to screen size
    targetWidth = Math.min(targetWidth, screenWidth * maxWidthPercent);
    targetHeight = Math.min(targetHeight, screenHeight * maxHeightPercent);

    return {
      width: targetWidth,
      height: targetHeight,
      maxWidth: `${maxWidthPercent * 100}vw`,
      maxHeight: `${maxHeightPercent * 100}vh`,
    };
  };

  // Get image styles
  const getImageStyles = () => {
    const screenWidth = window.innerWidth;
    return {
      maxWidth: "100%",
      maxHeight: "100%",
      minWidth: screenWidth >= 1024 ? "600px" : "320px",
      minHeight: screenWidth >= 1024 ? "400px" : "200px",
    };
  };

  return (
    <div
      className={`fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-1 sm:p-4 ${
        isClosing ? "animate-fadeOut" : "animate-fadeIn"
      }`}
    >
      <div
        className="absolute inset-0 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div
        className={`bg-blue-950 rounded-xl sm:rounded-2xl p-0 sm:p-4 relative z-10 border border-white/20 flex flex-col items-center justify-center ${
          isClosing ? "animate-scaleOut" : "animate-scaleIn"
        }`}
        style={getPopupSize()}
      >
        <button
          className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white bg-black/50 hover:bg-black/70 transition-colors z-20"
          onClick={onClose}
        >
          <svg
            width="16"
            height="16"
            className="sm:w-5 sm:h-5"
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
        <Image
          ref={imgRef}
          src={image}
          alt="Отзыв клиента"
          width={imgSize?.width || 800}
          height={imgSize?.height || 600}
          className="rounded-xl sm:rounded-xl bg-white object-contain w-full h-full"
          style={getImageStyles()}
          onLoad={handleImageLoad}
        />
      </div>
    </div>
  );
};

export default ReviewPopup;
