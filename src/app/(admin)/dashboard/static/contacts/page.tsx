"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/shadcn/card";
import { DepartmentItemsManager } from "../../footer-config/components/DepartmentItemsManager";
import { DepartmentListWithActions } from "../../footer-config/components/DepartmentListWithActions";
import { FooterAddressManager } from "../../footer-config/components/FooterAddressManager";
import { useContactsPageConfig } from "./hooks/useContactsPageConfig";
import { useToast } from "@/hooks/use-toast";

interface ContactsForm {
  departments: { name: string; phone: string; email: string }[];
  address: string;
}

export default function StaticContactsPage() {
  const { config, loading, updateConfig } = useContactsPageConfig();
  const [form, setForm] = useState<ContactsForm>({
    departments: [],
    address: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    if (config)
      setForm({
        departments: config.departments || [],
        address: config.address || "",
      });
  }, [config]);

  const handleDepartmentsSave = (departments: ContactsForm["departments"]) => {
    const updated = { ...form, departments };
    updateConfig(updated, {
      onSuccess: () => {
        setForm(updated);
        toast({ title: "Успех", description: "Отделы сохранены" });
      },
      onError: () =>
        toast({
          title: "Ошибка",
          description: "Не удалось сохранить отделы",
          variant: "destructive",
        }),
    });
  };

  const handleAddressSave = (address: string) => {
    const updated = { ...form, address };
    updateConfig(updated, {
      onSuccess: () => {
        setForm(updated);
        toast({ title: "Успех", description: "Адрес сохранен" });
      },
      onError: () =>
        toast({
          title: "Ошибка",
          description: "Не удалось сохранить адрес",
          variant: "destructive",
        }),
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
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Отделы на странице контактов</CardTitle>
                <CardDescription className="mt-2">
                  Добавьте отделы с контактной информацией
                </CardDescription>
              </div>
              <DepartmentItemsManager
                items={form.departments}
                onChange={handleDepartmentsSave}
              />
            </div>
          </CardHeader>
          <CardContent>
            <DepartmentListWithActions
              items={form.departments}
              onChange={handleDepartmentsSave}
            />
          </CardContent>
        </Card>

        <FooterAddressManager
          address={form.address}
          onChange={handleAddressSave}
        />
      </div>
    </div>
  );
}
