"use client";

import Image from "next/image";
import { PagesConfig } from "@/config/pages.config";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CustomContainer from "@/components/ui/CustomContainer";
import GradientHeading from "@/components/ui/GradientHeading";
import AnimatedText from "@/components/ui/AnimatedText";
import RevealAnimation from "@/components/ui/RevealAnimation";
import CircleIconButton from "@/components/ui/CircleIconButton";

import { IArticleContentSectionProps } from "./types";

export default function ArticleContentSection({
  category,
  title,
  date,
  readTime,
  imageSrc,
  content,
}: IArticleContentSectionProps) {
  return (
    <article className="max-w-[1000px] mx-auto mt-2">
      <CustomContainer className="flex flex-col items-start">
        {/* Breadcrumbs */}
        <div>
          <Breadcrumbs
            items={[
              { href: "/", label: "Главная" },
              { href: "/news", label: "Новости" },
            ]}
            disableContainer={true}
            className="mb-12 w-full"
          />
        </div>

        {/* Category Tag */}
        <div className="mb-6 px-4 py-2 border border-white text-white text-sm rounded font-light">
          <AnimatedText>
            <span>{category}</span>
          </AnimatedText>
        </div>

        {/* Article Title */}
        <div>
          <AnimatedText>
            <GradientHeading className="leading-tight mb-6">
              {title}
            </GradientHeading>
          </AnimatedText>
        </div>

        {/* Meta Information */}
        <div className="flex items-center space-x-4 text-white/60 text-sm mb-8">
          <AnimatedText delay={0.6}>
            <span>{date}</span>
          </AnimatedText>
          <AnimatedText delay={0.6}>
            <span>•</span>
          </AnimatedText>
          <AnimatedText delay={0.6}>
            <span>{readTime}</span>
          </AnimatedText>
        </div>

        {/* Featured Image */}
        <RevealAnimation
          className="relative aspect-[16/9] mb-12 md:max-h-[600px] w-full"
          useScrollTrigger={false}
        >
          <Image
            src={imageSrc}
            alt="Featured Image"
            fill
            className="object-cover rounded-lg"
            priority
          />
        </RevealAnimation>

        {/* Article Content */}
        <div className="max-w-6xl mx-auto">
          {content.map((paragraph, index) => (
            <p key={index} className="text-white/90 text-lg leading-loose mb-6">
              {paragraph}
            </p>
          ))}

          {/* Return to News Button */}
          <div className="mt-12">
            <CircleIconButton
              href={PagesConfig.news}
              text="Вернуться ко всем новостям"
            />
          </div>
        </div>
      </CustomContainer>
    </article>
  );
}
