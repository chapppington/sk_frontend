"use client";

import { FC, useState } from "react";
import { useNavbarConfigPublic } from "@/hooks/useNavbarConfigPublic";
import { Modal } from "@/components/ui/Modal";
import ContactForm from "@/components/ContactForm";

const CTAButton: FC = () => {
  const [open, setOpen] = useState(false);
  const { config } = useNavbarConfigPublic();
  const text = config?.navbarCtaButtonText || "Оставить заявку";
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="h-full px-8 bg-white text-gray-900 text-sm hover:bg-gray-50 transition-all duration-300 select-none relative overflow-hidden group"
      >
        <span className="relative z-10">{text}</span>
        <span className="absolute inset-0 bg-gray-200 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
      </button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        overlayClassName="bg-black/70"
        contentClassName="bg-blue-950 border border-white/20 "
      >
        <div className="text-white">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold">Оставить заявку</h3>
            <p className="text-white/70 mt-1">
              Заполните форму, и мы свяжемся с вами в ближайшее время.
            </p>
          </div>
          <ContactForm variant="request" />
        </div>
      </Modal>
    </>
  );
};

export default CTAButton;
