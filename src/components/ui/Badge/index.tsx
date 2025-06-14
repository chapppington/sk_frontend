import { FC } from "react";
import styles from "./styles.module.css";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "transparent";
  className?: string;
}

const Badge: FC<BadgeProps> = ({
  children,
  variant = "default",
  className = "",
}) => {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
