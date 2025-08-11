"use client";

import { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/shadcn/dialog";
import { Button } from "@/components/ui/shadcn/button";
import { Slider } from "@/components/ui/shadcn/slider";

async function createImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

async function getCroppedFile(
  imageSrc: string,
  cropAreaPixels: Area,
  outputWidth: number,
  outputHeight: number,
  filename: string,
  mimeType: string
): Promise<File> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context not available");

  canvas.width = outputWidth;
  canvas.height = outputHeight;

  // Draw cropped region scaled into the target size
  ctx.drawImage(
    image,
    cropAreaPixels.x,
    cropAreaPixels.y,
    cropAreaPixels.width,
    cropAreaPixels.height,
    0,
    0,
    outputWidth,
    outputHeight
  );

  const blob: Blob = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b as Blob), mimeType || "image/jpeg", 0.92)
  );
  return new File([blob], filename, { type: blob.type });
}

type ImageCropperDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageSrc: string;
  aspect: number; // width / height
  outputWidth: number;
  outputHeight: number;
  filename: string;
  mimeType: string;
  onCropped: (file: File) => void;
};

export default function ImageCropperDialog({
  open,
  onOpenChange,
  imageSrc,
  aspect,
  outputWidth,
  outputHeight,
  filename,
  mimeType,
  onCropped,
}: ImageCropperDialogProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return;
    const file = await getCroppedFile(
      imageSrc,
      croppedAreaPixels,
      outputWidth,
      outputHeight,
      filename,
      mimeType
    );
    onCropped(file);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Кадрировать изображение</DialogTitle>
        </DialogHeader>
        <div className="h-[60vh] relative bg-muted rounded-md overflow-hidden">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            objectFit="contain"
          />
        </div>
        <div className="px-2 pt-4">
          <div className="flex items-center gap-4">
            <span className="w-16 text-sm text-muted-foreground">Зум</span>
            <div className="flex-1">
              <Slider
                value={[zoom]}
                onValueChange={(v) => setZoom(v[0])}
                min={1}
                max={3}
                step={0.01}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button onClick={handleConfirm}>Применить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
