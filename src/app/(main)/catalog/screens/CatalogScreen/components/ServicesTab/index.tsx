"use client";

import { FC, useEffect } from "react";
import { useLenis } from "lenis/react";
import gsap from "gsap";

import ServiceCard from "../ServiceCard";
import { services } from "../../mock_data";
import { ServicesTabProps } from "./types";

const ServicesTab: FC<ServicesTabProps> = ({ servicesGridRef }) => {
  const lenis = useLenis();

  // GSAP animations for grid items
  useEffect(() => {
    if (servicesGridRef.current) {
      const items = servicesGridRef.current.children;
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out",
          onComplete: () => {
            if (lenis) {
              lenis.resize();
            }
          },
        }
      );
    }
  }, []);

  return (
    <div className="flex-1">
      <div
        ref={servicesGridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16"
      >
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            id={service.id}
            title={service.title}
            description={service.description}
            category={service.category}
            link={service.link}
            isExternal={/^https?:\/\//.test(service.link)}
            openInNewTab={/^https?:\/\//.test(service.link)}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesTab;
