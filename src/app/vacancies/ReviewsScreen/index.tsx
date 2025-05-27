"use client";

import { FC, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import CustomContainer from "@/components/ui/CustomContainer";
import GradientHeading from "@/components/ui/GradientHeading";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import { IReviewItem } from "@/app/vacancies/ReviewsScreen/interfaces";

const reviews: IReviewItem[] = [
  {
    name: "Савлукова Лариса Алексеевна",
    position: "Заведующая складским хозяйством",
    image: "/review1.png",
    text: '«В компании "Сибкомплект" я уже почти 5 лет занимаю должность заведующей складским хозяйством. И за это время я ни разу не пожалела о своем выборе. Атмосфера в коллективе потрясающая, есть много положительных моментов, связанных с культурой компании и возможностями для профессионального развития. Здесь действительно ценят своих сотрудников и учитывается мнение каждого. Руководство всегда открыто к новым идеям и готово поддержать инициативу сотрудника. Я чувствую, что мои усилия знают и ценят, что мотивирует меня работать еще усерднее.  Особенно радует наличие корпоративных мероприятий, которые помогают строить команду. В "Сибкомплекте" уделяется внимание балансу между личной жизнью и работой, благодаря такому подходу я чувствую себя комфортно и уверенно в этой компании.»',
    shortText:
      '«В компании "Сибкомплект" я уже почти 5 лет занимаю должность заведующей складским хозяйством. Атмосфера в коллективе потрясающая, есть много положительных моментов...»',
  },
  {
    name: "Петров Сергей Николаевич",
    position: "Маляр заготовительного цеха",
    image: "/review2.png",
    text: '«В "Сибкомплекте" работаю с июля 2024 года, пришел на должность помощника маляра, быстро и успешно прошел испытательный срок, проявил себя и получил повышение на должность маляра. В компании все устраивает: заработная плата вся "белая", во время на карту, официально получаем компенсацию к заработной плате за вредность - не в каждой организации это есть. Коллектив у нас отличный, ребята рабочие, каждый знает свое дело. Мне все нравится.»',
    shortText:
      '«В "Сибкомплекте" работаю с июля 2024 года, пришел на должность помощника маляра. В компании все устраивает: заработная плата вся "белая", получаем компенсацию за вредность...»',
  },
  {
    name: "Коляда Андрей Алексеевич",
    position: "Инженер-проектировщик",
    image: "/review3.png",
    text: '«В "Сибкомплект" пришел в 2020 году на должность электрика-коммутатчика. Закончив университет в 2023 году, перевели на должность инженера-проектировщика в технический отдел. В компании есть возможность расти и развиваться, получать новые знания и опыт. Отличный коллектив, взаимодействуем и помогаем друг другу, развиваем систему наставничества. Инженеры технического отдела активно работают с молодежью, которая учится в ВУЗах, СУЗах. Нас приглашают на выставки и фестивали, чтобы мы взаимодействовали со студентами, передавали свой опыт и знания. В "Сибкомплекте" есть возможность для развития, обучения чему-то новому, компания не стоит на месте.»',
    shortText:
      '«В "Сибкомплект" пришел в 2020 году на должность электрика-коммутатчика. В 2023 году перевели на должность инженера-проектировщика. В компании есть возможность расти и развиваться...»',
  },
  {
    name: "Славецкий Роман Станиславович",
    position: "Коммерческий директор",
    image: "/review5.png",
    text: '«СибКомплект сегодня - это непрерывное развитие  и совершенствование текущих процессов, повышение квалификации персонала и взятие новых вершин по ключевым показателям предприятия. Ежедневно команда СибКомплект работает над улучшениями, которые в перспективе позволяют добиваться  высоких результатов по количеству и качеству выпускаемой продукции, чтобы оставаться для своих клиентов надёжным партнёром и поставщиком. Основываясь на ценности компании, во главе которых - "порядочность", наши  сотрудники и клиенты не беспокоятся о выполнении компанией своих обязательств. Хорошая репутация является для нас ключевым показателем, обеспечивающим стабильность заказов и отсутствие "текучки" кадров. Работать в СибКомплект не только интересно , но и выгодно, так как мы регулярно обновляем информацию с рынка труда и понимаем ценность каждого специалиста.»',
    shortText:
      "«СибКомплект сегодня - это непрерывное развитие и совершенствование текущих процессов, повышение квалификации персонала и взятие новых вершин по ключевым показателям ...»",
  },
];

const ReviewsScreen: FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const indicatorsRef = useRef<HTMLDivElement>(null);
  const indicatorsCreated = useRef<boolean>(false);
  const [activeReview, setActiveReview] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  useEffect(() => {
    // Only create indicators if they haven't been created yet
    if (indicatorsRef.current && !indicatorsCreated.current) {
      const indicatorCount = 60;
      for (let i = 0; i < indicatorCount; i++) {
        const indicator = document.createElement("div");
        indicator.className =
          "reviews-indicator-bar h-[4px] bg-white transition-all duration-300 flex-1";
        indicator.style.maxWidth = "1px";
        indicator.style.width = "1px";
        indicatorsRef.current.appendChild(indicator);
      }
      indicatorsCreated.current = true;
      // Ensure indicators are updated on initial render if swiper is ready
      if (swiperRef.current) {
        updateIndicators(swiperRef.current);
      }
    }

    // Cleanup function
    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy(true, true);
        swiperRef.current = null;
      }
      if (indicatorsRef.current) {
        indicatorsRef.current.innerHTML = "";
        indicatorsCreated.current = false;
      }
    };
  }, []);

  useEffect(() => {
    // Add event listener to close popup when pressing Escape key
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeReviewPopup();
      }
    };

    if (activeReview !== null) {
      document.addEventListener("keydown", handleEscKey);
      // Prevent scrolling when popup is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "";
    };
  }, [activeReview]);

  const updateIndicators = (swiper: SwiperType) => {
    if (!indicatorsRef.current) return;

    const slideCount = swiper.slides.filter(
      (slide: any) => !slide.classList.contains("swiper-slide-duplicate")
    ).length;
    const currentIndex = swiper.realIndex % slideCount;
    const totalPositions = 60 - 5;
    const progress = currentIndex / (slideCount - 1);
    const position = Math.round(progress * totalPositions);

    const indicators = indicatorsRef.current.querySelectorAll(
      ".reviews-indicator-bar"
    );
    indicators.forEach((indicator: any, index: number) => {
      indicator.style.height = "6px";

      if (index >= position && index < position + 5) {
        const relativePos = index - position;
        if (relativePos === 2) {
          indicator.style.height = "40px";
        } else if (relativePos === 1 || relativePos === 3) {
          indicator.style.height = "20px";
        } else {
          indicator.style.height = "4px";
        }
      }
    });
  };

  const openReviewPopup = (index: number) => {
    setIsClosing(false);
    setActiveReview(index);
  };

  const closeReviewPopup = () => {
    if (!isClosing) {
      setIsClosing(true);
      // Wait for animation to complete before removing from DOM
      setTimeout(() => {
        setActiveReview(null);
        setIsClosing(false);
      }, 300); // Match animation duration (0.3s)
    }
  };

  return (
    <section id="customer_reviews_section" className="bg-transparent py-24">
      <CustomContainer className="relative">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16">
          <div className="mb-8 md:mb-0">
            <span className="text-white/40 text-sm tracking-wider">
              [ О НАС ]
            </span>
          </div>

          <div className="flex flex-col md:max-w-3xl pt-5 lg:pt-0">
            <GradientHeading>Отзывы сотрудников</GradientHeading>
            <p className="text-white/70 mt-6">
              Наши сотрудники ценят стабильность, профессиональный рост и
              дружественную атмосферу в компании. Узнайте, что они говорят о
              работе в нашей команде.
            </p>
          </div>
        </div>

        <div className="relative pb-2">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              0: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
            }}
            loop={true}
            navigation={{
              nextEl: ".reviews-next",
              prevEl: ".reviews-prev",
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              updateIndicators(swiper);
            }}
            onSlideChange={(swiper) => updateIndicators(swiper)}
            observer={true}
            observeParents={true}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <div
                  className="flex flex-col p-8 border border-white/40 rounded-xl shadow-md h-full bg-white/5 cursor-pointer hover:border-white/60 transition-all"
                  onClick={() => openReviewPopup(index)}
                >
                  <div className="flex flex-col lg:flex-row items-start lg:items-end w-full gap-0 lg:gap-6">
                    <div className="w-40 h-40 rounded-lg overflow-hidden mb-6 lg:mb-0 flex items-center justify-center bg-white">
                      <Image
                        src={review.image}
                        alt={review.name}
                        width={160}
                        height={160}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-left lg:ml-0 flex-1">
                      <div className="font-semibold text-white text-lg mb-1 lg:mb-0">
                        {review.name}
                      </div>
                      <div className="text-white/60 text-base mb-3 lg:mb-0">
                        {review.position}
                      </div>
                    </div>
                  </div>
                  <div className="text-white/80 text-base leading-relaxed mt-4 lg:mt-8">
                    {review.shortText}
                  </div>
                  <div className="mt-4 text-sm text-white/50 flex items-center">
                    <span className="mr-2">Читать полностью</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M13 7l5 5-5 5M5 12h13"
                      ></path>
                    </svg>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex items-center mt-8">
            <div className="flex items-center space-x-3 mr-8">
              <button className="reviews-prev w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white/60 transition-colors">
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

              <button className="reviews-next w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white/60 transition-colors">
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

            <div className="flex-1 relative hidden sm:block">
              <div
                ref={indicatorsRef}
                className="flex items-center justify-between w-full"
              >
                {/* Indicator bars will be generated by JavaScript */}
              </div>
            </div>
          </div>
        </div>
      </CustomContainer>

      {/* Review Popup */}
      {activeReview !== null && (
        <div
          className={`fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4 ${
            isClosing ? "animate-fadeOut" : "animate-fadeIn"
          }`}
        >
          <div
            className="absolute inset-0 backdrop-blur-sm"
            onClick={closeReviewPopup}
          ></div>
          <div
            className={`bg-gray-900 rounded-xl p-8 max-w-4xl w-full relative z-10 border border-white/20 ${
              isClosing ? "animate-scaleOut" : "animate-scaleIn"
            }`}
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white bg-white/10 hover:bg-white/20 transition-colors"
              onClick={closeReviewPopup}
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>

            <div className="flex flex-col sm:flex-row items-end gap-6 mb-8">
              <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-lg overflow-hidden bg-white flex-shrink-0">
                <Image
                  src={reviews[activeReview].image}
                  alt={reviews[activeReview].name}
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-white text-2xl font-bold mb-2">
                  {reviews[activeReview].name}
                </h3>
                <p className="text-white/70 text-lg">
                  {reviews[activeReview].position}
                </p>
              </div>
            </div>

            <div className="text-white/90 text-lg leading-relaxed">
              {reviews[activeReview].text}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ReviewsScreen;
