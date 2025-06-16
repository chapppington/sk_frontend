import { FC, Fragment } from "react";

import CustomContainer from "@/components/ui/CustomContainer";
import TransitionLink from "@/components/ui/TransitionLink";
import { IBreadcrumbsProps } from "@/components/ui/Breadcrumbs/types";

const Breadcrumbs: FC<IBreadcrumbsProps> = ({
  items,
  className,
  disableContainer,
}) => {
  const content = (
    <div className="flex items-center space-x-2 text-white/80">
      {items.map((item, index) => (
        <Fragment key={index}>
          <TransitionLink
            href={item.href}
            className={`${item.current ? "text-white" : "hover:text-white"}`}
          >
            {item.label}
          </TransitionLink>
          {index < items.length - 1 && (
            <span className="text-white/60"> → </span>
          )}
        </Fragment>
      ))}
    </div>
  );

  return (
    <div className={`pt-32 ${className || ""}`}>
      {disableContainer ? (
        content
      ) : (
        <CustomContainer>{content}</CustomContainer>
      )}
    </div>
  );
};

export default Breadcrumbs;
