"use client"

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { IParallaxImageProps } from "@/components/ui/ParallaxImage/interfaces";

const ParallaxImage: FC<IParallaxImageProps> = ({
  src,
  alt,
  priority = false,
  quality = 90,
  className = "",
  parallaxFactor = 0.3,
  isMobile = false,
}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-[120%] w-full -top-[10%]">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className={`object-cover ${className}`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        quality={quality}
        style={{
          transform: isMobile
            ? "none"
            : `translateY(${scrollY * parallaxFactor}px)`,
          transition: "transform 0.1s ease-out",
        }}
      />
    </div>
  );
};

export default ParallaxImage;
