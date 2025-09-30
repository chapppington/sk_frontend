import { FC } from "react";
import TransitionLink from "@/components/ui/TransitionLink";
import CircleIconButton from "@/components/ui/CircleIconButton";
import { ServiceCardProps } from "./types";

const ServiceCard: FC<ServiceCardProps> = ({
  title,
  description,
  category,
  link,
  openInNewTab = false,
  isExternal = false,
}) => {
  const linkProps = openInNewTab
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <div className="flex flex-col group">
      {isExternal ? (
        <a href={link} className="block" {...linkProps}>
          <div className="space-y-4">
            <h2 className="text-white text-lg transition-colors duration-300 group-hover:text-white/80">
              {title}
            </h2>
            <p className="text-white/80 transition-colors duration-300 group-hover:text-white/80">
              {description}
            </p>
            <CircleIconButton text="Подробнее" />
          </div>
        </a>
      ) : (
        <TransitionLink href={link} className="block" {...linkProps}>
          <div className="space-y-4">
            <h2 className="text-white text-lg transition-colors duration-300 group-hover:text-white/80">
              {title}
            </h2>
            <p className="text-white/80 transition-colors duration-300 group-hover:text-white/80">
              {description}
            </p>
            <CircleIconButton text="Подробнее" />
          </div>
        </TransitionLink>
      )}
    </div>
  );
};

export default ServiceCard;
