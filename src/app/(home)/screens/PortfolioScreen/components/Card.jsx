import React, { useEffect } from "react";
import { useCardAnimation } from "../hooks/useCardAnimation";
import { setupMarqueeAnimation } from "../marquee";

function Card({
  title,
  description,
  imageUrl,
  alt,
  hasMarquee,
  isIntroCard,
  isLastCard,
  totalCards,
}) {
  const {
    cardRef,
    titleRef,
    descriptionRef,
    imgWrapperRef,
    imgRef,
    marqueeRef,
  } = useCardAnimation(isIntroCard, isLastCard, totalCards);

  useEffect(() => {
    if (hasMarquee) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        setupMarqueeAnimation();
      }, 100);
    }
  }, [hasMarquee]);

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
          <img className="image" ref={imgRef} src={imageUrl} alt={alt} />
        </div>
      </div>
    </div>
  );
}

export default Card;
