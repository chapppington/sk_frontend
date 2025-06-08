import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const AudioNotification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show notification after 1 second delay
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (isVisible && notificationRef.current) {
      gsap.fromTo(
        notificationRef.current,
        {
          opacity: 0,
          y: -50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    }
  }, [isVisible]);

  useEffect(() => {
    const handleClick = () => {
      if (notificationRef.current) {
        gsap.to(notificationRef.current, {
          opacity: 0,
          y: -50,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => setIsVisible(false),
        });
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={notificationRef}
      className="fixed top-28 left-1/2 -translate-x-1/2 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg z-[101]"
    >
      <p className="text-sm whitespace-nowrap">
        Сайт использует аудио эффекты. Нажмите в любом месте чтобы их
        активировать
      </p>
    </div>
  );
};

export default AudioNotification;
