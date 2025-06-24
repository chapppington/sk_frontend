"use client";

import Image from "next/image";
import { PagesConfig } from "@/config/pages.config";
import { UPLOADS_URL } from "@/constants";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CustomContainer from "@/components/ui/CustomContainer";
import GradientHeading from "@/components/ui/GradientHeading";
import CircleIconButton from "@/components/ui/CircleIconButton";

import { IArticleContentSectionProps } from "./types";

export default function ArticleContentSection({
  news,
}: IArticleContentSectionProps) {
  // Добавляем маппер категорий
  const categoryMap: Record<string, string> = {
    all: "Все",
    production: "Производство",
    technology: "Технологии",
    event: "События",
    interview: "Интервью",
  };

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
          <span>{categoryMap[news.category] || news.category}</span>
        </div>

        {/* Article Title */}
        <div>
          <GradientHeading className="leading-tight mb-6">
            {news.title}
          </GradientHeading>
        </div>

        {/* Meta Information */}
        <div className="flex items-center space-x-4 text-white/60 text-sm mb-8">
          <span>
            {new Date(news.createdAt).toLocaleDateString("ru-RU", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span>•</span>
          <span>{news.readingTime} мин</span>
        </div>

        {/* Featured Image */}
        {news.imageUrl && (
          <div className="relative aspect-[16/9] mb-12 md:max-h-[600px] w-full">
            <Image
              src={`${UPLOADS_URL}${news.imageUrl}`}
              alt="Featured Image"
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        )}

        {/* Article Content */}
        <div className="max-w-6xl mx-auto">
          {news.content.split("\n").map((paragraph: string, index: number) => (
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
