import React from "react";
import { Info } from "lucide-react";

export default function SitemapExplanation() {
  return (
    <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
      <div className="flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
            Что мы редактируем в Sitemap
          </h3>

          <p className="text-sm text-blue-700 dark:text-blue-300">
            Здесь вы управляете файлом sitemap.xml — списком всех страниц сайта
            для поисковых систем. Любые изменения автоматически обновляют
            sitemap.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-blue-800 dark:text-blue-200">
                📄 Статичные пути
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Постоянные страницы сайта: главная (/), о компании (/about),
                контакты (/contacts). Когда вы добавляете новый статичный путь —
                он сразу появляется в sitemap.xml.
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Что можно делать:</strong> Добавлять новые разделы
                сайта, менять приоритет страниц для поисковиков, настраивать как
                часто обновляется контент.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-blue-800 dark:text-blue-200">
                🔄 Динамические пути
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Страницы, которые создаются автоматически: товары
                (/product/название), новости (/news/заголовок), проекты
                (/portfolio/название). Включаете тип контента — все страницы
                этого типа попадают в sitemap.
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Что можно делать:</strong> Включать/выключать целые
                категории страниц, настраивать SEO-параметры для всех товаров
                или всех новостей сразу.
              </p>
            </div>
          </div>

          <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4 mt-4">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>💡 Как это работает:</strong> Добавили новый статичный
              путь /services — он появится в sitemap. Включили товары в
              динамических путях — все страницы товаров автоматически попадут в
              sitemap. Изменили приоритет — поисковики будут знать, какие
              страницы важнее.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
