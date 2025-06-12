import { SliderContentProps } from "./types";

export const SliderContent = ({
  children,
  sliderId,
}: SliderContentProps) => {
  return (
    <div className={`swiper custom-swiper-${sliderId}`}>
      <div className="swiper-wrapper">
        {children.map((child, index) => (
          <div key={index} className="swiper-slide">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};
