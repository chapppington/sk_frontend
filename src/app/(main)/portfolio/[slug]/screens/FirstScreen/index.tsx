"use client";

import { Suspense } from "react";
import { IPortfolioItem } from "../../types";
import CustomContainer from "@/components/ui/CustomContainer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import GradientHeading from "@/components/ui/GradientHeading";
import MediaPreview from "@/app/(main)/portfolio/[slug]/screens/FirstScreen/components/VideoWrapper";
import VideoOverlay from "@/app/(main)/portfolio/[slug]/screens/FirstScreen/components/VideoOverlay";
import { BACKEND_MAIN } from "@/constants";

interface FirstScreenProps {
  portfolio: IPortfolioItem;
}

const FirstScreen = ({ portfolio }: FirstScreenProps) => {
  return (
    <section className="pb-12">
      <CustomContainer>
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Кейс", href: "#", current: true },
          ]}
          className="mb-8"
          disableContainer
        />

        {/* Headings and Description */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-10 my-12">
          <div>
            <GradientHeading className="mb-2 2xl:text-5xl">
              {portfolio.name}
            </GradientHeading>
          </div>
          <div>
            <div className="max-w-xl text-white/60 text-lg md:text-base">
              {portfolio.taskDescription}
            </div>
          </div>
        </div>

        {/* Image/Video Preview */}
        <div className="relative w-full aspect-[2.8/1] rounded-2xl overflow-hidden shadow-lg">
          <Suspense
            fallback={
              <div className="w-full h-full bg-black/20 rounded-2xl animate-pulse" />
            }
          >
            <MediaPreview
              src={
                portfolio.previewVideoPath
                  ? `${BACKEND_MAIN}/uploads/portfolio/${portfolio.previewVideoPath}`
                  : "null"
              }
              poster={`${BACKEND_MAIN}/uploads/portfolio/${portfolio.poster}`}
              onlyShowPoster={true}
            />
            <VideoOverlay
              videoSrc={
                portfolio.previewVideoPath
                  ? `${BACKEND_MAIN}/uploads/portfolio/${portfolio.previewVideoPath}`
                  : "null"
              }
              fullVideoSrc={
                portfolio.fullVideoPath
                  ? `${BACKEND_MAIN}/uploads/portfolio/${portfolio.fullVideoPath}`
                  : null
              }
              posterSrc={`${BACKEND_MAIN}/uploads/portfolio/${portfolio.poster}`}
            />
          </Suspense>
        </div>
      </CustomContainer>
    </section>
  );
};

export default FirstScreen;
