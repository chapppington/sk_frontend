import Image from "next/image";
import AnimatedText from "@/components/ui/AnimatedText";
import RevealAnimation from "@/components/ui/RevealAnimation";
import { RefObject } from "react";

interface ReviewItemProps {
  review: {
    quote: string;
    name: string;
    role: string;
    image: string;
  };
  animationKey: number;
  ref: RefObject<HTMLDivElement | null>;
}

const ReviewItem = ({ review, animationKey, ref }: ReviewItemProps) => {
  return (
    <div ref={ref} className="w-full">
      {/* Testimonial Text */}
      <AnimatedText
        key={`quote-${animationKey}`}
        delay={0.1}
        animateOnScroll={false}
      >
        <blockquote className="text-lg md:text-xl text-gray-300 font-light mb-8 first-line:pl-8 min-h-[120px]">
          {review.quote}
        </blockquote>
      </AnimatedText>
      {/* User Info */}
      <div className="flex items-center gap-4 mt-6">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <RevealAnimation
            key={`image-${animationKey}`}
            duration={0.8}
            useScrollTrigger={false}
          >
            <div className="w-full h-full">
              <Image
                src={review.image}
                alt="avatar"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
          </RevealAnimation>
        </div>
        <div>
          <AnimatedText
            key={`name-${animationKey}`}
            delay={0.2}
            animateOnScroll={false}
          >
            <div className="text-white font-semibold text-lg">
              {review.name}
            </div>
          </AnimatedText>
          <AnimatedText
            key={`role-${animationKey}`}
            delay={0.3}
            animateOnScroll={false}
          >
            <div className="text-gray-400 text-sm">{review.role}</div>
          </AnimatedText>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
