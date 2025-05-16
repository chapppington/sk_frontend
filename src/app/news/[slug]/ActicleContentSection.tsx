"use client";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CustomContainer from "@/components/ui/CustomContainer";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { GradientHeading } from "@/components/ui/GradientHeading/GradientHeading";
import TransitionLink from "@/components/ui/TransitionLink";

interface ArticleContentSectionProps {
  category: string;
  title: string;
  date: string;
  readTime: string;
  imageSrc: string;
  content: string[];
}

export default function ArticleContentSection({
  category,
  title,
  date,
  readTime,
  imageSrc,
  content,
}: ArticleContentSectionProps) {
  return (
    <article className="max-w-[1000px] mx-auto mt-2">
      <CustomContainer className="flex flex-col items-start">
        {/* Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Breadcrumbs
            items={[
              { href: "/", label: "Главная" },
              { href: "/news", label: "Новости" },
            ]}
            disableContainer={true}
            className="mb-12 w-full"
          />
        </motion.div>

        {/* Category Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <span className="px-4 py-2 border border-white text-white text-sm rounded font-light">
            {category}
          </span>
        </motion.div>

        {/* Article Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <GradientHeading className="leading-tight">{title}</GradientHeading>
        </motion.div>

        {/* Meta Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center space-x-4 text-white/60 text-sm mb-8"
        >
          <span>{date}</span>
          <span>•</span>
          <span>{readTime}</span>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative aspect-[16/9] mb-12 md:max-h-[600px] w-full"
        >
          <Image
            src={imageSrc}
            alt="Featured Image"
            fill
            className="object-cover rounded-lg"
            priority
          />
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          {content.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="text-white/90 text-lg leading-loose mb-6"
            >
              {paragraph}
            </motion.p>
          ))}

          {/* Return to News Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-12"
          >
            <TransitionLink
              href="/news"
              className="inline-flex items-center space-x-2 text-white hover:text-white/80 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transform rotate-[-45deg]"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-lg pl-4">Вернуться ко всем новостям</span>
            </TransitionLink>
          </motion.div>
        </motion.div>
      </CustomContainer>
    </article>
  );
}
