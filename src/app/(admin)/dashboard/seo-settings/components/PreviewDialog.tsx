import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/shadcn/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/shadcn/tabs";
import { Badge } from "@/components/ui/shadcn/badge";
import { GoogleSnippet } from "./GoogleSnippet";
import { YandexSnippet } from "./YandexSnippet";
import { renderDescription, truncateWithEllipsis } from "../utils";
import { type SeoPreview } from "@/services/seo-settings.service";

interface PreviewDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  preview: SeoPreview | undefined;
}

export function PreviewDialog({
  isOpen,
  onOpenChange,
  preview,
}: PreviewDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Предпросмотр SEO</DialogTitle>
        </DialogHeader>
        {preview && (
          <Tabs defaultValue="google" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="google">Google</TabsTrigger>
              <TabsTrigger value="yandex">Яндекс</TabsTrigger>
              <TabsTrigger value="og">Open Graph</TabsTrigger>
            </TabsList>

            <TabsContent value="google" className="space-y-4">
              <GoogleSnippet
                title={preview.google.title}
                description={preview.google.description}
                url={preview.google.url}
                renderDescription={renderDescription}
                truncateWithEllipsis={truncateWithEllipsis}
              />
              <div className="flex gap-2 mt-2">
                <Badge
                  variant={
                    preview.google.titleStatus === "good"
                      ? "default"
                      : "destructive"
                  }
                >
                  Title: {preview.google.titleLength}/60
                </Badge>
                <Badge
                  variant={
                    preview.google.descriptionStatus === "good"
                      ? "default"
                      : "destructive"
                  }
                >
                  Desc: {preview.google.descriptionLength}/160
                </Badge>
              </div>
            </TabsContent>

            <TabsContent value="yandex" className="space-y-4">
              <YandexSnippet
                title={preview.yandex.title}
                url={preview.yandex.url}
                description={preview.yandex.description}
                renderDescription={renderDescription}
                truncateWithEllipsis={truncateWithEllipsis}
              />
              <div className="flex gap-2 mt-2">
                <Badge
                  variant={
                    preview.yandex.titleStatus === "good"
                      ? "default"
                      : "destructive"
                  }
                >
                  Title: {preview.yandex.titleLength}/60
                </Badge>
                <Badge
                  variant={
                    preview.yandex.descriptionStatus === "good"
                      ? "default"
                      : "destructive"
                  }
                >
                  Desc: {preview.yandex.descriptionLength}/160
                </Badge>
              </div>
            </TabsContent>

            <TabsContent value="og" className="space-y-4">
              <div className="border rounded-lg p-4 bg-background dark:bg-[#202124] border-[#e3e3e3] dark:border-[#333]">
                {preview.og.image && (
                  <Image
                    src={preview.og.image}
                    alt="OG Image"
                    width={400}
                    height={128}
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                )}
                <div className="text-sm mb-2 text-[#202124] dark:text-[#8ab4a5]">
                  {preview.og.url}
                </div>
                <div className="text-lg font-medium mb-1 text-[#1a0dab] dark:text-[#8ab4f8]">
                  {preview.og.title || "Заголовок страницы"}
                </div>
                <div className="text-sm text-gray-700 dark:text-[#bdc1c6]">
                  {preview.og.description || "Описание страницы"}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}
