import { FC } from "react";
import TransitionLink from "@/components/ui/TransitionLink";
import CircleIconButton from "@/components/ui/CircleIconButton";
import { ServiceCardProps } from "./types";

const ServiceCard: FC<ServiceCardProps> = ({
  title,
  description,
  category,
}) => {
  return (
    <div className="flex flex-col group">
      <TransitionLink href={`/service/${category}`} className="block">
        <div className="space-y-4">
          <h3 className="text-white text-lg transition-colors duration-300 group-hover:text-white/80">
            {title}
          </h3>
          <p className="text-white/80 transition-colors duration-300 group-hover:text-white/80">
            {description}
          </p>
          <CircleIconButton text="Подробнее" />
        </div>
      </TransitionLink>
    </div>
  );
};

export default ServiceCard;
