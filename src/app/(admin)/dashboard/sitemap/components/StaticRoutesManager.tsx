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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { Plus, Trash2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const changeFreqOptions = [
  { value: "always", label: "Всегда" },
  { value: "hourly", label: "Ежечасно" },
  { value: "daily", label: "Ежедневно" },
  { value: "weekly", label: "Еженедельно" },
  { value: "monthly", label: "Ежемесячно" },
  { value: "yearly", label: "Ежегодно" },
  { value: "never", label: "Никогда" },
];

interface RouteItem {
  route: string;
  priority: number;
  changeFreq: string;
}

interface StaticRoutesManagerProps {
  staticRoutesData: any;
  isUpdatingRoutes: boolean;
  onUpdateRoutes: (routes: RouteItem[]) => void;
}

export default function StaticRoutesManager({
  staticRoutesData,
  isUpdatingRoutes,
  onUpdateRoutes,
}: StaticRoutesManagerProps) {
  const { toast } = useToast();
  const [newRoute, setNewRoute] = useState("");
  const [newPriority, setNewPriority] = useState("0.5");
  const [newChangeFreq, setNewChangeFreq] = useState("monthly");
  const [editingRoute, setEditingRoute] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [editPriority, setEditPriority] = useState("0.5");
  const [editChangeFreq, setEditChangeFreq] = useState("monthly");

  const handleAddRoute = () => {
    if (!newRoute.trim()) return;

    const currentRoutes = staticRoutesData?.routes || [];
    const routeToAdd = newRoute.startsWith("/") ? newRoute : `/${newRoute}`;

    if (currentRoutes.some((r: RouteItem) => r.route === routeToAdd)) {
      toast({
        title: "Ошибка",
        description: "Такой путь уже существует",
        variant: "destructive",
      });
      return;
    }

    const newRouteItem: RouteItem = {
      route: routeToAdd,
      priority: parseFloat(newPriority),
      changeFreq: newChangeFreq,
    };

    onUpdateRoutes([...currentRoutes, newRouteItem]);

    // Reset form after successful addition
    setNewRoute("");
    setNewPriority("0.5");
    setNewChangeFreq("monthly");
  };

  const handleRemoveRoute = (routeToRemove: string) => {
    const currentRoutes = staticRoutesData?.routes || [];
    const updatedRoutes = currentRoutes.filter(
      (route: RouteItem) => route.route !== routeToRemove
    );
    onUpdateRoutes(updatedRoutes);
  };

  const handleStartEdit = (routeItem: RouteItem) => {
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
      currentRoutes.some((r: RouteItem) => r.route === routeToUpdate)
    ) {
      toast({
        title: "Ошибка",
        description: "Такой путь уже существует",
        variant: "destructive",
      });
      return;
    }

    const updatedRoutes = currentRoutes.map((route: RouteItem) =>
      route.route === editingRoute
        ? {
            route: routeToUpdate,
            priority: parseFloat(editPriority),
            changeFreq: editChangeFreq,
          }
        : route
    );
    onUpdateRoutes(updatedRoutes);
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Управление статичными путями</CardTitle>
        <CardDescription>
          Добавляйте, редактируйте и удаляйте статичные страницы для sitemap с
          настройкой приоритетов
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
                className="bg-background border border-input"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Приоритет</label>
              <Select value={newPriority} onValueChange={setNewPriority}>
                <SelectTrigger className="bg-background border border-input">
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
              <label className="text-sm font-medium">Частота обновления</label>
              <Select value={newChangeFreq} onValueChange={setNewChangeFreq}>
                <SelectTrigger className="bg-background border border-input">
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
            {staticRoutesData?.routes?.map(
              (routeItem: RouteItem, index: number) => (
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
                          className="bg-white dark:bg-black border border-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Приоритет</label>
                        <Select
                          value={editPriority}
                          onValueChange={setEditPriority}
                        >
                          <SelectTrigger className="bg-white dark:bg-black border border-input">
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
                          <SelectTrigger className="bg-white dark:bg-black border border-input">
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
              )
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
