"use client";

import { useState, useMemo, useEffect, Fragment } from "react";
import { Button } from "@/components/ui/shadcn/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/shadcn/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";
import { Input } from "@/components/ui/shadcn/input";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Pencil,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import productService from "@/services/product.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
import portfolioService from "@/services/portfolio.service";
import { Check as CheckIcon, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/shadcn/command";
import IconPicker from "@/components/ui/IconPicker";
import { BACKEND_MAIN } from "@/constants";
import Image from "next/image";
import {
  productCategories,
  getCategoryLabel,
} from "@/shared/utils/categoryMapping";
import sitemapService from "@/services/sitemap.service";

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

export default function ProductManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const [model3dFile, setModel3dFile] = useState<File | null>(null);
  const [previewImageFile, setPreviewImageFile] = useState<File | null>(null);
  const [deletePopoverOpen, setDeletePopoverOpen] = useState<string | null>(
    null
  );
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<
    CreateProductData & { portfolioItems: string[] }
  >({
    category: "",
    name: "",
    description: "",
    previewImage: "",
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
        description: "",
      },
      {
        label: "",
        icon: "",
        image: "",
        description: "",
      },
      {
        label: "",
        icon: "",
        image: "",
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

  const { data: products = [], isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await productService.fetchAll();
      return data;
    },
  });

  const { data: portfolioItems = [], isLoading: isLoadingPortfolio } = useQuery(
    {
      queryKey: ["portfolio"],
      queryFn: async () => {
        const { data } = await portfolioService.fetchAll();
        return data;
      },
    }
  );

  const createMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return productService.create(formData);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });

      // Regenerate sitemap after creating product
      try {
        await sitemapService.regenerateSitemap();
      } catch (error) {
        console.error("Failed to regenerate sitemap:", error);
      }

      toast({
        title: "Успех",
        description: "Товар успешно создан",
      });
      setIsDialogOpen(false);
      resetForm();
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось создать товар",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) =>
      productService.update(id, data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });

      // Regenerate sitemap after updating product
      try {
        await sitemapService.regenerateSitemap();
      } catch (error) {
        console.error("Failed to regenerate sitemap:", error);
      }

      toast({
        title: "Успех",
        description: "Товар успешно обновлен",
      });
      setIsDialogOpen(false);
      resetForm();
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить товар",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => productService.delete(id),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });

      // Regenerate sitemap after deleting product
      try {
        await sitemapService.regenerateSitemap();
      } catch (error) {
        console.error("Failed to regenerate sitemap:", error);
      }

      toast({
        title: "Успех",
        description: "Товар успешно удален",
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить товар",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      category: "",
      name: "",
      description: "",
      previewImage: "",
      importantCharacteristics: [
        { value: "", unit: { text: "" }, description: "" },
      ],
      advantages: [
        { label: "", icon: "", image: "", description: "" },
        { label: "", icon: "", image: "", description: "" },
        { label: "", icon: "", image: "", description: "" },
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
    });
    setEditingProduct(null);
    setModel3dFile(null);
    setPreviewImageFile(null);
    setCurrentStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("category", formData.category);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
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

    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct.id, data: formDataToSend });
    } else {
      createMutation.mutate(formDataToSend);
    }
  };

  const handleDelete = async (id: string) => {
    deleteMutation.mutate(id);
    setDeletePopoverOpen(null);
  };

  const handleEdit = (product: IProduct) => {
    setEditingProduct(product);
    setFormData({
      category: product.category || "",
      name: product.name || "",
      description: product.description || "",
      previewImage: product.previewImage || "",
      importantCharacteristics: (product.importantCharacteristics || [])
        .filter(Boolean)
        .map((char) => ({
          value: char.value || "",
          unit: { text: char.unit?.text || "" },
          description: char.description || "",
        })) || [{ value: "", unit: { text: "" }, description: "" }],
      advantages: (product.advantages || []).filter(Boolean).map((adv) => ({
        label: adv.label || "",
        icon: adv.icon || "",
        image: adv.image || "",
        description: adv.description || "",
      })) || [
        { label: "", icon: "", image: "", description: "" },
        { label: "", icon: "", image: "", description: "" },
        { label: "", icon: "", image: "", description: "" },
      ],
      simpleDescription: {
        items: (product.simpleDescription?.items || [])
          .filter(Boolean)
          .map((item) => ({
            text: item.text || "",
          })) || [{ text: "" }, { text: "" }, { text: "" }],
      },
      detailedDescription: {
        items: (product.detailedDescription?.items || [])
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
        (product.portfolioItems || []).map((item: IPortfolioItem) => item.id) ||
        [],
    });
    setModel3dFile(null);
    setPreviewImageFile(null);
    setCurrentStep(1);
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    resetForm();
    setIsDialogOpen(true);
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
                    {productCategories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
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
                  }
                }}
                required={!editingProduct}
              />
              {editingProduct?.previewImageUrl && !previewImageFile && (
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground mb-2">
                    Текущее изображение:
                  </p>
                  <div className="relative w-32 h-32">
                    <Image
                      src={`${BACKEND_MAIN}${editingProduct.previewImageUrl}`}
                      alt="Current preview image"
                      fill
                      className="object-cover rounded-md"
                    />
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
                  }
                }}
              />
              {editingProduct?.model_3d_url && !model3dFile && (
                <div className="mt-2 text-sm text-gray-500">
                  Текущая модель: {editingProduct.model_3d_url.split("/").pop()}
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
                                });
                              }
                            }}
                          />
                          {safeAdvantage.image && (
                            <div className="mt-2 relative w-32 aspect-[16/9] rounded-md overflow-hidden">
                              {typeof safeAdvantage.image === "object" ? (
                                <Image
                                  src={URL.createObjectURL(safeAdvantage.image)}
                                  alt={`Новое преимущество ${index + 1}`}
                                  fill
                                  className="object-cover"
                                />
                              ) : editingProduct?.advantages?.[index]?.image ? (
                                <Image
                                  src={`${BACKEND_MAIN}/uploads/products/${editingProduct.advantages[index].image}`}
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
                                typeof safeAdvantage.image === "string" && (
                                  <span className="absolute top-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                                    Текущее
                                  </span>
                                )}
                            </div>
                          )}
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

  if (isLoadingProducts || isLoadingPortfolio) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew}>
              <Plus className="w-4 h-4 mr-2" />
              Добавить товар
            </Button>
          </DialogTrigger>
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
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
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
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Превью</TableHead>
              <TableHead>Название</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead>Описание</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingProducts ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Загрузка...
                </TableCell>
              </TableRow>
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Нет товаров
                </TableCell>
              </TableRow>
            ) : (
              products.map((product: IProduct) => (
                <TableRow key={product.id}>
                  <TableCell>
                    {product.previewImageUrl ? (
                      <div className="w-16 h-16 rounded-lg overflow-hidden border relative">
                        <Image
                          src={`${BACKEND_MAIN}${product.previewImageUrl}`}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center border">
                        <span className="text-xs text-gray-500">Нет фото</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{getCategoryLabel(product.category)}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {product.description.length > 100
                      ? product.description.slice(0, 100) + "..."
                      : product.description}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(product)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Popover
                        open={deletePopoverOpen === product.id}
                        onOpenChange={(open) =>
                          setDeletePopoverOpen(open ? product.id : null)
                        }
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="space-y-4">
                            <p className="text-sm">
                              Вы уверены, что хотите удалить этот товар?
                            </p>
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setDeletePopoverOpen(null)}
                              >
                                Отмена
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDelete(product.id)}
                                disabled={deleteMutation.isPending}
                              >
                                {deleteMutation.isPending
                                  ? "Удаление..."
                                  : "Удалить"}
                              </Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
