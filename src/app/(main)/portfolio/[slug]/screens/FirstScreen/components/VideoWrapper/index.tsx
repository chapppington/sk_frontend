"use client";

import { useRef, FC } from "react";
import Image from "next/image";

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
      <Image
        src={poster}
        alt="Preview"
        fill
        priority={true}
        className="w-full h-full object-cover"
      />
    );
  }

  // Проверяем, является ли src embed/iframe ссылкой (rutube, youtube, vimeo и т.д.)
  const isEmbed =
    src.includes("rutube.ru/play/embed/") ||
    src.includes("youtube.com/embed/") ||
    src.includes("player.vimeo.com/");

  if (isEmbed) {
    return (
      <iframe
        src={src}
        width="100%"
        height="100%"
        allow="clipboard-write; autoplay"
        allowFullScreen
        frameBorder="0"
        className="w-full h-full object-cover rounded-xl"
        title="Embedded Video"
      />
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
