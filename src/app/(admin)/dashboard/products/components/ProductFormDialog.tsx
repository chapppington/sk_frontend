"use client";

import { useState, useMemo, useEffect, Fragment, useCallback } from "react";
import { Button } from "@/components/ui/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/shadcn/dialog";
import { Input } from "@/components/ui/shadcn/input";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { IProduct, CreateProductData } from "@/shared/types/product.types";
import { Label } from "@/components/ui/shadcn/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";
import { IPortfolioItem } from "@/shared/types/portfolio.types";
import { Check as CheckIcon, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/shadcn/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";
import IconPicker from "@/components/ui/IconPicker";
import Image from "next/image";
import { productCategories } from "@/shared/utils/categoryMapping";
import { useProducts } from "../hooks/useProducts";
import { UPLOADS_URL } from "@/constants";

const steps = [
  {
    id: 1,
    title: "Основная информация",
    description: "Название, категория, описание",
  },
  { id: 2, title: "3D Модель", description: "Загрузка 3D модели" },
  {
    id: 3,
    title: "Характеристики",
    description: "Важные характеристики товара",
  },
  { id: 4, title: "Преимущества", description: "Преимущества и особенности" },
  { id: 5, title: "Описания", description: "Простое и детальное описание" },
  { id: 6, title: "Портфолио", description: "Связанные проекты" },
];

interface ProductFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  editingProduct?: IProduct | null;
  portfolioItems: IPortfolioItem[];
}

