import { FC } from "react";
import { CONTACT_INFO } from "./mock_data.ts";

const ContactInfo: FC = () => (
  <div className="flex items-center h-full divide-x divide-white/30">
    <a
      href={`tel:${CONTACT_INFO.phone.number}`}
      className="text-white text-sm px-8 flex items-center h-full select-none relative overflow-hidden group"
    >
      <span className="relative z-10 group-hover:text-gray-900 transition-colors">
        {CONTACT_INFO.phone.display}
      </span>
      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-[350ms]"></span>
    </a>
    <a
      href={`mailto:${CONTACT_INFO.email.address}`}
      className="text-white text-sm px-8 flex items-center h-full select-none relative overflow-hidden group"
    >
      <span className="relative z-10 group-hover:text-gray-900 transition-colors">
        {CONTACT_INFO.email.display}
      </span>
      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-[350ms]"></span>
    </a>
  </div>
);

export default ContactInfo;
