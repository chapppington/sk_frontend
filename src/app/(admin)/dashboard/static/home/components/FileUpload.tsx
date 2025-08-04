"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { Upload, X } from "lucide-react";
import { instance } from "@/api/axios";
import { BACKEND_MAIN } from "@/constants";

interface FileUploadProps {
  onUpload: (filename: string) => void;
  currentFile?: string;
  accept?: string;
  label?: string;
  className?: string;
}

export function FileUpload({
  onUpload,
  currentFile,
  accept = "image/*",
  label = "Загрузить файл",
  className = "",
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(
    currentFile || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("productImage", file);

      const response = await instance.post(
        "/home-page-config/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const filename = response.data.productImage;
      setUploadedFile(filename);
      onUpload(filename);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setUploadedFile(null);
    onUpload("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-sm font-medium">{label}</label>

      <div className="flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          disabled={isUploading}
        />

        {!uploadedFile ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            {isUploading ? "Загрузка..." : "Выбрать файл"}
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                <img
                  src={`${BACKEND_MAIN}/uploads/home-page/${uploadedFile}`}
                  alt="Uploaded file"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm text-green-600 truncate max-w-32">
                {uploadedFile}
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
