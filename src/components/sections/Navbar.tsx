"use client";

import { FC, useState, useRef, useEffect } from "react";
import Image from "next/image";
import MainButton from "@/components/ui/MainButton";
import CustomContainer from "../ui/CustomContainer";
import { useTransitionRouter } from "next-view-transitions";
import TransitionLink from "../ui/TransitionLink";
import gsap from "gsap";

const menuItems = [
  { href: "/catalog", label: "Каталог" },
  { href: "/production", label: "О производстве" },
  { href: "/news", label: "Новости" },
  { href: "/contacts", label: "Контакты" },
];

const contactSections = [
  {
    title: "Отдел продаж",
    phone: "8 (880) 990-00-00",
    email: "test@mail.ru",
  },
  {
    title: "Конструкторский отдел",
    phone: "8 (880) 990-00-00",
    email: "test@mail.ru",
  },
];

const MobileMenu: FC<{
  isOpen: boolean;
  onClose: () => void;
  router: any;
}> = ({ isOpen, onClose, router }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement[]>([]);
  const contactSectionsRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Reset menu position when component mounts
  useEffect(() => {
    console.log("MobileMenu mounted, isOpen:", isOpen);
    if (menuRef.current) {
      gsap.set(menuRef.current, { x: "100%" });
    }
  }, []);

  // Handle opening animation
  useEffect(() => {
    console.log("isOpen changed:", isOpen);
    if (!isOpen) return;

    const ctx = gsap.context(() => {
      // Overlay fade in
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      // Menu slide in
      gsap.to(menuRef.current, {
        x: 0,
        backgroundColor: "rgba(0, 0, 0, 1)",
        duration: 0.4,
        ease: "power2.out",
      });

      // Menu items fade in
      gsap.to(menuItemsRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.2,
      });

      // Contact sections fade in
      gsap.to(contactSectionsRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.3,
        ease: "power2.out",
        delay: 0.3,
      });

      // Close button animation
      gsap.fromTo(
        closeButtonRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "back.out(1.7)",
          delay: 0.4,
        }
      );
    });

    return () => ctx.revert();
  }, [isOpen]);

  const handleClose = () => {
    console.log("handleClose called - closing menu");

    const ctx = gsap.context(() => {
      // Overlay fade out
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });

      // Close button animation
      gsap.to(closeButtonRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      });

      // Menu slide out with background fade
      gsap.to(menuRef.current, {
        x: "100%",
        backgroundColor: "rgba(0, 0, 0, 0)",
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          onClose();
        },
      });
    });

    return () => ctx.revert();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000]">
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/50 opacity-0"
        onClick={handleClose}
      />
      <div
        ref={menuRef}
        className="fixed top-0 right-0 w-full h-screen bg-transparent overflow-y-auto"
      >
        {/* Фиксированная шапка без кнопки закрытия */}
        <div className="sticky top-0 left-0 right-0 h-[72px] bg-black z-[1001] border-b border-white/20">
          <CustomContainer className="h-full flex justify-start items-center">
            <Image
              src="/logo.svg"
              alt="СИБКОМПЛЕКТ"
              width={175}
              height={32}
              className="h-8"
              priority
            />
          </CustomContainer>
        </div>

        <CustomContainer className="pt-6 pb-6">
          <div className="flex flex-col">
            {menuItems.map((item, index) => (
              <div
                key={item.href}
                ref={(el) => {
                  if (el) menuItemsRef.current[index] = el;
                }}
                className="border-b border-white/30 opacity-0 translate-x-[50px]"
              >
                <TransitionLink
                  href={item.href}
                  className="text-white/80 text-lg leading-none flex items-center justify-between py-6 font-light"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClose();
                  }}
                >
                  {item.label}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white/80"
                  >
                    <path
                      d="M9 18l6-6-6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </TransitionLink>
              </div>
            ))}

            <div
              ref={contactSectionsRef}
              className="mt-12 space-y-8 opacity-0 translate-x-[50px]"
            >
              {contactSections.map((section, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="text-white/60 text-sm">• {section.title}</h3>
                  <div className="space-y-2">
                    <a
                      href={`tel:${section.phone.replace(/\D/g, "")}`}
                      className="text-white flex items-center gap-2"
                    >
                      <span className="w-6 h-6  flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      {section.phone}
                    </a>
                    <a
                      href={`mailto:${section.email}`}
                      className="text-white flex items-center gap-2"
                    >
                      <span className="w-6 h-6  flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22 6l-10 7L2 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      {section.email}
                    </a>
                  </div>
                </div>
              ))}

              <div className="space-y-4">
                <h3 className="text-white/60 text-sm">• Адрес</h3>
                <div className="flex items-center gap-2 text-white">
                  <span className="w-6 h-6  flex items-center justify-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="10"
                        r="3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  ул. Арбат, 26, Москва
                </div>
              </div>

              <MainButton text="Отправить заявку" />
            </div>

            <div className="mt-auto pt-12 space-y-4">
              <p className="text-white/50 text-sm">
                © 2024г. Все права защищены.
              </p>
              <div className="space-y-2">
                <TransitionLink
                  href="/privacy"
                  className="text-white/50 text-sm hover:text-white block"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClose();
                  }}
                >
                  Политика конфиденциальности
                </TransitionLink>
                <TransitionLink
                  href="/terms"
                  className="text-white/50 text-sm hover:text-white block"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClose();
                  }}
                >
                  Условия обработки персональных данных
                </TransitionLink>
              </div>
            </div>
          </div>
        </CustomContainer>
      </div>
    </div>
  );
};

