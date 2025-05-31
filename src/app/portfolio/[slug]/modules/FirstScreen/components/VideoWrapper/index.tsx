"use client";

import { useRef, FC } from "react";

interface IVideoWrapperProps {
  src: string;
  poster?: string;
}

const VideoWrapper: FC<IVideoWrapperProps> = ({ src, poster }) => {
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

export default VideoWrapper;
