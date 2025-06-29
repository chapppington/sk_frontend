"use client";

import { useState } from "react";
import { useSitemap } from "@/hooks/useSitemap";
import { MiniLoader } from "@/components/ui/MiniLoader";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/shadcn/tabs";
import DynamicRoutesManager from "./components/DynamicRoutesManager";
import StaticRoutesManager from "./components/StaticRoutesManager";
import SitemapInfo from "./components/SitemapInfo";
import SitemapActions from "./components/SitemapActions";
import { HelpDialog } from "./components/HelpDialog";

export default function SitemapPage() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Use the custom hook for all sitemap operations
  const {
    sitemapData,
    staticRoutesData,
    dynamicRoutesData,
    isLoading,
    isLoadingRoutes,
    isLoadingDynamicRoutes,
    isRegenerating,
    isUpdatingRoutes,
    isUpdatingDynamicRoutes,
    regenerateSitemap,
    updateStaticRoutes,
    updateDynamicRoutes,
  } = useSitemap();

  const handleRegenerate = () => {
    regenerateSitemap();
  };

  const handleViewSitemap = () => {
    window.open("/sitemap.xml", "_blank");
  };

  const handleDynamicRouteToggle = (entityType: string, enabled: boolean) => {
    const currentDynamicRoutes = dynamicRoutesData?.dynamicRoutes || {};
    const updatedDynamicRoutes = {
      ...currentDynamicRoutes,
      [entityType]: {
        ...currentDynamicRoutes[entityType],
        enabled,
      },
    };
    updateDynamicRoutes(updatedDynamicRoutes);
  };

  const handleDynamicRouteUpdate = (
    entityType: string,
    field: string,
    value: any
  ) => {
    const currentDynamicRoutes = dynamicRoutesData?.dynamicRoutes || {};
    const updatedDynamicRoutes = {
      ...currentDynamicRoutes,
      [entityType]: {
        ...currentDynamicRoutes[entityType],
        [field]: value,
      },
    };
    updateDynamicRoutes(updatedDynamicRoutes);
  };

  if (isLoading || isLoadingRoutes || isLoadingDynamicRoutes) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <MiniLoader width={100} height={100} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header with Help Button */}
      <div className="flex justify-start mb-6">
        <HelpDialog isOpen={isHelpOpen} onOpenChange={setIsHelpOpen} />
      </div>

      <div className="grid gap-6">
        {/* Top row: Sitemap Info and Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sitemap Info Component */}
          <SitemapInfo sitemapData={sitemapData} />

          {/* Sitemap Actions Component */}
          <SitemapActions
            isRegenerating={isRegenerating}
            onRegenerate={handleRegenerate}
            onViewSitemap={handleViewSitemap}
          />
        </div>

        {/* Tabs for Routes Management */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Управление путями в sitemap.xml</h3>
              <p className="text-sm text-muted-foreground">
                Выберите тип путей для настройки: динамические (автоматически создаваемые) или статичные (постоянные страницы)
              </p>
            </div>
          </div>
          
          <Tabs defaultValue="dynamic" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="dynamic">Динамические пути</TabsTrigger>
              <TabsTrigger value="static">Статичные пути</TabsTrigger>
            </TabsList>

            <TabsContent value="dynamic" className="space-y-4">
              <DynamicRoutesManager
                dynamicRoutesData={dynamicRoutesData}
                isUpdatingDynamicRoutes={isUpdatingDynamicRoutes}
                onToggle={handleDynamicRouteToggle}
                onUpdate={handleDynamicRouteUpdate}
              />
            </TabsContent>

            <TabsContent value="static" className="space-y-4">
              <StaticRoutesManager
                staticRoutesData={staticRoutesData}
                isUpdatingRoutes={isUpdatingRoutes}
                onUpdateRoutes={updateStaticRoutes}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
