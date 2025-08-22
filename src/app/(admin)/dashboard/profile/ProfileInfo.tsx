"use client";
import { MiniLoader } from "@/components/ui/MiniLoader";
import { useProfile } from "@/hooks/useProfile";
import Image from "next/image";
import Link from "next/link";
import {
  FileText,
  Newspaper,
  Briefcase,
  Package,
  Users,
  Globe,
  ArrowRight,
  User,
  Mail,
  Shield,
  Home,
  Building,
  Factory,
  Phone,
  Award,
  Bot,
  Map,
  Layers,
} from "lucide-react";
import { FontSettings } from "./FontSettings";

export function ProfileInfo() {
  const { isLoading, user } = useProfile();

  if (isLoading)
    return (
      <div className="mt-10">
        <MiniLoader width={150} height={150} />
      </div>
    );

  const navigationSections = [
    {
      title: "SEO настройки",
      description:
        "Настройка мета-тегов, robots.txt, sitemap.xml и SEO-параметров сайта",
      icon: Globe,
      href: "/dashboard/seo-settings",
      color:
        "bg-blue-500/10 text-blue-600 border-blue-200 dark:bg-blue-900/40 dark:text-blue-100 dark:border-blue-700 dark:border-transparent",
      subItems: [
        {
          name: "Мета-теги страниц",
          href: "/dashboard/seo-settings",
          icon: FileText,
        },
        { name: "Robots.txt", href: "/dashboard/robots", icon: Bot },
        { name: "Sitemap.xml", href: "/dashboard/sitemap", icon: Map },
      ],
    },
    {
      title: "Динамический контент",
      description:
        "Управление новостями, товарами, вакансиями и проектами портфолио",
      icon: Layers,
      href: "/dashboard/news",
      color:
        "bg-green-500/10 text-green-600 border-green-200 dark:bg-green-900/40 dark:text-green-100 dark:border-green-700 dark:border-transparent",
      subItems: [
        { name: "Новости", href: "/dashboard/news", icon: Newspaper },
        { name: "Товары", href: "/dashboard/products", icon: Package },
        { name: "Вакансии", href: "/dashboard/vacancy", icon: Users },
        { name: "Портфолио", href: "/dashboard/portfolio", icon: Briefcase },
      ],
    },
    {
      title: "Статичный контент",
      description: "Редактирование основных страниц сайта",
      icon: FileText,
      href: "/dashboard/static",
      color:
        "bg-purple-500/10 text-purple-600 border-purple-200 dark:bg-purple-900/40 dark:text-purple-100 dark:border-purple-700 dark:border-transparent",
      subItems: [
        { name: "Главная", href: "/dashboard/static/home", icon: Home },
        { name: "О компании", href: "/dashboard/static/about", icon: Building },
        {
          name: "Производство",
          href: "/dashboard/static/production",
          icon: Factory,
        },
        {
          name: "Вакансии",
          href: "/dashboard/static/vacancies",
          icon: Users,
        },
        { name: "Контакты", href: "/dashboard/static/contacts", icon: Phone },
        {
          name: "Сертификаты",
          href: "/dashboard/static/certificates",
          icon: Award,
        }
      ],
    },
  ];

  return (
    <div className="mt-10">
      <div className="flex flex-col md:flex-row gap-6 items-stretch h-40 mb-8">
        {/* Левая колонка: профиль */}
        <div className="flex-1 min-w-0">
          <div className="p-6 h-full border rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex flex-col justify-center gap-3 dark:border-transparent overflow-hidden">
            {user.avatarPath ? (
              <div className="w-[35px] h-[35px] rounded-full overflow-hidden border-2 border-white dark:border-slate-700 shadow relative">
                <Image
                  src={user.avatarPath}
                  alt="Avatar"
                  fill
                  className="object-cover"
                  sizes="35px"
                />
              </div>
            ) : (
              <div className="w-[35px] h-[35px] rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                <User className="w-5 h-5" />
              </div>
            )}
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                Администратор
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                <Mail className="w-3 h-3" />
                <span>{user.email}</span>
              </div>
              {user.rights && user.rights.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {user.rights.map((right, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-blue-100 dark:bg-blue-400/20 text-blue-800 dark:text-blue-100 text-[10px] rounded-full font-medium"
                    >
                      {right}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Правая колонка: настройки шрифта */}
        <div className="flex flex-row gap-6 h-full">
          <div className="h-full">
            <FontSettings />
          </div>
          <div className="hidden md:block h-full p-4 border rounded-lg bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 min-w-[260px] max-w-[480px] flex flex-col justify-center">
            <div className="font-semibold text-sm mb-2">Как поменять шрифт</div>
            <ol className="list-decimal list-inside space-y-1">
              <li>
                Откройте{" "}
                <a
                  href="https://fonts.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Google Fonts
                </a>
              </li>
              <li>Выберите понравившийся шрифт, скопируйте его название</li>
              <li>
                Нажмите на выпадающий список, вставьте название шрифта в поле
                поиска
              </li>
              <li>Кликните по нужному шрифту — он применится автоматически</li>
            </ol>
          </div>
        </div>
      </div>
      {/* Masonry layout for sections */}
      <div
        className="masonry-grid w-full mt-8"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: 24,
          alignItems: "start",
        }}
      >
        {navigationSections.map((section) => (
          <div
            key={section.title}
            className={`p-6 border rounded-lg ${section.color} hover:shadow-lg transition-all duration-200`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-3 rounded-lg ${section.color
                  .replace("bg-", "bg-")
                  .replace("/10", "/20")
                  .replace("text-", "")
                  .replace("border-", "")}
dark:bg-opacity-60`}
              >
                <section.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold mb-2 text-slate-800 dark:text-white">
                  {section.title}
                </h4>
                <p className="text-sm mb-4 opacity-80 text-slate-800 dark:text-white">
                  {section.description}
                </p>
                {section.subItems ? (
                  <div className="space-y-2">
                    {section.subItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center justify-between p-3 rounded-md bg-white/50 hover:bg-white/70 transition-colors dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-white"
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-4 h-4 text-slate-800 dark:text-white" />
                          <span className="text-sm font-medium text-slate-800 dark:text-white">
                            {item.name}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 opacity-60 text-slate-800 dark:text-white" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    href={section.href}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 hover:bg-white/70 rounded-md transition-colors dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-white"
                  >
                    <span className="text-sm font-medium text-slate-800 dark:text-white">
                      Перейти
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-800 dark:text-white" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
