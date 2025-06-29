import { FC } from "react";
import Image from "next/image";
import { useCardAnimation } from "../../hooks/useCardAnimation";
import { CardProps } from "./types";
import MainButton from "@/components/ui/MainButton";

const PortfolioCard: FC<CardProps> = ({
  title,
  description,
  imageUrl,
  alt,
  slug,
  hasMarquee,
  isIntroCard,
  isLastCard,
  totalCards,
}) => {
  const {
    cardRef,
    titleRef,
    descriptionRef,
    imgWrapperRef,
    imgRef,
    marqueeRef,
    scrollHintRef,
  } = useCardAnimation(isIntroCard, isLastCard, totalCards);

  return (
    <div className="card" ref={cardRef}>
      {hasMarquee && (
        <div className="card-marquee">
          <div className="marquee" ref={marqueeRef}>
            <span className="heading-1">Проекты</span>
            <span className="heading-1">Проекты</span>
            <span className="heading-1">Проекты</span>
            <span className="heading-1">Проекты</span>
            <span className="heading-1">Проекты</span>
            <span className="heading-1">Проекты</span>
          </div>
        </div>
      )}
      {isIntroCard && (
        <div className="scroll-hint" ref={scrollHintRef}>
          <span>Продолжайте листать</span>
          <svg
            className="scroll-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5V19M12 19L5 12M12 19L19 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
      <div className="card-wrapper">
        <div className="card-content">
          <div className="card-title">
            <h1 className="heading-1" ref={titleRef}>
              {title}
            </h1>
          </div>
          <div className="card-description" ref={descriptionRef}>
            <p className="paragraph">{description}</p>
            <MainButton
              text="Смотреть кейс"
              href={slug ? `/portfolio/${slug}` : "/portfolio"}
              transparent={true}
            />
          </div>
        </div>
        <div className="card-img" ref={imgWrapperRef}>
          <Image className="image" ref={imgRef} src={imageUrl} alt={alt} fill />
          <div className="image-gradient"></div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
