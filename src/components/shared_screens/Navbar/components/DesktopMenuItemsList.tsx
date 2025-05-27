import { FC } from "react";
import TransitionLink from "@/components/ui/TransitionLink";
import { menuItems } from "../constants";

const DesktopMenu: FC = () => (
  <div className="hidden 2xl:flex items-center space-x-12 px-12 h-full">
    {menuItems.map((item) => (
      <TransitionLink
        key={item.href}
        href={item.href}
        className="text-white text-sm hover:text-white/80 transition-colors relative select-none group"
      >
        {item.label}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
      </TransitionLink>
    ))}
  </div>
);

export default DesktopMenu;
