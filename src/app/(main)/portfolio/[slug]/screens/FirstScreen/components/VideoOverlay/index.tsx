"use client";

import { FC, useState } from "react";
import { PlayCircle } from "lucide-react";
import VideoPopup from "../VideoPopup";

interface VideoOverlayProps {
  videoSrc: string;
  fullVideoSrc: string | null;
  posterSrc: string;
}

const VideoOverlay: FC<VideoOverlayProps> = ({
  videoSrc,
  fullVideoSrc,
  posterSrc,
}) => {
  const [isVideoPopupOpen, setIsVideoPopupOpen] = useState(false);

  if (!videoSrc || videoSrc === "null") {
    return null;
  }

  return (
    <>
      <button
        className="absolute inset-0 flex items-center justify-center bg-black/80 opacity-0 hover:opacity-100 transition-opacity group"
        aria-label="Play video"
        onClick={() => setIsVideoPopupOpen(true)}
      >
        <div className="flex flex-col items-center gap-4">
          <span className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center group-hover:bg-white/40 transition-all">
            <PlayCircle
              className="w-12 h-12 text-white drop-shadow-lg"
              strokeWidth={1.5}
            />
          </span>
          <span className="text-white text-lg font-medium">
            Смотреть {fullVideoSrc ? "полностью" : "видео"}
          </span>
        </div>
      </button>

      <VideoPopup
        isOpen={isVideoPopupOpen}
        onClose={() => setIsVideoPopupOpen(false)}
        videoSrc={fullVideoSrc || videoSrc}
        posterSrc={posterSrc}
      />
    </>
  );
};

export default VideoOverlay;
