"use client";

import { useEffect, useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/shadcn/tabs";
import { useHomePageConfig } from "./hooks/useHomePageConfig";
import { FirstScreenEditor } from "./components/FirstScreenEditor";
import { RotatingTextEditor } from "./components/RotatingTextEditor";
import { MissionScreenEditor } from "./components/MissionScreenEditor";
import { ProductsScreenEditor } from "./components/ProductsScreenEditor";
import { ReviewsScreenEditor } from "./components/ReviewsScreenEditor";
import { IHomePageConfig } from "@/shared/types/home-page-config.types";

export default function HomePageConfigPage() {
  const { config, loading, saving, updateConfig } = useHomePageConfig();
  const [form, setForm] = useState<IHomePageConfig | null>(null);

  useEffect(() => {
    if (config) {
      setForm(config);
    }
  }, [config]);

  if (loading || !form) {
    return <div className="p-6">Загрузка...</div>;
  }

  const handleFirstScreenSave = (data: typeof form.firstScreen) => {
    const updatedForm = { ...form, firstScreen: data };
    setForm(updatedForm);
    updateConfig(updatedForm);
  };

  const handleRotatingTextSave = (text: string) => {
    const updatedForm = { ...form, rotatingText: text };
    setForm(updatedForm);
    updateConfig(updatedForm);
  };

  const handleMissionScreenSave = (data: typeof form.missionScreen) => {
    const updatedForm = { ...form, missionScreen: data };
    setForm(updatedForm);
    updateConfig(updatedForm);
  };

  const handleProductsScreenSave = (data: typeof form.productsScreen) => {
    const updatedForm = { ...form, productsScreen: data };
    setForm(updatedForm);
    updateConfig(updatedForm);
  };

  const handleReviewsScreenSave = (data: typeof form.reviewsScreen) => {
    const updatedForm = { ...form, reviewsScreen: data };
    setForm(updatedForm);
    updateConfig(updatedForm);
  };

  return (
    <div className="p-6 mt-6">
      <Tabs defaultValue="first-screen" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="first-screen">Первый экран</TabsTrigger>
          <TabsTrigger value="rotating-text">Вращающийся текст</TabsTrigger>
          <TabsTrigger value="mission-screen">Экран миссии</TabsTrigger>
          <TabsTrigger value="products-screen">Экран продукции</TabsTrigger>
          <TabsTrigger value="reviews-screen">Экран отзывов</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="first-screen" className="mt-0">
            <FirstScreenEditor
              data={form.firstScreen}
              onSave={handleFirstScreenSave}
              saving={saving}
            />
          </TabsContent>

          <TabsContent value="rotating-text" className="mt-0">
            <RotatingTextEditor
              text={form.rotatingText}
              onSave={handleRotatingTextSave}
              saving={saving}
            />
          </TabsContent>

          <TabsContent value="mission-screen" className="mt-0">
            <MissionScreenEditor
              data={form.missionScreen}
              onSave={handleMissionScreenSave}
              saving={saving}
            />
          </TabsContent>

          <TabsContent value="products-screen" className="mt-0">
            <ProductsScreenEditor
              data={form.productsScreen}
              onSave={handleProductsScreenSave}
              saving={saving}
            />
          </TabsContent>

          <TabsContent value="reviews-screen" className="mt-0">
            <ReviewsScreenEditor
              data={form.reviewsScreen}
              onSave={handleReviewsScreenSave}
              saving={saving}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
