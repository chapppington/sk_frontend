"use client";

import { useRef } from "react";

interface ResortVideoProps {
  src: string;
  poster?: string;
  captions?: string;
}

const ResortVideo = ({ src, poster, captions }: ResortVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <video
      ref={videoRef}
      className="w-full h-full object-cover"
      poster={poster}
      playsInline
    >
      <source src={src} type="video/mp4" />
      {captions && (
        <track
          src={captions}
          kind="captions"
          srcLang="ru"
          label="Русский"
          default
        />
      )}
    </video>
  );
};

export default ResortVideo;
