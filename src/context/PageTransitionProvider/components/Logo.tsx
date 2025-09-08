import { FC } from "react";
import Image from "next/image";
import { IUseLogoReturn } from "../types";

interface LogoProps {
  logoRef: IUseLogoReturn["logoRef"];
  isVisible: boolean;
}

export const Logo: FC<LogoProps> = ({ logoRef, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div
      ref={logoRef}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 100000,
        pointerEvents: "none",
        opacity: 1,
        transition:
          "transform 0.3s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.3s ease",
      }}
    >
      <Image
        src="/logo.svg"
        alt="СИБКОМПЛЕКТ"
        width={150}
        height={52}
        priority
        style={{
          height: "32px",
          width: "auto",
          objectFit: "contain",
          filter: "brightness(0) invert(1)",
        }}
      />
    </div>
  );
};
