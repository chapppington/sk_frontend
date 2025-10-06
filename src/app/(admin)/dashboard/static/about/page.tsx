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
import { useAboutPageConfig } from "@/hooks/useAboutPageConfig";
import { IAboutPageConfig } from "@/shared/types/about-page-config.types";
import { FirstScreenEditor } from "./components/FirstScreenEditor";
import { HistoryScreenEditor } from "./components/HistoryScreenEditor";
import { TeamScreenEditor } from "./components/TeamScreenEditor";

function AboutPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("first-screen");
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<IAboutPageConfig | null>(null);
  const { config, loading, updateConfig, isUpdating } = useAboutPageConfig();

  useEffect(() => {
    if (config) setForm(config);
  }, [config]);

  const handleUpdateConfig = async (data: IAboutPageConfig) => {
    setSaving(true);
    try {
      await updateConfig(data);
    } catch (error) {
      console.error("Error updating config:", error);
    } finally {
      setSaving(false);
    }
  };

  const saveFirst = (data: IAboutPageConfig["firstScreen"]) => {
    if (!form) return;
    const updated: IAboutPageConfig = {
      ...form,
      firstScreen: data,
    };
    setForm(updated);
    handleUpdateConfig(updated);
  };

  const saveHistory = (data: IAboutPageConfig["historyScreen"]) => {
    if (!form) return;
    const updated: IAboutPageConfig = {
      ...form,
      historyScreen: data,
    };
    setForm(updated);
    handleUpdateConfig(updated);
  };

  const saveTeam = (data: IAboutPageConfig["teamScreen"]) => {
    if (!form) return;
    const updated: IAboutPageConfig = {
      ...form,
      teamScreen: data,
    };
    setForm(updated);
    handleUpdateConfig(updated);
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
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="first-screen">Первый экран</TabsTrigger>
          <TabsTrigger value="history-screen">История</TabsTrigger>
          <TabsTrigger value="team-screen">Команда</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="first-screen" className="mt-0">
            <FirstScreenEditor
              data={form.firstScreen}
              onSave={saveFirst}
              saving={saving}
            />
          </TabsContent>
          <TabsContent value="history-screen" className="mt-0">
            <HistoryScreenEditor
              data={form.historyScreen}
              onSave={saveHistory}
              saving={saving}
            />
          </TabsContent>
          <TabsContent value="team-screen" className="mt-0">
            <TeamScreenEditor
              data={form.teamScreen}
              onSave={saveTeam}
              saving={saving}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default function AboutPage() {
  return (
    <Suspense fallback={<div className="p-6">Загрузка...</div>}>
      <AboutPageContent />
    </Suspense>
  );
}