"use client";

import { useRef, FC } from "react";

interface IVideoWrapperProps {
  src: string;
  poster?: string;
  onlyShowPoster?: boolean;
}

const MediaPreview: FC<IVideoWrapperProps> = ({
  src,
  poster,
  onlyShowPoster = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  if (onlyShowPoster && poster) {
    return (
      <img src={poster} alt="Preview" className="w-full h-full object-cover" />
    );
  }

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

export default MediaPreview;
