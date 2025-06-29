import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useCardPinning(): void {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards: Element[] = gsap.utils.toArray(".card");

    cards.forEach((card: Element, index: number) => {
      const isLastCard: boolean = index === cards.length - 1;

      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        end: isLastCard ? "+=100vh" : "top top",
        endTrigger: isLastCard ? null : cards[cards.length - 1],
        pin: true,
        pinSpacing: isLastCard,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
}
