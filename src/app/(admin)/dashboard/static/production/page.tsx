"use client";

import { useEffect, useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/shadcn/tabs";
import { useProductionPageConfig } from "./hooks/useProductionPageConfig";
import { FirstScreenEditor } from "./components/FirstScreenEditor";
import { SecondScreenEditor } from "./components/SecondScreenEditor";
import { ThirdScreenEditor } from "./components/ThirdScreenEditor";
import { FourthScreenEditor } from "./components/FourthScreenEditor";
import { IProductionPageConfig } from "@/shared/types/production-page-config.types";

export default function StaticProductionPage() {
  const { config, loading, saving, updateConfig } = useProductionPageConfig();
  const [form, setForm] = useState<IProductionPageConfig | null>(null);

  useEffect(() => {
    if (config) setForm(config);
  }, [config]);

  if (loading || !form) return <div className="p-6">Загрузка...</div>;

  const saveFirst = (data: IProductionPageConfig["firstScreen"]) => {
    const updated = { ...form, firstScreen: data };
    setForm(updated);
    updateConfig(updated);
  };
  const saveSecond = (data: IProductionPageConfig["secondScreen"]) => {
    const updated = { ...form, secondScreen: data };
    setForm(updated);
    updateConfig(updated);
  };
  const saveThird = (data: IProductionPageConfig["thirdScreen"]) => {
    const updated = { ...form, thirdScreen: data };
    setForm(updated);
    updateConfig(updated);
  };
  const saveFourth = (data: IProductionPageConfig["fourthScreen"]) => {
    const updated = { ...form, fourthScreen: data };
    setForm(updated);
    updateConfig(updated);
  };

  return (
    <div className="p-6 mt-6">
      <Tabs defaultValue="first-screen" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="first-screen">Первый экран</TabsTrigger>
          <TabsTrigger value="second-screen">Этапы</TabsTrigger>
          <TabsTrigger value="third-screen">Оборудование</TabsTrigger>
          <TabsTrigger value="fourth-screen">Документы</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="first-screen" className="mt-0">
            <FirstScreenEditor
              data={form.firstScreen}
              onSave={saveFirst}
              saving={saving}
            />
          </TabsContent>
          <TabsContent value="second-screen" className="mt-0">
            <SecondScreenEditor
              data={form.secondScreen}
              onSave={saveSecond}
              saving={saving}
            />
          </TabsContent>
          <TabsContent value="third-screen" className="mt-0">
            <ThirdScreenEditor
              data={form.thirdScreen}
              onSave={saveThird}
              saving={saving}
            />
          </TabsContent>
          <TabsContent value="fourth-screen" className="mt-0">
            <FourthScreenEditor
              data={form.fourthScreen}
              onSave={saveFourth}
              saving={saving}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
