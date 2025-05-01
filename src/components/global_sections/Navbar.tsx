"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import MainButton from "@/components/ui/MainButton";
import CustomContainer from "../ui/CustomContainer";

const menuItems = [
  { href: "/catalog", label: "Каталог" },
  { href: "/about", label: "О компании" },
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

const MobileMenu: FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[100]"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 w-full h-screen bg-black z-[10100] overflow-y-auto"
          >
            <CustomContainer className="pt-20 pb-6">
              <CustomContainer className="fixed top-0 left-0 right-0 flex justify-between items-center h-[72px] bg-black">
                <img src="/logo.svg" alt="СИБКОМПЛЕКТ" className="h-8" />
                <motion.button onClick={onClose} whileTap={{ scale: 0.95 }}>
                  <img src="/close.svg" alt="Close menu" className="w-6 h-6" />
                </motion.button>
              </CustomContainer>

              <motion.div
                className="flex flex-col"
                initial="closed"
                animate="open"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                  },
                  closed: {
                    transition: { staggerChildren: 0.05, staggerDirection: -1 },
                  },
                }}
              >
                {menuItems.map((item) => (
                  <motion.div
                    key={item.href}
                    variants={{
                      open: { x: 0, opacity: 1 },
                      closed: { x: 50, opacity: 0 },
                    }}
                    className="border-b border-white/30"
                  >
                    <Link
                      href={item.href}
                      className="text-white/80 text-lg leading-none flex items-center justify-between py-6 font-light"
                      onClick={onClose}
                    >
                      {item.label}
                      <img src="/arrow-right.svg" alt="" className="w-6 h-8" />
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  variants={{
                    open: { x: 0, opacity: 1 },
                    closed: { x: 50, opacity: 0 },
                  }}
                  className="mt-12 space-y-8"
                >
                  {contactSections.map((section, index) => (
                    <div key={index} className="space-y-4">
                      <h3 className="text-white/60 text-sm">• {section.title}</h3>
                      <div className="space-y-2">
                        <a
                          href={`tel:${section.phone.replace(/\D/g, "")}`}
                          className="text-white flex items-center gap-2"
                        >
                          <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
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
                          <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
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
                      <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
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
                </motion.div>

                <div className="mt-auto pt-12 space-y-4">
                  <p className="text-white/50 text-sm">
                    © 2024г. Все права защищены.
                  </p>
                  <div className="space-y-2">
                    <Link
                      href="/privacy"
                      className="text-white/50 text-sm hover:text-white block"
                    >
                      Политика конфиденциальности
                    </Link>
                    <Link
                      href="/terms"
                      className="text-white/50 text-sm hover:text-white block"
                    >
                      Условия обработки персональных данных
                    </Link>
                  </div>
                </div>
              </motion.div>
            </CustomContainer>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Navbar: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/30"
      style={{ backdropFilter: "blur(20px)" }}
    >
      <CustomContainer className="flex justify-between items-center h-[72px] 2xl:divide-x divide-white/30">
        {/* Logo */}
        <Link href="/" className="px-0 flex items-center select-none">
          <img src="/logo.svg" alt="СИБКОМПЛЕКТ" className="h-8" />
        </Link>

        {/* Menu Items */}
        <div className="hidden 2xl:flex items-center space-x-12 px-12 h-full">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white text-sm hover:text-white/80 select-none"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Contact Info and Offer Button */}
        <div className="hidden 2xl:flex items-center h-full divide-x divide-white/30">
          <div className="flex items-center h-full divide-x divide-white/30">
            <a
              href="tel:+78006003989"
              className="text-white text-sm px-8 flex items-center h-full select-none"
            >
              +7 (800) 600-39-89
            </a>
            <a
              href="mailto:info@sibkomplekt.ru"
              className="text-white text-sm px-8 flex items-center h-full select-none"
            >
              info@sibkomplekt.ru
            </a>
          </div>
          <button className="h-full px-8 bg-white text-gray-900 text-sm hover:bg-gray-50 transition-colors select-none">
            Кнопка на оффер
          </button>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="2xl:hidden px-0"
          onClick={() => setIsMobileMenuOpen(true)}
          whileTap={{ scale: 0.95 }}
        >
          <img src="/menu.svg" alt="Menu" className="w-6 h-6" />
        </motion.button>
      </CustomContainer>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
