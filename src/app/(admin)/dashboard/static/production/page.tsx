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
import { useSearchParams, useRouter } from "next/navigation";

export default function StaticProductionPage() {
  const { config, loading, saving, updateConfig } = useProductionPageConfig();
  const [form, setForm] = useState<IProductionPageConfig | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTab = searchParams.get("tab") || "first-screen";
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  useEffect(() => {
    if (config) setForm(config);
  }, [config]);

  const saveFirst = (data: IProductionPageConfig["firstScreen"]) => {
    const updated: IProductionPageConfig = {
      ...(form as IProductionPageConfig),
      firstScreen: data,
    };
    setForm(updated);
    updateConfig(updated);
  };
  const saveSecond = (data: IProductionPageConfig["secondScreen"]) => {
    const updated: IProductionPageConfig = {
      ...(form as IProductionPageConfig),
      secondScreen: data,
    };
    setForm(updated);
    updateConfig(updated);
  };
  const saveThird = (data: IProductionPageConfig["thirdScreen"]) => {
    const updated: IProductionPageConfig = {
      ...(form as IProductionPageConfig),
      thirdScreen: data,
    };
    setForm(updated);
    updateConfig(updated);
  };
  const saveFourth = (data: IProductionPageConfig["fourthScreen"]) => {
    const updated: IProductionPageConfig = {
      ...(form as IProductionPageConfig),
      fourthScreen: data,
    };
    setForm(updated);
    updateConfig(updated);
  };

  useEffect(() => {
    const q = searchParams.get("tab");
    if (q && q !== activeTab) setActiveTab(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const setTabQuery = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("tab", value);
    router.replace(`?${params.toString()}`);
  };

  if (loading || !form) return <div className="p-6">Загрузка...</div>;

  return (
    <div className="p-6 mt-6">
      <Tabs
        value={activeTab}
        onValueChange={(v) => {
          setActiveTab(v);
          setTabQuery(v);
        }}
        className="w-full"
      >
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
