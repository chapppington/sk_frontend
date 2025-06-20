"use client";

import { FC } from "react";
import YandexMapContainer from "@/components/ui/YandexMapContainer";
import { companyAddress, contactBlocks } from "../../mock_data";
import PhoneIcon from "@/shared/icons/PhoneIcon";
import EmailIcon from "@/shared/icons/EmailIcon";
import LocationIcon from "@/shared/icons/LocationIcon";

const FooterMain: FC = () => {
  return (
    <div className="md:border-t md:border-white/30 md:pt-12 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1 with 2 contact blocks */}
        <div className="space-y-8 md:flex md:flex-col md:justify-between">
          {contactBlocks.slice(0, 2).map((block, index) => (
            <div key={index}>
              <p className="text-white/80 mb-4">• {block.title}</p>
              {block.phone && (
                <div className="flex items-center mb-3">
                  <PhoneIcon className="w-4 h-4 text-white mr-2" />
                  <a href={`tel:${block.phoneRaw}`} className="text-white">
                    {block.phone}
                  </a>
                </div>
              )}
              <div className="flex items-center">
                <EmailIcon className="w-4 h-4 text-white mr-2" />
                <a href={`mailto:${block.email}`} className="text-white">
                  {block.email}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Column 2 with 2 contact blocks */}
        <div className="space-y-8 md:flex md:flex-col md:justify-between">
          {contactBlocks.slice(2, 4).map((block, index) => (
            <div key={index}>
              <p className="text-white/80 mb-4">• {block.title}</p>
              {block.phone && (
                <div className="flex items-center mb-3">
                  <PhoneIcon className="w-4 h-4 text-white mr-2" />
                  <a href={`tel:${block.phoneRaw}`} className="text-white">
                    {block.phone}
                  </a>
                </div>
              )}
              <div className="flex items-center">
                <EmailIcon className="w-4 h-4 text-white mr-2" />
                <a href={`mailto:${block.email}`} className="text-white">
                  {block.email}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Column 3 with map */}
        <div>
          <p className="text-white/80 mb-4">• Адрес</p>
          <div className="flex items-center mb-3">
            <LocationIcon className="w-4 h-4 text-white mr-2" />
            <span className="text-white">{companyAddress}</span>
          </div>
          <YandexMapContainer />
        </div>
      </div>
    </div>
  );
};

export default FooterMain;
