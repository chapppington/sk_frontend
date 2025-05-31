import { useRef } from "react";
import { IUseLogoReturn } from "../types";

export const useLogo = (): IUseLogoReturn => {
  const logoRef = useRef<HTMLDivElement>(null!);

  const createLogo = () => {
    const logoContainer = document.createElement("div");
    logoContainer.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 100000;
        pointer-events: none;
        opacity: 1;
        transition: transform 0.3s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.3s ease;
      `;

    const logoImg = document.createElement("img");
    logoImg.src = "/logo.svg";
    logoImg.alt = "СИБКОМПЛЕКТ";
    logoImg.style.cssText = `
        height: 32px;
        width: auto;
        filter: brightness(0) invert(1);
      `;
    logoContainer.appendChild(logoImg);

    document.body.appendChild(logoContainer);
    logoRef.current = logoContainer;
  };

  const cleanupLogo = () => {
    if (logoRef.current?.parentNode) {
      logoRef.current.parentNode.removeChild(logoRef.current);
    }
  };

  return { logoRef, createLogo, cleanupLogo };
};
