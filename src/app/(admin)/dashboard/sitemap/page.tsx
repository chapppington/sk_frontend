"use client";

import { useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";
import { Checkbox } from "@/components/ui/shadcn/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import sitemapService from "@/services/sitemap.service";
import { MiniLoader } from "@/components/ui/MiniLoader";
import {
  RefreshCw,
  ExternalLink,
  FileText,
  Plus,
  Trash2,
  Save,
  Settings,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";

const changeFreqOptions = [
  { value: "always", label: "Всегда" },
  { value: "hourly", label: "Ежечасно" },
  { value: "daily", label: "Ежедневно" },
  { value: "weekly", label: "Еженедельно" },
  { value: "monthly", label: "Ежемесячно" },
  { value: "yearly", label: "Ежегодно" },
  { value: "never", label: "Никогда" },
];

export default function SitemapPage() {
  const { toast } = useToast();
  const [newRoute, setNewRoute] = useState("");
  const [newPriority, setNewPriority] = useState("0.5");
  const [newChangeFreq, setNewChangeFreq] = useState("monthly");
  const [editingRoute, setEditingRoute] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [editPriority, setEditPriority] = useState("0.5");
  const [editChangeFreq, setEditChangeFreq] = useState("monthly");

  // Fetch sitemap data
  const {
    data: sitemapData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["sitemap-data"],
    queryFn: () => sitemapService.getSitemapData(),
  });

  // Fetch static routes
  const {
    data: staticRoutesData,
    isLoading: isLoadingRoutes,
    refetch: refetchRoutes,
  } = useQuery({
    queryKey: ["static-routes"],
    queryFn: () => sitemapService.getStaticRoutes(),
  });

  // Fetch dynamic routes
  const {
    data: dynamicRoutesData,
    isLoading: isLoadingDynamicRoutes,
    refetch: refetchDynamicRoutes,
  } = useQuery({
    queryKey: ["dynamic-routes"],
    queryFn: () => sitemapService.getDynamicRoutes(),
  });

  // Regenerate sitemap mutation
  const { mutate: regenerateSitemap, isPending: isRegenerating } = useMutation({
    mutationFn: () => sitemapService.regenerateSitemap(),
    onSuccess: (result) => {
      if (result.success) {
        toast({
          title: "Успех",
          description: `Sitemap пересоздан успешно. URL'ов: ${result.urlsCount}`,
        });
        refetch(); // Refresh data after regeneration
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось пересоздать sitemap",
          variant: "destructive",
        });
      }
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось пересоздать sitemap",
        variant: "destructive",
      });
    },
  });

  // Update static routes mutation
  const { mutate: updateStaticRoutes, isPending: isUpdatingRoutes } =
    useMutation({
      mutationFn: (
        routes: Array<{ route: string; priority: number; changeFreq: string }>
      ) => sitemapService.updateStaticRoutes(routes),
      onSuccess: async (result) => {
        if (result.success) {
          toast({
            title: "Успех",
            description: "Статичные пути обновлены успешно",
          });
          refetchRoutes();
          setNewRoute("");
          setNewPriority("0.5");
          setNewChangeFreq("monthly");

          // Автоматически пересоздаем sitemap после обновления статических путей
          try {
            await sitemapService.regenerateSitemap();
            refetch(); // Обновляем данные sitemap
            toast({
              title: "Sitemap обновлен",
              description:
                "Карта сайта автоматически пересоздана после изменения статических путей",
            });
          } catch (error) {
            console.error("Failed to regenerate sitemap:", error);
          }
        } else {
          toast({
            title: "Ошибка",
            description: result.message || "Не удалось обновить статичные пути",
            variant: "destructive",
          });
        }
      },
      onError: () => {
        toast({
          title: "Ошибка",
          description: "Не удалось обновить статичные пути",
          variant: "destructive",
        });
      },
    });

  // Update dynamic routes mutation
  const { mutate: updateDynamicRoutes, isPending: isUpdatingDynamicRoutes } =
    useMutation({
      mutationFn: (dynamicRoutes: any) =>
        sitemapService.updateDynamicRoutes(dynamicRoutes),
      onSuccess: async (result) => {
        if (result.success) {
          toast({
            title: "Успех",
            description: "Динамические пути обновлены успешно",
          });
          refetchDynamicRoutes();

          // Автоматически пересоздаем sitemap после обновления динамических путей
          try {
            await sitemapService.regenerateSitemap();
            refetch(); // Обновляем данные sitemap
            toast({
              title: "Sitemap обновлен",
              description:
                "Карта сайта автоматически пересоздана после изменения динамических путей",
            });
          } catch (error) {
            console.error("Failed to regenerate sitemap:", error);
          }
        } else {
          toast({
            title: "Ошибка",
            description:
              result.message || "Не удалось обновить динамические пути",
            variant: "destructive",
          });
        }
      },
      onError: () => {
        toast({
          title: "Ошибка",
          description: "Не удалось обновить динамические пути",
          variant: "destructive",
        });
      },
    });

  const handleRegenerate = () => {
    regenerateSitemap();
  };

  const handleViewSitemap = () => {
    window.open("/sitemap.xml", "_blank");
  };

  const handleAddRoute = () => {
    if (!newRoute.trim()) return;

    const currentRoutes = staticRoutesData?.routes || [];
    const routeToAdd = newRoute.startsWith("/") ? newRoute : `/${newRoute}`;

    if (currentRoutes.some((r) => r.route === routeToAdd)) {
      toast({
        title: "Ошибка",
        description: "Такой путь уже существует",
        variant: "destructive",
      });
      return;
    }

    const newRouteItem = {
      route: routeToAdd,
      priority: parseFloat(newPriority),
      changeFreq: newChangeFreq,
    };

    updateStaticRoutes([...currentRoutes, newRouteItem]);
  };

  const handleRemoveRoute = (routeToRemove: string) => {
    const currentRoutes = staticRoutesData?.routes || [];
    const updatedRoutes = currentRoutes.filter(
      (route) => route.route !== routeToRemove
    );
    updateStaticRoutes(updatedRoutes);
  };

  const handleStartEdit = (routeItem: {
    route: string;
    priority: number;
    changeFreq: string;
  }) => {
    setEditingRoute(routeItem.route);
    setEditValue(routeItem.route);
    setEditPriority(routeItem.priority.toFixed(1));
    setEditChangeFreq(routeItem.changeFreq);
  };

  const handleSaveEdit = () => {
    if (!editingRoute || !editValue.trim()) return;

    const currentRoutes = staticRoutesData?.routes || [];
    const routeToUpdate = editValue.startsWith("/")
      ? editValue
      : `/${editValue}`;

    if (
      routeToUpdate !== editingRoute &&
      currentRoutes.some((r) => r.route === routeToUpdate)
    ) {
      toast({
        title: "Ошибка",
        description: "Такой путь уже существует",
        variant: "destructive",
      });
      return;
    }

    const updatedRoutes = currentRoutes.map((route) =>
      route.route === editingRoute
        ? {
            route: routeToUpdate,
            priority: parseFloat(editPriority),
            changeFreq: editChangeFreq,
          }
        : route
    );
    updateStaticRoutes(updatedRoutes);
    setEditingRoute(null);
    setEditValue("");
    setEditPriority("0.5");
    setEditChangeFreq("monthly");
  };

  const handleCancelEdit = () => {
    setEditingRoute(null);
    setEditValue("");
    setEditPriority("0.5");
    setEditChangeFreq("monthly");
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
      <div className="grid gap-6">
        {/* Top row: Sitemap Info and Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sitemap Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Информация о Sitemap
              </CardTitle>
              <CardDescription>Текущее состояние карты сайта</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">URL карты сайта:</span>
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    /sitemap.xml
                  </code>
                </div>

                {sitemapData && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Количество URL:</span>
                    <span className="text-sm">
                      {sitemapData.urlsCount || 0}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Последнее обновление:
                  </span>
                  <span className="text-sm">
                    {sitemapData?.lastUpdated
                      ? new Date(sitemapData.lastUpdated).toLocaleString(
                          "ru-RU"
                        )
                      : "Неизвестно"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle>Действия</CardTitle>
              <CardDescription>Управление картой сайта</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button
                  onClick={handleRegenerate}
                  disabled={isRegenerating}
                  className="flex items-center gap-2"
                >
                  {isRegenerating ? (
                    <MiniLoader />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  Пересоздать Sitemap
                </Button>

                <Button
                  variant="outline"
                  onClick={handleViewSitemap}
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Просмотреть Sitemap
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dynamic Routes Management Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Управление динамическими путями
            </CardTitle>
            <CardDescription>
              Настройте, какие типы контента включать в sitemap и их параметры
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {dynamicRoutesData?.dynamicRoutes &&
                Object.entries(dynamicRoutesData.dynamicRoutes).map(
                  ([entityType, config]: [string, any]) => (
                    <div key={entityType} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id={`${entityType}-enabled`}
                            checked={config.enabled}
                            onCheckedChange={(checked) =>
                              handleDynamicRouteToggle(
                                entityType,
                                checked as boolean
                              )
                            }
                            disabled={isUpdatingDynamicRoutes}
                          />
                          <label
                            htmlFor={`${entityType}-enabled`}
                            className="text-sm font-medium cursor-pointer"
                          >
                            {config.description}
                          </label>
                        </div>
                      </div>

                      {config.enabled && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              Приоритет
                            </label>
                            <Select
                              value={config.priority?.toString() || "0.5"}
                              onValueChange={(value) =>
                                handleDynamicRouteUpdate(
                                  entityType,
                                  "priority",
                                  parseFloat(value)
                                )
                              }
                              disabled={isUpdatingDynamicRoutes}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1.0">
                                  1.0 (Максимальный)
                                </SelectItem>
                                <SelectItem value="0.9">
                                  0.9 (Очень высокий)
                                </SelectItem>
                                <SelectItem value="0.8">
                                  0.8 (Высокий)
                                </SelectItem>
                                <SelectItem value="0.7">
                                  0.7 (Средне-высокий)
                                </SelectItem>
                                <SelectItem value="0.6">
                                  0.6 (Средний)
                                </SelectItem>
                                <SelectItem value="0.5">
                                  0.5 (Низкий)
                                </SelectItem>
                                <SelectItem value="0.4">
                                  0.4 (Очень низкий)
                                </SelectItem>
                                <SelectItem value="0.3">
                                  0.3 (Минимальный)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              Частота обновления
                            </label>
                            <Select
                              value={config.changeFreq || "monthly"}
                              onValueChange={(value) =>
                                handleDynamicRouteUpdate(
                                  entityType,
                                  "changeFreq",
                                  value
                                )
                              }
                              disabled={isUpdatingDynamicRoutes}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {changeFreqOptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                )}
            </div>
          </CardContent>
        </Card>

        {/* Static Routes Management Card */}
        <Card>
          <CardHeader>
            <CardTitle>Управление статичными путями</CardTitle>
            <CardDescription>
              Добавляйте, редактируйте и удаляйте статичные страницы для sitemap
              с настройкой приоритетов
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Add new route */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Путь</label>
                  <Input
                    placeholder="Путь (например: /about)"
                    value={newRoute}
                    onChange={(e) => setNewRoute(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddRoute()}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Приоритет</label>
                  <Select value={newPriority} onValueChange={setNewPriority}>
                    <SelectTrigger>
                      <SelectValue placeholder="Приоритет" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1.0">1.0 (Максимальный)</SelectItem>
                      <SelectItem value="0.9">0.9 (Очень высокий)</SelectItem>
                      <SelectItem value="0.8">0.8 (Высокий)</SelectItem>
                      <SelectItem value="0.7">0.7 (Средне-высокий)</SelectItem>
                      <SelectItem value="0.6">0.6 (Средний)</SelectItem>
                      <SelectItem value="0.5">0.5 (Низкий)</SelectItem>
                      <SelectItem value="0.4">0.4 (Очень низкий)</SelectItem>
                      <SelectItem value="0.3">0.3 (Минимальный)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Частота обновления
                  </label>
                  <Select
                    value={newChangeFreq}
                    onValueChange={setNewChangeFreq}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Частота обновления" />
                    </SelectTrigger>
                    <SelectContent>
                      {changeFreqOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">&nbsp;</label>
                  <Button
                    onClick={handleAddRoute}
                    disabled={isUpdatingRoutes || !newRoute.trim()}
                    className="flex items-center gap-2 w-full"
                  >
                    <Plus className="w-4 h-4" />
                    Добавить
                  </Button>
                </div>
              </div>

              {/* Routes list */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Текущие пути:</h4>
                {staticRoutesData?.routes?.map((routeItem, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-muted rounded-lg items-center"
                  >
                    {editingRoute === routeItem.route ? (
                      <>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Путь</label>
                          <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyPress={(e) =>
                              e.key === "Enter" && handleSaveEdit()
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Приоритет
                          </label>
                          <Select
                            value={editPriority}
                            onValueChange={setEditPriority}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1.0">
                                1.0 (Максимальный)
                              </SelectItem>
                              <SelectItem value="0.9">
                                0.9 (Очень высокий)
                              </SelectItem>
                              <SelectItem value="0.8">0.8 (Высокий)</SelectItem>
                              <SelectItem value="0.7">
                                0.7 (Средне-высокий)
                              </SelectItem>
                              <SelectItem value="0.6">0.6 (Средний)</SelectItem>
                              <SelectItem value="0.5">0.5 (Низкий)</SelectItem>
                              <SelectItem value="0.4">
                                0.4 (Очень низкий)
                              </SelectItem>
                              <SelectItem value="0.3">
                                0.3 (Минимальный)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Частота обновления
                          </label>
                          <Select
                            value={editChangeFreq}
                            onValueChange={setEditChangeFreq}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {changeFreqOptions.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">&nbsp;</label>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={handleSaveEdit}
                              disabled={isUpdatingRoutes}
                            >
                              <Save className="w-4 h-4" />
                              Сохранить
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleCancelEdit}
                            >
                              Отмена
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="font-mono text-sm">
                          {routeItem.route === ""
                            ? "/ (главная)"
                            : routeItem.route}
                        </span>
                        <span className="text-sm">
                          Приоритет: {routeItem.priority}
                        </span>
                        <span className="text-sm">
                          {changeFreqOptions.find(
                            (opt) => opt.value === routeItem.changeFreq
                          )?.label || routeItem.changeFreq}
                        </span>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStartEdit(routeItem)}
                            disabled={isUpdatingRoutes}
                          >
                            Изменить
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRemoveRoute(routeItem.route)}
                            disabled={isUpdatingRoutes}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
