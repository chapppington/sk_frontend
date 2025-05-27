"use client";

import { FC, useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import CustomContainer from "@/components/ui/CustomContainer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import GradientHeading from "@/components/ui/GradientHeading";
import TransitionLink from "@/components/ui/TransitionLink";
import AnimatedText from "@/components/ui/textAnimation/AnimatedText";
import ParallaxImage from "@/components/ui/ParallaxImage";

// Mock news data - replace with your actual data source
const newsItems = [
  {
    id: 1,
    category: "Производство",
    title:
      "Новая модель организационной деятельности оказалась чрезвычайно полезной",
    date: "29 Января 2024",
    readTime: "5 минут",
    description:
      "Являясь всего лишь частью общей картины, тщательные исследования конкурентов могут быть описаны максимально подробно.",
    image: "/news_bg.webp",
    slug: "novaya-model-organizatsionnoy-deyatelnosti",
  },
  {
    id: 2,
    category: "Технологии",
    title: "Внедрение современных методов управления производством",
    date: "25 Января 2024",
    readTime: "7 минут",
    description:
      "Значимость этих проблем настолько очевидна, что постоянное информационно-пропагандистское обеспечение нашей деятельности позволяет оценить значение форм развития.",
    image: "/news_bg2.webp",
    slug: "vnedrenie-sovremennyh-metodov-upravleniya",
  },
  {
    id: 3,
    category: "Инновации",
    title: "Запуск новой производственной линии в Казахстане",
    date: "20 Января 2024",
    readTime: "4 минуты",
    description:
      "Приятно, граждане, наблюдать, как элементы политического процесса призваны к ответу. В целом, конечно, выбранный нами инновационный путь однозначно определяет каждого участника.",
    image: "/news_bg.webp",
    slug: "zapusk-novoy-proizvodstvennoy-linii",
  },
  {
    id: 4,
    category: "Развитие",
    title: "Расширение дилерской сети в регионах России",
    date: "15 Января 2024",
    readTime: "6 минут",
    description:
      "Повседневная практика показывает, что сложившаяся структура организации требует от нас анализа поставленных обществом задач.",
    image: "/news_bg2.webp",
    slug: "rasshirenie-dilerskoy-seti",
  },
];

const FirstScreen: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [prevIndex, setPrevIndex] = useState(0);
  const [key, setKey] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Reset all elements to initial state with smaller y offset
    gsap.set(
      [
        contentRef.current,
        categoryRef.current,
        titleRef.current,
        metaRef.current,
        descriptionRef.current,
        buttonRef.current,
      ],
      {
        opacity: 0,
        y: 10,
      }
    );

    // Create the animation sequence with smoother easing
    const tl = gsap.timeline({
      defaults: {
        ease: "expo.out",
        duration: 0.3,
      },
    });

    // Animate elements one after another with no overlap
    tl.to(contentRef.current, {
      opacity: 1,
      y: 0,
    })
      .to(categoryRef.current, {
        opacity: 1,
        y: 0,
      })
      .to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
        },
        "-=0.3"
      )
      .to(
        metaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
        "-=0.3"
      )
      .to(
        descriptionRef.current,
        {
          opacity: 1,
          y: 0,
        },
        "-=0.5"
      )
      .to(
        buttonRef.current,
        {
          opacity: 1,
          y: 0,
        },
        "-=0.35"
      );

    return () => {
      tl.kill();
    };
  }, [currentIndex]);

  useEffect(() => {
    // Animate image transition
    if (imageRefs.current[currentIndex] && imageRefs.current[prevIndex]) {
      const currentImage = imageRefs.current[currentIndex];
      const prevImage = imageRefs.current[prevIndex];

      // Set initial states
      gsap.set(currentImage, { opacity: 0, zIndex: 2 });
      gsap.set(prevImage, { opacity: 1, zIndex: 1 });

      // Create a timeline for image transitions
      const imageTl = gsap.timeline({
        defaults: {
          ease: "back.in",
          duration: 0.01,
        },
      });

      imageTl
        .to(currentImage, {
          opacity: 1,
        })
        .to(
          prevImage,
          {
            opacity: 0,
          },
          "-=0.15"
        );

      return () => {
        imageTl.kill();
      };
    }
  }, [currentIndex, prevIndex]);

  const handlePrev = () => {
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : newsItems.length - 1));
    setKey((prev) => prev + 1);
  };

  const handleNext = () => {
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev < newsItems.length - 1 ? prev + 1 : 0));
    setKey((prev) => prev + 1);
  };

  const currentNews = newsItems[currentIndex];

  const content = (
    <>
      {/* Base Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-20"></div>

      {/* Image Stack with Parallax */}
      <div className="absolute inset-0 overflow-hidden select-none pointer-events-none">
        {newsItems.map((news, index) => (
          <div
            key={news.id}
            className="absolute inset-0"
            style={{
              opacity: index === currentIndex ? 1 : 0,
              zIndex: index === currentIndex ? 2 : 1,
              transition: "opacity 0.8s ease-in-out",
            }}
          >
            <ParallaxImage
              src={news.image}
              alt={news.title}
              priority={index === 0}
              isMobile={isMobile}
            />
          </div>
        ))}
      </div>

      {/* Mobile Navigation - Absolute Positioned */}
      <div className="md:hidden flex items-center justify-between absolute bottom-6 left-0 right-0 px-8 z-[31]">
        {/* Page Counter */}
        <div className="text-white text-lg news-counter-mobile">
          <span className="text-2xl current-page">
            {String(currentIndex + 1).padStart(2, "0")}
          </span>
          <span className="text-white/60">
            /{String(newsItems.length).padStart(2, "0")}
          </span>
        </div>

        {/* Navigation Arrows */}
        <div className="flex space-x-4">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white/60 transition-colors prev-btn"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white/60 transition-colors next-btn"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content Container */}
      <CustomContainer className="h-[100svh] flex flex-col justify-end relative z-30">
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Новости", href: "#", current: true },
          ]}
          disableContainer={true}
        />
        {/* Desktop Navigation - Absolute Positioned */}
        <div className="hidden md:flex items-center absolute bottom-20 right-4 md:right-10 xl:right-24 z-[50]">
          {/* Page Counter */}
          <div className="text-white text-xl news-counter">
            <span className="text-4xl current-page">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-white/60">
              /{String(newsItems.length).padStart(2, "0")}
            </span>
          </div>

          {/* Navigation Arrows */}
          <div className="flex ml-5">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white/60 transition-colors prev-btn mr-4"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white/60 transition-colors next-btn"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        {/* Content Area */}
        <div className="flex-1 flex flex-col justify-end align-start z-30 mb-24 md:mb-6 lg:mb-18">
          <div ref={contentRef} className="md:mb-14 news-content">
            {/* Category */}
            <div ref={categoryRef} className="mb-8 lg:mb-10 news-category">
              <span className="px-4 py-2 border border-white text-white text-sm rounded font-light">
                {currentNews.category}
              </span>
            </div>

            {/* Title */}
            <div ref={titleRef}>
              <TransitionLink
                href={`/news/${currentNews.slug}`}
                className="block hover:opacity-90 transition-opacity"
              >
                <AnimatedText
                  key={`title-${key}`}
                  animateOnScroll={false}
                  delay={0.1}
                >
                  <GradientHeading className="mb-4">
                    {currentNews.title}
                  </GradientHeading>
                </AnimatedText>
              </TransitionLink>
            </div>

            {/* Meta Info */}
            <AnimatedText
              key={`meta-${key}`}
              animateOnScroll={false}
              delay={0.2}
            >
              <div
                ref={metaRef}
                className="flex items-center space-x-4 text-white/60 text-sm md:text-base lg:text-base news-meta"
              >
                <span>{currentNews.date}</span>
                <span className="px-2"> • </span>
                <span>{currentNews.readTime}</span>
              </div>
            </AnimatedText>

            {/* Description */}
            <AnimatedText
              key={`desc-${key}`}
              animateOnScroll={false}
              delay={0.4}
            >
              <p
                ref={descriptionRef}
                className="text-sm md:text-base lg:text-lg text-white/80 max-w-3xl mt-4 news-description"
              >
                {currentNews.description}
              </p>
            </AnimatedText>

            {/* Read More Button */}
            <div ref={buttonRef} className="mt-6">
              <TransitionLink href={`/news/${currentNews.slug}`}>
                <div className="inline-flex items-center group news-button">
                  <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white/60 transition-colors">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 17L17 7M17 7H7M17 7V17"
                      ></path>
                    </svg>
                  </div>
                  <span className="ml-4 text-white text-lg">Читать</span>
                </div>
              </TransitionLink>
            </div>
          </div>
        </div>
      </CustomContainer>
    </>
  );

  return (
    <header className="relative h-[100svh] overflow-hidden">
      <div className="relative h-full">{content}</div>
    </header>
  );
};

export default FirstScreen;
