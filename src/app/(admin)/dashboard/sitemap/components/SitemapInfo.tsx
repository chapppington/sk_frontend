import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { Button } from "@/components/ui/shadcn/button";
import { FileText, ExternalLink } from "lucide-react";

interface SitemapInfoProps {
  sitemapData: any;
  onViewSitemap: () => void;
}

export default function SitemapInfo({
  sitemapData,
  onViewSitemap,
}: SitemapInfoProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Информация о Sitemap
            </CardTitle>
            <CardDescription>Текущее состояние карты сайта</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onViewSitemap}
            className="flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Просмотреть sitemap.xml
          </Button>
        </div>
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