const Navbar: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useTransitionRouter();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const handleMenuButtonClick = () => {
    console.log("Menu button clicked, current state:", isMobileMenuOpen);
    if (isMobileMenuOpen) {
      console.log("Menu is open, closing it");
      setIsMobileMenuOpen(false);
    } else {
      console.log("Menu is closed, opening it");
      setIsMobileMenuOpen(true);
    }
  };

  const handleCloseMenu = () => {
    console.log("handleCloseMenu called");
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/30 pointer-events-none"
      style={{ backdropFilter: "blur(20px)" }}
    >
      <CustomContainer className="flex justify-between items-center h-[72px] 2xl:divide-x divide-white/30 pointer-events-auto">
        {/* Logo */}
        <TransitionLink href="/" className="px-0 flex items-center select-none">
          <Image
            src="/logo.svg"
            alt="СИБКОМПЛЕКТ"
            width={175}
            height={32}
            className="h-8"
            priority
          />
        </TransitionLink>

        {/* Menu Items */}
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

        {/* Contact Info and Offer Button */}
        <div className="hidden 2xl:flex items-center h-full divide-x divide-white/30">
          <div className="flex items-center h-full divide-x divide-white/30">
            <a
              href="tel:+78006003989"
              className="text-white text-sm px-8 flex items-center h-full select-none relative overflow-hidden group"
            >
              <span className="relative z-10 group-hover:text-gray-900 transition-colors">
                +7 (800) 600-39-89
              </span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-[350ms]"></span>
            </a>
            <a
              href="mailto:info@sibkomplekt.ru"
              className="text-white text-sm px-8 flex items-center h-full select-none relative overflow-hidden group"
            >
              <span className="relative z-10 group-hover:text-gray-900 transition-colors">
                info@sibkomplekt.ru
              </span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-[350ms]"></span>
            </a>
          </div>
          <button className="h-full px-8 bg-white text-gray-900 text-sm hover:bg-gray-50 transition-all duration-300 select-none relative overflow-hidden group">
            <span className="relative z-10">Оставить заявку</span>
            <span className="absolute inset-0 bg-gray-200 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          ref={menuButtonRef}
          className="2xl:hidden px-0 z-[1003] relative w-6 h-6"
          onClick={handleMenuButtonClick}
        >
          <div
            className={`absolute inset-0 transition-all duration-300 ${
              isMobileMenuOpen ? "rotate-45" : ""
            }`}
          >
            <span
              className={`absolute left-0 w-6 h-0.5 bg-white transition-all duration-300 rounded-full ${
                isMobileMenuOpen ? "top-3" : "top-1"
              }`}
            ></span>
            <span
              className={`absolute left-0 w-6 h-0.5 bg-white transition-all duration-300 rounded-full ${
                isMobileMenuOpen ? "opacity-0" : "opacity-100"
              } top-3`}
            ></span>
            <span
              className={`absolute left-0 w-6 h-0.5 bg-white transition-all duration-300 rounded-full ${
                isMobileMenuOpen ? "top-3 -rotate-90" : "top-5"
              }`}
            ></span>
          </div>
        </button>
      </CustomContainer>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={handleCloseMenu}
        router={router}
      />
    </nav>
  );
};

export default Navbar;
