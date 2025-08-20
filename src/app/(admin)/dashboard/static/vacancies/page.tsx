"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/shadcn/tabs";
import { useState, useEffect } from "react";
import { useVacanciesPageConfig } from "./hooks/useVacanciesPageConfig";
import { FirstScreenEditor } from "./components/FirstScreenEditor";
import { SecondScreenEditor } from "./components/SecondScreenEditor";
import { ThirdScreenEditor } from "./components/ThirdScreenEditor";
import { FourthScreenEditor } from "./components/FourthScreenEditor";
import { FifthScreenEditor } from "./components/FifthScreenEditor";
import { SixthScreenEditor } from "./components/SixthScreenEditor";
import { IUpdateVacanciesPageConfigData } from "@/shared/types/vacancies-page-config.types";

function VacanciesPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("first-screen");
  const { config, loading, updateConfig, isUpdating } =
    useVacanciesPageConfig();

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

  if (loading || !config) return <div className="p-6">Загрузка...</div>;

  const saveFirst = async (data: any) => updateConfig({ firstScreen: data });
  const saveSecond = async (data: any) => updateConfig({ secondScreen: data });
  const saveThird = async (data: any) => updateConfig({ thirdScreen: data });
  const saveFourth = async (data: any) => updateConfig({ fourthScreen: data });
  const saveFifth = async (data: any) => updateConfig({ fifthScreen: data });
  const saveSixth = async (data: any) => updateConfig({ sixthScreen: data });

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
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="first-screen">Первый экран</TabsTrigger>
          <TabsTrigger value="second-screen">Секция вакансий</TabsTrigger>
          <TabsTrigger value="third-screen">Ценности</TabsTrigger>
          <TabsTrigger value="fourth-screen">Преимущества</TabsTrigger>
          <TabsTrigger value="fifth-screen">Отзывы</TabsTrigger>
          <TabsTrigger value="sixth-screen">FAQ</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="first-screen" className="mt-0">
            <FirstScreenEditor
              data={config.firstScreen}
              onSave={saveFirst}
              saving={isUpdating}
            />
          </TabsContent>
          <TabsContent value="second-screen" className="mt-0">
            <SecondScreenEditor
              data={config.secondScreen}
              onSave={saveSecond}
              saving={isUpdating}
            />
          </TabsContent>
          <TabsContent value="third-screen" className="mt-0">
            <ThirdScreenEditor
              data={config.thirdScreen}
              onSave={saveThird}
              saving={isUpdating}
            />
          </TabsContent>
          <TabsContent value="fourth-screen" className="mt-0">
            <FourthScreenEditor
              data={config.fourthScreen}
              onSave={saveFourth}
              saving={isUpdating}
            />
          </TabsContent>
          <TabsContent value="fifth-screen" className="mt-0">
            <FifthScreenEditor
              data={config.fifthScreen}
              onSave={saveFifth}
              saving={isUpdating}
            />
          </TabsContent>
          <TabsContent value="sixth-screen" className="mt-0">
            <SixthScreenEditor
              data={config.sixthScreen}
              onSave={saveSixth}
              saving={isUpdating}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default function VacanciesPage() {
  return (
    <Suspense fallback={<div className="p-6">Загрузка...</div>}>
      <VacanciesPageContent />
    </Suspense>
  );
}
