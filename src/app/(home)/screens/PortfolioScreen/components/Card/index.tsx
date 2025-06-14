import { FC } from "react";
import Image from "next/image";
import { useCardAnimation } from "../../hooks/useCardAnimation";
import { CardProps } from "./types";

const PortfolioCard: FC<CardProps> = ({
  title,
  description,
  imageUrl,
  alt,
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
  } = useCardAnimation(isIntroCard, isLastCard, totalCards);

  return (
    <div className="card" ref={cardRef}>
      {hasMarquee && (
        <div className="card-marquee">
          <div className="marquee" ref={marqueeRef}>
            <h1 className="heading-1">Кейсы</h1>
            <h1 className="heading-1">Кейсы</h1>
            <h1 className="heading-1">Кейсы</h1>
          </div>
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
