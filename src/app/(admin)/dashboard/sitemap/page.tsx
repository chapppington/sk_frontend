"use client";

import { useState } from "react";
import { useSitemap } from "@/hooks/useSitemap";
import { MiniLoader } from "@/components/ui/MiniLoader";
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

        {/* Dynamic Routes Management Component */}
        <DynamicRoutesManager
          dynamicRoutesData={dynamicRoutesData}
          isUpdatingDynamicRoutes={isUpdatingDynamicRoutes}
          onToggle={handleDynamicRouteToggle}
          onUpdate={handleDynamicRouteUpdate}
        />

        {/* Static Routes Management Component */}
        <StaticRoutesManager
          staticRoutesData={staticRoutesData}
          isUpdatingRoutes={isUpdatingRoutes}
          onUpdateRoutes={updateStaticRoutes}
        />
      </div>
    </div>
  );
}
