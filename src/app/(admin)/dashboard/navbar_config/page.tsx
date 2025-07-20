"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import { Label } from "@/components/ui/shadcn/label";
import { useNavbarConfig } from "./hooks/useNavbarConfig";
import { formatPhoneNumber } from "@/shared/utils/formatPhoneNumber";
import { PagesMenuSelector } from "./components/PagesMenuSelector";
import { useToast } from "@/hooks/use-toast";

interface NavbarForm {
  navbarEmail: string;
  navbarPhone: string;
  navbarCtaButtonText: string;
  desktopNavbarConfig: {
    links_shown: string[];
    links_in_hidden_menu: string[];
  };
}

export default function NavbarConfigPage() {
  const { config, loading, saving, updateConfig } = useNavbarConfig();
  const [form, setForm] = useState<NavbarForm>({
    navbarEmail: "",
    navbarPhone: "",
    navbarCtaButtonText: "",
    desktopNavbarConfig: { links_shown: [], links_in_hidden_menu: [] },
  });

  const { toast } = useToast();

  useEffect(() => {
    if (config) {
      setForm({
        navbarEmail: config.navbarEmail || "",
        navbarPhone: config.navbarPhone || "",
        navbarCtaButtonText: config.navbarCtaButtonText || "",
        desktopNavbarConfig: config.desktopNavbarConfig || {
          links_shown: [],
          links_in_hidden_menu: [],
        },
      });
    }
  }, [config]);

  const handleChange = (e: any) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLinksChange = (
    field: "links_shown" | "links_in_hidden_menu",
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      desktopNavbarConfig: {
        ...prev.desktopNavbarConfig,
        [field]: value
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      },
    }));
  };

  const handlePhoneChange = (e: any) => {
    const formatted = formatPhoneNumber(e.target.value);
    setForm((prev) => ({ ...prev, navbarPhone: formatted }));
  };

  const handlePagesUpdate = (linksShown: string[], linksHidden: string[]) => {
    setForm((prev) => ({
      ...prev,
      desktopNavbarConfig: {
        ...prev.desktopNavbarConfig,
        links_shown: linksShown,
        links_in_hidden_menu: linksHidden,
      },
    }));
    updateConfig(
      {
        ...form,
        desktopNavbarConfig: {
          ...form.desktopNavbarConfig,
          links_shown: linksShown,
          links_in_hidden_menu: linksHidden,
        },
      },
      {
        onSuccess: () => {
          toast({
            title: "Успех",
            description: "Верхнее меню успешно обновлено",
          });
        },
        onError: () => {
          toast({
            title: "Ошибка",
            description: "Не удалось обновить верхнее меню",
            variant: "destructive",
          });
        },
      }
    );
  };

  // Новый обработчик для сохранения только полей (email, телефон, текст кнопки)
  const handleFieldsSave = (e: any) => {
    e.preventDefault();
    updateConfig(
      {
        ...form,
        // desktopNavbarConfig не трогаем, чтобы не затереть изменения карточек
      },
      {
        onSuccess: () => {
          toast({
            title: "Успех",
            description: "Поля верхнего меню успешно обновлены",
          });
        },
        onError: () => {
          toast({
            title: "Ошибка",
            description: "Не удалось обновить поля верхнего меню",
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <div className="container mx-auto py-10 max-w-6xl">
      <Card>
        <CardHeader>
          <CardTitle>Настройки верхнего меню</CardTitle>
          <CardDescription>
            Здесь вы можете отредактировать email, телефон и текст
            кнопки верхнего меню сайта.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Загрузка...</div>
          ) : (
            <form className="space-y-6" onSubmit={handleFieldsSave}>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="max-w-md w-full flex-1">
                  <Label htmlFor="navbarEmail">Email</Label>
                  <Input
                    id="navbarEmail"
                    name="navbarEmail"
                    value={form.navbarEmail}
                    onChange={handleChange}
                    placeholder="info@example.com"
                    className="w-full"
                  />
                </div>
                <div className="max-w-md w-full flex-1">
                  <Label htmlFor="navbarPhone">Телефон</Label>
                  <Input
                    id="navbarPhone"
                    name="navbarPhone"
                    type="tel"
                    value={form.navbarPhone}
                    onChange={handlePhoneChange}
                    placeholder="+7 (999) 123-45-67"
                    className="w-full"
                  />
                </div>
                <div className="max-w-md w-full flex-1">
                  <Label htmlFor="navbarCtaButtonText">Текст кнопки</Label>
                  <Input
                    id="navbarCtaButtonText"
                    name="navbarCtaButtonText"
                    value={form.navbarCtaButtonText}
                    onChange={handleChange}
                    placeholder="Связаться"
                    className="w-full"
                  />
                </div>
              </div>
              <Button type="submit" disabled={saving} className="w-full mt-4">
                {saving ? "Сохранение..." : "Сохранить"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
      <div className="mt-8" />
      {/* Редактор карточек */}
      <Card>
        <CardHeader>
          <CardTitle>Редактор пунктов меню</CardTitle>
          <CardDescription>
            Здесь вы можете распределить страницы между главным меню и
            выпадающим списком.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PagesMenuSelector
            linksShown={form.desktopNavbarConfig.links_shown}
            linksHidden={form.desktopNavbarConfig.links_in_hidden_menu}
            onChange={handlePagesUpdate}
          />
        </CardContent>
      </Card>
    </div>
  );
}
