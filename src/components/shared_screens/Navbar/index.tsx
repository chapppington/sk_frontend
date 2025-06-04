"use client";

import { PagesConfig } from "@/config/pages.config";

import { FC, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import CustomContainer from "@/components/ui/CustomContainer";
import ContactInfo from "./components/ContactInfo";
import DesktopMenuItemsList from "./components/DesktopMenuItemsList";
import MobileMenu from "./components/MobileMenu";
import MobileMenuButton from "./components/MobileMenuButton";
import CTAButton from "./components/CTAButton";

const Navbar: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  console.log("Navbar render. isMobileMenuOpen:", isMobileMenuOpen);

  const handleMenuButtonClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCloseMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, [setIsMobileMenuOpen]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/30 pointer-events-none"
      style={{ backdropFilter: "blur(20px)" }}
    >
      <CustomContainer className="flex justify-between items-center h-[72px] 2xl:divide-x divide-white/30 pointer-events-auto">
        <Link
          href={PagesConfig.home}
          className="px-0 flex items-center select-none"
        >
          <Image
            src="/logo.svg"
            alt="СИБКОМПЛЕКТ"
            width={175}
            height={32}
            className="h-8"
            priority
          />
        </Link>

        <DesktopMenuItemsList />

        <div className="hidden 2xl:flex items-center h-full divide-x divide-white/30">
          <ContactInfo />
          <CTAButton />
        </div>

        <MobileMenuButton
          isOpen={isMobileMenuOpen}
          onClick={handleMenuButtonClick}
        />
      </CustomContainer>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={handleCloseMenu} />
    </nav>
  );
};

export default Navbar;
