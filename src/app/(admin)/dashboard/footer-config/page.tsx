"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/shadcn/card";
import { useFooterConfig } from "./hooks/useFooterConfig";
import { DepartmentItemsManager } from "./components/DepartmentItemsManager";
import { DepartmentListWithActions } from "./components/DepartmentListWithActions";
import { FooterLinksSelector } from "./components/FooterLinksSelector";
import { FooterAddressManager } from "./components/FooterAddressManager";
import { useToast } from "@/hooks/use-toast";

interface FooterForm {
  footerLinksConfig: {
    links_in_tablet_menu: string[];
    all_links: string[];
  };
  departmentItems: {
    name: string;
    phone: string;
    email: string;
  }[];
  footerAddress: string;
}

export default function FooterConfigPage() {
  const { config, loading, updateConfig } = useFooterConfig();
  const [form, setForm] = useState<FooterForm>({
    footerLinksConfig: {
      links_in_tablet_menu: [],
      all_links: [],
    },
    departmentItems: [],
    footerAddress: "",
  });

  const { toast } = useToast();

  useEffect(() => {
    console.log("FooterConfigPage: Config changed:", config);
    if (config) {
      const newForm = {
        footerLinksConfig: config.footerLinksConfig || {
          links_in_tablet_menu: [],
          all_links: [],
        },
        departmentItems: config.departmentItems || [],
        footerAddress: config.footerAddress || "",
      };
      console.log("FooterConfigPage: Setting form to:", newForm);
      setForm(newForm);
    }
  }, [config]);

  const handleAddressSave = (address: string) => {
    console.log("Saving address:", address);
    const updatedForm = { ...form, footerAddress: address };
    console.log("Updated form data:", updatedForm);
    updateConfig(updatedForm, {
      onSuccess: () => {
        setForm(updatedForm); // Обновляем локальное состояние
        toast({
          title: "Успех",
          description: "Адрес успешно сохранен",
        });
      },
      onError: (error) => {
        console.error("Error saving address:", error);
        toast({
          title: "Ошибка",
          description: "Не удалось сохранить адрес",
          variant: "destructive",
        });
      },
    });
  };

  const handleLinksSave = (tabletMenu: string[], allLinks: string[]) => {
    const updatedForm = {
      ...form,
      footerLinksConfig: {
        links_in_tablet_menu: tabletMenu,
        all_links: allLinks,
      },
    };
    updateConfig(updatedForm, {
      onSuccess: () => {
        setForm(updatedForm); // Обновляем локальное состояние
        toast({
          title: "Успех",
          description: "Ссылки успешно сохранены",
        });
      },
      onError: () => {
        toast({
          title: "Ошибка",
          description: "Не удалось сохранить ссылки",
          variant: "destructive",
        });
      },
    });
  };

  const handleDepartmentsSave = (departmentItems: any[]) => {
    const updatedForm = { ...form, departmentItems };
    updateConfig(updatedForm, {
      onSuccess: () => {
        setForm(updatedForm); // Обновляем локальное состояние
        toast({
          title: "Успех",
          description: "Отделы успешно сохранены",
        });
      },
      onError: () => {
        toast({
          title: "Ошибка",
          description: "Не удалось сохранить отделы",
          variant: "destructive",
        });
      },
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 max-w-6xl">
      <div className="space-y-6">
        {/* Department Items */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Отделы компании</CardTitle>
                <CardDescription className="mt-2">
                  Добавьте отделы с контактной информацией
                </CardDescription>
              </div>
              <DepartmentItemsManager
                items={form.departmentItems}
                onChange={handleDepartmentsSave}
              />
            </div>
          </CardHeader>
          <CardContent>
            <DepartmentListWithActions
              items={form.departmentItems}
              onChange={handleDepartmentsSave}
            />
          </CardContent>
        </Card>

        {/* Footer Address */}
        <FooterAddressManager
          address={form.footerAddress}
          onChange={handleAddressSave}
        />

        {/* Footer Links Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Ссылки нижнего меню</CardTitle>
            <CardDescription>
              Настройте ссылки, которые будут отображаться в нижнем меню
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FooterLinksSelector
              linksInTabletMenu={form.footerLinksConfig.links_in_tablet_menu}
              allLinks={form.footerLinksConfig.all_links}
              onChange={handleLinksSave}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