export default function ProductFormDialog({
  isOpen,
  onClose,
  editingProduct,
  portfolioItems,
}: ProductFormDialogProps) {
  const [model3dFile, setModel3dFile] = useState<File | null>(null);
  const [previewImageFile, setPreviewImageFile] = useState<File | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<
    CreateProductData & {
      portfolioItems: string[];
      // Флаги для отслеживания удаленных фотографий
      clearPreviewImage: boolean;
      clearAdvantageImages: boolean[];
      clearModel3d: boolean;
    }
  >({
    category: "",
    name: "",
    description: "",
    previewImage: "",
    previewImageAlt: "",
    importantCharacteristics: [
      {
        value: "",
        unit: { text: "" },
        description: "",
      },
    ],
    advantages: [
      {
        label: "",
        icon: "",
        image: "",
        alt: "",
        description: "",
      },
      {
        label: "",
        icon: "",
        image: "",
        alt: "",
        description: "",
      },
      {
        label: "",
        icon: "",
        image: "",
        alt: "",
        description: "",
      },
    ],
    simpleDescription: {
      items: [{ text: "" }, { text: "" }, { text: "" }],
    },
    detailedDescription: {
      items: [
        { title: "", description: "" },
        { title: "", description: "" },
        { title: "", description: "" },
        { title: "", description: "" },
      ],
    },
    portfolioItems: [],
    clearPreviewImage: false,
    clearAdvantageImages: [false, false, false, false, false],
    clearModel3d: false,
  });

  const resetForm = useCallback(() => {
    setFormData({
      category: "",
      name: "",
      description: "",
      previewImage: "",
      previewImageAlt: "",
      importantCharacteristics: [
        { value: "", unit: { text: "" }, description: "" },
      ],
      advantages: [
        { label: "", icon: "", image: "", alt: "", description: "" },
        { label: "", icon: "", image: "", alt: "", description: "" },
        { label: "", icon: "", image: "", alt: "", description: "" },
      ],
      simpleDescription: {
        items: [{ text: "" }, { text: "" }, { text: "" }],
      },
      detailedDescription: {
        items: [
          { title: "", description: "" },
          { title: "", description: "" },
          { title: "", description: "" },
          { title: "", description: "" },
        ],
      },
      portfolioItems: [],
      clearPreviewImage: false,
      clearAdvantageImages: [false, false, false, false, false],
      clearModel3d: false,
    });
    setModel3dFile(null);
    setPreviewImageFile(null);
    setCurrentStep(1);
  }, []);

  // Используем кастомный хук
  const { createMutation, updateMutation } = useProducts({
    onSuccess: onClose,
    onReset: resetForm,
  });

  // Memoized URL for preview image to prevent unnecessary re-renders
  const previewImageUrl = useMemo(() => {
    return previewImageFile ? URL.createObjectURL(previewImageFile) : null;
  }, [previewImageFile]);

  // Cleanup object URL when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (previewImageUrl) {
        URL.revokeObjectURL(previewImageUrl);
      }
    };
  }, [previewImageUrl]);

  // Заполняем форму данными редактируемого продукта
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        category: editingProduct.category || "",
        name: editingProduct.name || "",
        description: editingProduct.description || "",
        previewImage: editingProduct.previewImage || "",
        previewImageAlt: editingProduct.previewImageAlt || "",
        importantCharacteristics: (
          editingProduct.importantCharacteristics || []
        )
          .filter(Boolean)
          .map((char) => ({
            value: char.value || "",
            unit: { text: char.unit?.text || "" },
            description: char.description || "",
          })) || [{ value: "", unit: { text: "" }, description: "" }],
        advantages: (editingProduct.advantages || [])
          .filter(Boolean)
          .map((adv) => ({
            label: adv.label || "",
            icon: adv.icon || "",
            image: adv.image || "",
            alt: adv.alt || "",
            description: adv.description || "",
          })) || [
          { label: "", icon: "", image: "", alt: "", description: "" },
          { label: "", icon: "", image: "", alt: "", description: "" },
          { label: "", icon: "", image: "", alt: "", description: "" },
        ],
        simpleDescription: {
          items: [
            ...((editingProduct.simpleDescription?.items || [])
              .filter(Boolean)
              .map((item) => ({
                text: item.text || "",
              })) || []),
            ...Array(
              Math.max(
                0,
                3 - (editingProduct.simpleDescription?.items?.length || 0)
              )
            ).fill({ text: "" }),
          ],
        },
        detailedDescription: {
          items: (editingProduct.detailedDescription?.items || [])
            .filter(Boolean)
            .map((item) => ({
              title: item.title || "",
              description: item.description || "",
            })) || [
            { title: "", description: "" },
            { title: "", description: "" },
            { title: "", description: "" },
            { title: "", description: "" },
          ],
        },
        portfolioItems:
          (editingProduct.portfolioItems || []).map(
            (item: IPortfolioItem) => item.id
          ) || [],
        clearPreviewImage: false,
        clearAdvantageImages: new Array(5).fill(false),
        clearModel3d: false,
      });
      setModel3dFile(null);
      setPreviewImageFile(null);
      setCurrentStep(1);
    } else {
      resetForm();
    }
  }, [editingProduct, resetForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("category", formData.category);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    if (formData.previewImageAlt) {
      formDataToSend.append("previewImageAlt", formData.previewImageAlt);
    }
    formDataToSend.append(
      "importantCharacteristics",
      JSON.stringify(formData.importantCharacteristics)
    );

    // Обрабатываем advantages - извлекаем файлы и сохраняем имена
    const processedAdvantages = formData.advantages.map((advantage, index) => {
      if (advantage.image instanceof File) {
        // Если это файл, добавляем его в FormData с индексом
        formDataToSend.append(`advantageImages_${index}`, advantage.image);
        return {
          ...advantage,
          image: `__FILE_${index}__`, // Временно сохраняем маркер файла
        };
      }
      return advantage;
    });

    formDataToSend.append("advantages", JSON.stringify(processedAdvantages));
    formDataToSend.append(
      "simpleDescription",
      JSON.stringify(formData.simpleDescription)
    );
    formDataToSend.append(
      "detailedDescription",
      JSON.stringify(formData.detailedDescription)
    );
    formDataToSend.append(
      "portfolioItems",
      JSON.stringify(formData.portfolioItems)
    );

    // Добавляем превью изображение
    if (previewImageFile) {
      formDataToSend.append("previewImage", previewImageFile);
    }

    // Добавляем 3D модель
    if (model3dFile) {
      formDataToSend.append("model_3d", model3dFile);
    }

    // Обработка флагов удаления (только для редактирования)
    if (editingProduct) {
      if (formData.clearPreviewImage) {
        formDataToSend.append("clearPreviewImage", "true");
      }
      if (formData.clearModel3d) {
        formDataToSend.append("clearModel3d", "true");
      }

      // Для advantageImages отправляем массив индексов для удаления
      const clearIndexes = formData.clearAdvantageImages
        .map((shouldClear, index) => (shouldClear ? index : -1))
        .filter((index) => index !== -1);

      if (clearIndexes.length > 0) {
        formDataToSend.append(
          "clearAdvantageImageIndex",
          JSON.stringify(clearIndexes)
        );
      }
    }

    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct.id, data: formDataToSend });
    } else {
      createMutation.mutate(formDataToSend);
    }
  };

  // Функции для удаления фотографий
  const clearPreviewImage = () => {
    setFormData((prev) => ({
      ...prev,
      clearPreviewImage: true,
      previewImage: "",
    }));
    setPreviewImageFile(null);
  };

  const clearAdvantageImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      clearAdvantageImages: prev.clearAdvantageImages.map((clear, i) =>
        i === index ? true : clear
      ),
      advantages: prev.advantages.map((advantage, i) =>
        i === index ? { ...advantage, image: "" } : advantage
      ),
    }));
  };

  const clearModel3d = () => {
    setFormData((prev) => ({
      ...prev,
      clearModel3d: true,
      model_3d_url: "",
    }));
    setModel3dFile(null);
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateImportantCharacteristic = (
    index: number,
    field: string,
    value: string
  ) => {
    // Ensure importantCharacteristics array exists and filter out any undefined values
    const currentCharacteristics = (
      formData.importantCharacteristics || []
    ).filter(Boolean);
    const updated = [...currentCharacteristics];

    // Ensure the characteristic object at this index exists
    if (!updated[index]) {
      updated[index] = {
        value: "",
        unit: { text: "" },
        description: "",
      };
    }

    if (field === "unit") {
      updated[index] = {
        ...updated[index],
        unit: { text: value || "" },
      };
    } else {
      updated[index] = {
        ...updated[index],
        [field]: value || "",
      };
    }
    setFormData({ ...formData, importantCharacteristics: updated });
  };

  const updateAdvantage = (index: number, field: string, value: string) => {
    // Ensure advantages array exists and filter out any undefined values
    const currentAdvantages = (formData.advantages || []).filter(Boolean);
    const updated = [...currentAdvantages];

    // Ensure the advantage object at this index exists
    if (!updated[index]) {
      updated[index] = {
        label: "",
        icon: "",
        image: "",
        alt: "",
        description: "",
      };
    }

    updated[index] = {
      ...updated[index],
      [field]: value || "",
    };
    setFormData({ ...formData, advantages: updated });
  };

  const updateSimpleDescription = (index: number, value: string) => {
    // Ensure simpleDescription.items array exists and filter out any undefined values
    const currentItems = (formData.simpleDescription?.items || []).filter(
      Boolean
    );
    const updated = [...currentItems];

    // Ensure the item at this index exists
    if (!updated[index]) {
      updated[index] = { text: "" };
    }

    updated[index] = { text: value || "" };
    setFormData({
      ...formData,
      simpleDescription: { items: updated },
    });
  };

  const updateDetailedDescription = (
    index: number,
    field: string,
    value: string
  ) => {
    // Ensure detailedDescription.items array exists and filter out any undefined values
    const currentItems = (formData.detailedDescription?.items || []).filter(
      Boolean
    );
    const updated = [...currentItems];

    // Ensure the item at this index exists
    if (!updated[index]) {
      updated[index] = { title: "", description: "" };
    }

    updated[index] = {
      ...updated[index],
      [field]: value || "",
    };
    setFormData({
      ...formData,
      detailedDescription: { items: updated },
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6" onWheel={(e) => e.stopPropagation()}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category" className="block mb-2">
                  Категория
                </Label>
                <Select
                  value={formData.category || ""}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value || "" })
                  }
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    {productCategories
                      .filter((cat) => cat.slug !== "all")
                      .map((cat) => (
                        <SelectItem key={cat.slug} value={cat.slug}>
                          {cat.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="name" className="block mb-2">
                  Название
                </Label>
                <Input
                  id="name"
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value || "" })
                  }
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="block mb-2">
                Описание
              </Label>
              <Textarea
                id="description"
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value || "",
                  })
                }
                required
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="previewImage" className="block mb-2">
                Превью изображение
              </Label>
              <Input
                id="previewImage"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files) {
                    setPreviewImageFile(e.target.files[0]);
                    setFormData((prev) => ({
                      ...prev,
                      clearPreviewImage: false,
                    }));
                  }
                }}
                required={!editingProduct}
              />
              {editingProduct?.previewImageUrl &&
                !previewImageFile &&
                !formData.clearPreviewImage && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground mb-2">
                      Текущее изображение:
                    </p>
                    <div className="relative w-32 h-32 group">
                      <Image
                        src={`${UPLOADS_URL}${editingProduct.previewImageUrl}`}
                        alt="Current preview image"
                        fill
                        className="object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={clearPreviewImage}
                        className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}
              {previewImageFile && (
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground mb-2">
                    Новое изображение:
                  </p>
                  <div className="relative w-32 h-32">
                    <Image
                      src={previewImageUrl!}
                      alt="New preview image"
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="previewImageAlt" className="block mb-2">
                Alt описание для превью изображения
              </Label>
              <Input
                id="previewImageAlt"
                placeholder="Введите описание изображения для поисковых систем"
                value={formData.previewImageAlt || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    previewImageAlt: e.target.value || "",
                  })
                }
              />
              <p className="text-xs text-muted-foreground mt-1">
                Описание изображения для улучшения SEO и доступности
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6" onWheel={(e) => e.stopPropagation()}>
            <div>
              <Label htmlFor="model_3d" className="block mb-2">
                3D Модель (.glb)
              </Label>
              <Input
                id="model_3d"
                type="file"
                accept=".glb"
                onChange={(e) => {
                  if (e.target.files) {
                    setModel3dFile(e.target.files[0]);
                    setFormData((prev) => ({
                      ...prev,
                      clearModel3d: false,
                    }));
                  }
                }}
              />
              {editingProduct?.model_3d_url &&
                !model3dFile &&
                !formData.clearModel3d && (
                  <div className="mt-2 text-sm text-gray-500 flex items-center gap-2">
                    <span>
                      Текущая модель:{" "}
                      {editingProduct.model_3d_url.split("/").pop()}
                    </span>
                    <button
                      type="button"
                      onClick={clearModel3d}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                )}
              {model3dFile && (
                <div className="mt-2 text-sm text-green-600">
                  Новая модель: {model3dFile.name}
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6" onWheel={(e) => e.stopPropagation()}>
            <div className="space-y-4">
              {(formData.importantCharacteristics || [])
                .filter(Boolean)
                .map((char, index) => {
                  // Ensure characteristic object exists and has all required properties
                  const safeChar = {
                    value: char?.value || "",
                    unit: { text: char?.unit?.text || "" },
                    description: char?.description || "",
                  };

                  return (
                    <div key={index} className="p-6 border-2 rounded-lg">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium">
                          Характеристика {index + 1}
                        </h4>
                        {(formData.importantCharacteristics || []).filter(
                          Boolean
                        ).length > 1 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              const currentChars = (
                                formData.importantCharacteristics || []
                              ).filter(Boolean);
                              const updated = [...currentChars];
                              updated.splice(index, 1);
                              // Ensure no undefined values remain
                              const cleanUpdated = updated.filter(Boolean);
                              setFormData({
                                ...formData,
                                importantCharacteristics: cleanUpdated,
                              });
                            }}
                          >
                            Удалить
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label className="block mb-2">Описание</Label>
                          <Input
                            placeholder="Описание"
                            value={safeChar.description}
                            onChange={(e) =>
                              updateImportantCharacteristic(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <Label className="block mb-2">Значение</Label>
                          <Input
                            placeholder="Значение"
                            value={safeChar.value}
                            onChange={(e) =>
                              updateImportantCharacteristic(
                                index,
                                "value",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <Label className="block mb-2">
                            Единица измерения
                          </Label>
                          <Input
                            placeholder="Единица измерения"
                            value={safeChar.unit.text}
                            onChange={(e) =>
                              updateImportantCharacteristic(
                                index,
                                "unit",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              {(formData.importantCharacteristics || []).filter(Boolean)
                .length < 3 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const currentChars = (
                      formData.importantCharacteristics || []
                    ).filter(Boolean);
                    const updated = [...currentChars];
                    updated.push({
                      value: "",
                      unit: { text: "" },
                      description: "",
                    });
                    // Ensure no undefined values remain
                    const cleanUpdated = updated.filter(Boolean);
                    setFormData({
                      ...formData,
                      importantCharacteristics: cleanUpdated,
                    });
                  }}
                >
                  + Добавить характеристику
                </Button>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6" onWheel={(e) => e.stopPropagation()}>
            <div className="space-y-4">
              {(formData.advantages || [])
                .filter(Boolean)
                .map((advantage, index) => {
                  // Ensure advantage object exists and has all required properties
                  const safeAdvantage = {
                    label: advantage?.label || "",
                    icon: advantage?.icon || "",
                    image: advantage?.image || "",
                    alt: advantage?.alt || "",
                    description: advantage?.description || "",
                  };

                  return (
                    <div key={index} className="p-6 border-2 rounded-lg">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium">
                          Преимущество {index + 1}
                        </h4>
                        {(formData.advantages || []).filter(Boolean).length >
                          3 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              const updatedAdvantages = [
                                ...(formData.advantages || []),
                              ];
                              updatedAdvantages.splice(index, 1);

                              setFormData({
                                ...formData,
                                advantages: updatedAdvantages,
                              });
                            }}
                          >
                            Удалить
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="block mb-2">Название</Label>
                          <Input
                            placeholder="Название преимущества"
                            value={safeAdvantage.label}
                            onChange={(e) =>
                              updateAdvantage(index, "label", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <Label className="block mb-2">Иконка</Label>
                          <IconPicker
                            value={safeAdvantage.icon}
                            onChange={(value) =>
                              updateAdvantage(index, "icon", value)
                            }
                          />
                        </div>
                        <div className="col-span-2">
                          <Label className="block mb-2">Изображение</Label>
                          <Input
                            type="file"
                            accept="image/*"
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                // Создаем копии текущих массивов, чтобы не изменять состояние напрямую
                                const updatedAdvantages = [
                                  ...(formData.advantages || []),
                                ];

                                // Обновляем файл в массиве преимуществ
                                updatedAdvantages[index] = {
                                  ...updatedAdvantages[index],
                                  image: file,
                                };

                                setFormData({
                                  ...formData,
                                  advantages: updatedAdvantages,
                                  clearAdvantageImages:
                                    formData.clearAdvantageImages.map(
                                      (clear, i) =>
                                        i === index ? false : clear
                                    ),
                                });
                              }
                            }}
                          />
                          {safeAdvantage.image && (
                            <div className="mt-2 relative w-32 aspect-[16/9] rounded-md overflow-hidden group">
                              {typeof safeAdvantage.image === "object" ? (
                                <Image
                                  src={URL.createObjectURL(safeAdvantage.image)}
                                  alt={`Новое преимущество ${index + 1}`}
                                  fill
                                  className="object-cover"
                                />
                              ) : editingProduct?.advantages?.[index]?.image &&
                                !formData.clearAdvantageImages[index] ? (
                                <Image
                                  src={`${UPLOADS_URL}/uploads/products/${editingProduct.advantages[index].image}`}
                                  alt={`Текущее преимущество ${index + 1}`}
                                  fill
                                  className="object-cover"
                                />
                              ) : null}

                              {typeof safeAdvantage.image === "object" && (
                                <span className="absolute top-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                                  Новое
                                </span>
                              )}
                              {editingProduct?.advantages?.[index]?.image &&
                                typeof safeAdvantage.image === "string" &&
                                !formData.clearAdvantageImages[index] && (
                                  <span className="absolute top-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                                    Текущее
                                  </span>
                                )}
                              {editingProduct?.advantages?.[index]?.image &&
                                typeof safeAdvantage.image === "string" &&
                                !formData.clearAdvantageImages[index] && (
                                  <button
                                    type="button"
                                    onClick={() => clearAdvantageImage(index)}
                                    className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                  >
                                    ×
                                  </button>
                                )}
                            </div>
                          )}
                        </div>
                        <div className="col-span-2">
                          <Label>Alt описание для изображения</Label>
                          <Input
                            placeholder="Введите описание изображения для поисковых систем"
                            value={safeAdvantage.alt || ""}
                            onChange={(e) =>
                              updateAdvantage(index, "alt", e.target.value)
                            }
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Описание изображения для улучшения SEO и доступности
                          </p>
                        </div>
                        <div className="col-span-2">
                          <Label>Описание</Label>
                          <Textarea
                            placeholder="Описание преимущества"
                            value={safeAdvantage.description}
                            onChange={(e) =>
                              updateAdvantage(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              {(formData.advantages || []).filter(Boolean).length < 5 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const updatedAdvantages = [
                      ...(formData.advantages || []).filter(Boolean),
                    ];
                    updatedAdvantages.push({
                      label: "",
                      icon: "",
                      image: "",
                      description: "",
                    });

                    setFormData({
                      ...formData,
                      advantages: updatedAdvantages,
                    });
                  }}
                >
                  + Добавить преимущество
                </Button>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8" onWheel={(e) => e.stopPropagation()}>
            <div>
              <Label className="text-lg font-semibold block mb-4">
                Простое описание
              </Label>
              <div className="space-y-3">
                {(formData.simpleDescription?.items || []).map(
                  (item, index) => {
                    const safeItem = {
                      text: item?.text || "",
                    };
                    return (
                      <div key={index} className="flex gap-2">
                        <div className="flex-shrink-0 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <Textarea
                          placeholder={`Пункт ${index + 1}`}
                          value={safeItem.text}
                          onChange={(e) =>
                            updateSimpleDescription(index, e.target.value)
                          }
                          rows={2}
                        />
                      </div>
                    );
                  }
                )}
              </div>
            </div>

            <div>
              <Label className="text-lg font-semibold block mb-4">
                Детальное описание
              </Label>
              <div className="space-y-4">
                {(formData.detailedDescription?.items || []).map(
                  (item, index) => {
                    const safeItem = {
                      title: item?.title || "",
                      description: item?.description || "",
                    };
                    return (
                      <div key={index} className="p-6 border-2 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium">Пункт {index + 1}</h4>
                          {(formData.detailedDescription?.items || []).length >
                            4 && (
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                const currentItems = (
                                  formData.detailedDescription?.items || []
                                ).filter(Boolean);
                                const updated = [...currentItems];
                                updated.splice(index, 1);
                                // Ensure no undefined values remain
                                const cleanUpdated = updated.filter(Boolean);
                                setFormData({
                                  ...formData,
                                  detailedDescription: { items: cleanUpdated },
                                });
                              }}
                            >
                              Удалить
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="block mb-2">Заголовок</Label>
                            <Input
                              placeholder="Заголовок"
                              value={safeItem.title}
                              onChange={(e) =>
                                updateDetailedDescription(
                                  index,
                                  "title",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <Label className="block mb-2">Описание</Label>
                            <Textarea
                              placeholder="Описание"
                              value={safeItem.description}
                              onChange={(e) =>
                                updateDetailedDescription(
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
                {(formData.detailedDescription?.items || []).length < 10 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const currentItems = (
                        formData.detailedDescription?.items || []
                      ).filter(Boolean);
                      const updated = [...currentItems];
                      updated.push({
                        title: "",
                        description: "",
                      });
                      // Ensure no undefined values remain
                      const cleanUpdated = updated.filter(Boolean);
                      setFormData({
                        ...formData,
                        detailedDescription: { items: cleanUpdated },
                      });
                    }}
                  >
                    + Добавить пункт
                  </Button>
                )}
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6" onWheel={(e) => e.stopPropagation()}>
            <div>
              <Label className="block mb-2">Связанные проекты портфолио</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                  >
                    <span className="truncate">
                      {formData.portfolioItems.length > 0
                        ? `Выбрано: ${formData.portfolioItems.length}`
                        : "Выберите проекты..."}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                  <Command>
                    <CommandInput placeholder="Поиск проектов..." />
                    <CommandEmpty>Ничего не найдено.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-y-auto">
                      {portfolioItems.map((item: IPortfolioItem) => (
                        <CommandItem
                          key={item.id}
                          value={item.name}
                          onSelect={() => {
                            const selected = formData.portfolioItems.includes(
                              item.id
                            );
                            setFormData((prev) => ({
                              ...prev,
                              portfolioItems: selected
                                ? prev.portfolioItems.filter(
                                    (id) => id !== item.id
                                  )
                                : [...prev.portfolioItems, item.id],
                            }));
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              formData.portfolioItems.includes(item.id)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {item.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              {formData.portfolioItems.length > 0 && (
                <div className="mt-4">
                  <Label>Выбранные проекты</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.portfolioItems.map((itemId) => {
                      const item = portfolioItems.find(
                        (p: IPortfolioItem) => p.id === itemId
                      );
                      if (!item) return null;
                      return (
                        <div
                          key={item.id}
                          className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-sm"
                        >
                          <span>{item.name}</span>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                portfolioItems: prev.portfolioItems.filter(
                                  (id) => id !== item.id
                                ),
                              }));
                            }}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          >
                            &times;
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 flex flex-col">
        <DialogHeader className="px-6 pt-6 flex-shrink-0">
          <DialogTitle>
            {editingProduct ? "Редактировать товар" : "Создать товар"}
          </DialogTitle>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="px-6 py-4 border-b flex-shrink-0">
          <div className="flex items-center w-full mb-4">
            {steps.map((step, index) => (
              <Fragment key={step.id}>
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 flex-shrink-0 transition-colors duration-200 relative group",
                    currentStep > step.id
                      ? "bg-green-500 border-green-500 text-white"
                      : currentStep === step.id
                      ? "bg-blue-500 border-blue-500 text-white cursor-default"
                      : "bg-gray-100 border-gray-300 text-gray-500 hover:border-gray-400"
                  )}
                  disabled={currentStep === step.id}
                >
                  {currentStep > step.id ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    step.id
                  )}
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    {step.title}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                  </div>
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-0.5 mx-2 transition-colors duration-200",
                      currentStep > step.id ? "bg-green-500" : "bg-gray-300"
                    )}
                  />
                )}
              </Fragment>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <h3 className="font-medium text-lg">
                {steps[currentStep - 1].title}
              </h3>
              <p className="text-sm text-gray-500">
                {steps[currentStep - 1].description}
              </p>
            </div>

            {/* Navigation buttons in upper section */}
            <div className="flex gap-2 ml-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Назад
              </Button>

              {currentStep < steps.length ? (
                <Button type="button" size="sm" onClick={nextStep}>
                  Далее
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  size="sm"
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                  onClick={handleSubmit}
                >
                  {editingProduct ? "Обновить" : "Создать"}
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <form
            key={`step-${currentStep}`}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {renderStepContent()}
          </form>
        </div>

        {/* Bottom action buttons */}
        <div className="px-6 py-4 border-t flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Отмена
          </Button>

          {editingProduct && (
            <Button
              type="submit"
              disabled={updateMutation.isPending}
              onClick={handleSubmit}
            >
              Завершить обновление
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
