import { Button } from "@/components/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { RefreshCw, ExternalLink } from "lucide-react";
import { MiniLoader } from "@/components/ui/MiniLoader";

interface SitemapActionsProps {
  isRegenerating: boolean;
  onRegenerate: () => void;
  onViewSitemap: () => void;
}

export default function SitemapActions({
  isRegenerating,
  onRegenerate,
  onViewSitemap,
}: SitemapActionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Действия</CardTitle>
        <CardDescription>Управление картой сайта</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <Button
            onClick={onRegenerate}
            disabled={isRegenerating}
            className="flex items-center gap-2"
          >
            {isRegenerating ? (
              <MiniLoader />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            Пересоздать Sitemap
          </Button>

          <Button
            variant="outline"
            onClick={onViewSitemap}
            className="flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Просмотреть Sitemap
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
