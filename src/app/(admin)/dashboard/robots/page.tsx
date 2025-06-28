"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import robotsService from "@/services/robots.service";
import { MiniLoader } from "@/components/ui/MiniLoader";
import { Save, Eye } from "lucide-react";

export default function RobotsEditor() {
  const [content, setContent] = useState("");
  const { toast } = useToast();

  // Fetch current robots.txt content
  const { data: robotsData, isLoading } = useQuery({
    queryKey: ["robots-content"],
    queryFn: () => robotsService.getRobotsContent(),
  });

  // Update content when data is loaded
  useEffect(() => {
    if (robotsData?.success && robotsData.content) {
      setContent(robotsData.content);
    }
  }, [robotsData]);

  // Save robots.txt mutation
  const { mutate: saveRobots, isPending: isSaving } = useMutation({
    mutationFn: (content: string) => robotsService.updateRobotsContent(content),
    onSuccess: (result) => {
      if (result.success) {
        toast({
          title: "Успех",
          description: "Robots.txt успешно обновлен",
        });
      } else {
        toast({
          title: "Ошибка",
          description: result.message || "Не удалось обновить robots.txt",
          variant: "destructive",
        });
      }
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить robots.txt",
        variant: "destructive",
      });
    },
  });

  const handleSave = () => {
    saveRobots(content);
  };

  const handlePreview = () => {
    window.open("/robots.txt", "_blank");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <MiniLoader width={100} height={100} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Содержимое robots.txt</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handlePreview}
              className="flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Просмотреть
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2"
            >
              {isSaving ? <MiniLoader /> : <Save className="w-4 h-4" />}
              Сохранить
            </Button>
          </div>
        </div>

        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Введите содержимое robots.txt..."
          className="min-h-[400px] font-mono text-sm"
        />
      </div>
    </div>
  );
}
