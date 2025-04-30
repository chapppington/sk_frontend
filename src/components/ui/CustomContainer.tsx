import { FC } from "react";

interface CustomContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  fullHeight?: boolean;
}

const CustomContainer: FC<CustomContainerProps> = ({
  children,
  className,
  style,
  fullHeight = false,
}) => {
  return (
    <div
      className={`container mx-auto px-8 md:px-10 lg:px-10 2xl:px-24 ${
        className || ""
      }`}
      style={
        fullHeight ? { minHeight: "calc(100vh - 180px)", ...style } : style
      }
    >
      {children}
    </div>
  );
};

export default CustomContainer;
