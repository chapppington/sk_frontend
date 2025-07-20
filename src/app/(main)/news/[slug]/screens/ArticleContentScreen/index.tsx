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
    events: "События",
    interview: "Интервью",
    developments: "Разработки",
    useful: "Полезное",
    projects: "Наши проекты",
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
              alt={news.alt || news.title}
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
              href={PagesConfig.news.href}
              text="Вернуться ко всем новостям"
            />
          </div>
        </div>
      </CustomContainer>
    </article>
  );
}

export function ArticleContentSectionSkeleton() {
  return (
    <article className="max-w-[1000px] mx-auto mt-28">
      <CustomContainer className="flex flex-col items-start">
        {/* Breadcrumbs Skeleton */}
        <div className="mb-12 w-48 h-6 bg-white/10 rounded animate-pulse" />

        {/* Category Tag Skeleton */}
        <div className="mb-6 px-8 py-3 bg-white/10 rounded w-32 h-8 animate-pulse" />

        {/* Article Title Skeleton */}
        <div className="mb-6 w-3/4 h-10 bg-white/20 rounded animate-pulse" />

        {/* Meta Information Skeleton */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-24 h-5 bg-white/10 rounded animate-pulse" />
          <div className="w-4 h-4 bg-white/10 rounded-full animate-pulse" />
          <div className="w-16 h-5 bg-white/10 rounded animate-pulse" />
        </div>

        {/* Featured Image Skeleton */}
        <div className="relative aspect-[16/9] mb-12 w-full bg-white/10 rounded-lg animate-pulse" />

        {/* Article Content Skeleton */}
        <div className="max-w-6xl mx-auto w-full">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-full h-6 bg-white/10 rounded mb-6 animate-pulse"
            />
          ))}
          {/* Return to News Button Skeleton */}
          <div className="mt-12 w-56 h-12 bg-white/10 rounded-full animate-pulse" />
        </div>
      </CustomContainer>
    </article>
  );
}
