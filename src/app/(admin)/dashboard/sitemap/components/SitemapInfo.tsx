import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { FileText } from "lucide-react";

interface SitemapInfoProps {
  sitemapData: any;
}

export default function SitemapInfo({ sitemapData }: SitemapInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Информация о Sitemap
        </CardTitle>
        <CardDescription>Текущее состояние карты сайта</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">URL карты сайта:</span>
            <code className="text-sm bg-muted px-2 py-1 rounded">
              /sitemap.xml
            </code>
          </div>

          {sitemapData && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Количество URL:</span>
              <span className="text-sm">{sitemapData.urlsCount || 0}</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Последнее обновление:</span>
            <span className="text-sm">
              {sitemapData?.lastUpdated
                ? new Date(sitemapData.lastUpdated).toLocaleString("ru-RU")
                : "Неизвестно"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
