import { FC, useRef, useState, useEffect } from "react";

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

  return (
    <div
      className={`fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-0 ${
        isClosing ? "animate-fadeOut" : "animate-fadeIn"
      }`}
    >
      <div
        className="absolute inset-0 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div
        className={`bg-blue-950 rounded-2xl p-2 relative z-10 border border-white/20 flex flex-col items-center justify-center ${
          isClosing ? "animate-scaleOut" : "animate-scaleIn"
        }`}
        style={
          imgSize
            ? {
                width: Math.min(imgSize.width, window.innerWidth * 0.95),
                height: Math.min(imgSize.height, window.innerHeight * 0.95),
                maxWidth: "95vw",
                maxHeight: "95vh",
              }
            : { maxWidth: "95vw", maxHeight: "95vh" }
        }
      >
        <button
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white bg-white/10 hover:bg-white/20 transition-colors z-20"
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
        <img
          ref={imgRef}
          src={image}
          alt="Отзыв клиента"
          className="rounded-xl bg-white object-contain"
          style={{ maxWidth: "95vw", maxHeight: "95vh" }}
          onLoad={handleImageLoad}
        />
      </div>
    </div>
  );
};

export default ReviewPopup;
