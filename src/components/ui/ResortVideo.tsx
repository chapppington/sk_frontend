"use client";

import { useRef } from "react";

interface ResortVideoProps {
  src: string;
  poster?: string;
}

const ResortVideo = ({ src, poster }: ResortVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <video
      ref={videoRef}
      className="w-full h-full object-cover"
      poster={poster}
      playsInline
      controls
      autoPlay
      loop
      muted
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default ResortVideo;
