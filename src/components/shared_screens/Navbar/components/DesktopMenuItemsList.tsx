import { FC } from "react";
import Link from "next/link";
import { menuItems } from "../mock_data";

const DesktopMenu: FC = () => (
  <div className="hidden 2xl:flex items-center space-x-12 px-12 h-full">
    {menuItems.map((item) => (
      <Link
        key={item.href}
        href={item.href}
        className="text-white text-sm hover:text-white/80 transition-colors relative select-none group"
      >
        {item.label}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
      </Link>
    ))}
  </div>
);

export default DesktopMenu;
