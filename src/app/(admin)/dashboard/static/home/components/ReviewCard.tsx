"use client";

import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { UPLOADS_URL } from "@/constants";
import { useState } from "react";

interface Review {
  image: string;
  title: string;
  jobTitle: string;
  content_path: string;
}

interface ReviewCardProps {
  review: Review;
  index: number;
  onEdit: (review: Review) => void;
  onDelete: (index: number) => void;
}

export function ReviewCard({
  review,
  index,
  onEdit,
  onDelete,
}: ReviewCardProps) {
  const [deletePopoverOpen, setDeletePopoverOpen] = useState(false);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-3">
        <div className="flex items-center gap-3">
          {review.image && (
            <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
              <Image
                src={`${UPLOADS_URL}/uploads/home-page/${review.image}`}
                alt={review.title}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm truncate mb-1">
              {index + 1}. {review.title}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-1">
              {review.jobTitle || "Должность не указана"}
            </p>
          </div>

          <div className="flex gap-1 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(review)}
              className="h-7 w-7 p-0"
            >
              <Edit className="h-3 w-3" />
            </Button>
            <Popover
              open={deletePopoverOpen}
              onOpenChange={setDeletePopoverOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <p className="text-sm">
                    Вы уверены, что хотите удалить данный отзыв?
                  </p>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeletePopoverOpen(false)}
                    >
                      Отмена
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        onDelete(index);
                        setDeletePopoverOpen(false);
                      }}
                    >
                      Удалить
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
