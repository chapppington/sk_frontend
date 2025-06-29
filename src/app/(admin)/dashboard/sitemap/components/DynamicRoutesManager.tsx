import { Checkbox } from "@/components/ui/shadcn/checkbox";
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
import { Badge } from "@/components/ui/shadcn/badge";
import { Settings } from "lucide-react";

const changeFreqOptions = [
  { value: "always", label: "Всегда" },
  { value: "hourly", label: "Ежечасно" },
  { value: "daily", label: "Ежедневно" },
  { value: "weekly", label: "Еженедельно" },
  { value: "monthly", label: "Ежемесячно" },
  { value: "yearly", label: "Ежегодно" },
  { value: "never", label: "Никогда" },
];

interface DynamicRoutesManagerProps {
  dynamicRoutesData: any;
  isUpdatingDynamicRoutes: boolean;
  onToggle: (entityType: string, enabled: boolean) => void;
  onUpdate: (entityType: string, field: string, value: any) => void;
}

export default function DynamicRoutesManager({
  dynamicRoutesData,
  isUpdatingDynamicRoutes,
  onToggle,
  onUpdate,
}: DynamicRoutesManagerProps) {
  return (
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
                <div
                  key={entityType}
                  className={`border rounded-lg p-4 transition-all duration-200 ${
                    config.enabled
                      ? "border-green-200/50 bg-green-500/5 shadow-sm"
                      : "border-border bg-muted/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id={`${entityType}-enabled`}
                        checked={config.enabled}
                        onCheckedChange={(checked) =>
                          onToggle(entityType, checked as boolean)
                        }
                        disabled={isUpdatingDynamicRoutes}
                      />
                      <div className="flex items-center gap-3">
                        <label
                          htmlFor={`${entityType}-enabled`}
                          className="text-sm font-medium cursor-pointer"
                        >
                          {config.description}
                        </label>
                        <Badge
                          variant={config.enabled ? "default" : "secondary"}
                          className={`${
                            config.enabled
                              ? "bg-green-500/10 text-green-700 dark:text-green-400 border-green-200/50"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {config.enabled ? "Активно" : "Неактивно"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {config.enabled && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Приоритет</label>
                        <Select
                          value={config.priority?.toString() || "0.5"}
                          onValueChange={(value) =>
                            onUpdate(entityType, "priority", parseFloat(value))
                          }
                          disabled={isUpdatingDynamicRoutes}
                        >
                          <SelectTrigger className="bg-background border border-input">
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
                          value={config.changeFreq || "monthly"}
                          onValueChange={(value) =>
                            onUpdate(entityType, "changeFreq", value)
                          }
                          disabled={isUpdatingDynamicRoutes}
                        >
                          <SelectTrigger className="bg-background border border-input">
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
  );
}
