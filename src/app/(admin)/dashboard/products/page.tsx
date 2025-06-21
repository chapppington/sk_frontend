"use client";

import { useState } from "react";
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
import { Pencil, Trash2, Plus } from "lucide-react";
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

const productCategories = [
  {
    value: "commercial_metering_and_sectionalizing_points",
    label:
      "Пункты коммерческого учёта и секционирования воздушных линий электропередач",
  },
  {
    value: "complete_transformer_substations",
    label: "Комплектные трансформаторные подстанции",
  },
  {
    value: "complete_switchgears",
    label: "Комплектные распределительные устройства",
  },
  {
    value: "low_voltage_complete_devices",
    label: "Низковольтные комплектные устройства",
  },
  {
    value: "power_quality_improvement",
    label: "Улучшение качества электроэнергии",
  },
  {
    value: "power_plants_and_installations",
    label: "Электростанции и установки",
  },
];

const categoryLabelMap = new Map(
  productCategories.map((cat) => [cat.value, cat.label])
);

export default function ProductManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const [deletePopoverOpen, setDeletePopoverOpen] = useState<string | null>(
    null
  );
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<
    CreateProductData & { advantageImages: File[] }
  >({
    category: "",
    name: "",
    description: "",
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
    advantageImages: [],
  });

  const { data: products = [], isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await productService.fetchAll();
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return productService.create(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
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
      advantageImages: [],
    });
    setEditingProduct(null);
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
    formDataToSend.append("advantages", JSON.stringify(formData.advantages));
    formDataToSend.append(
      "simpleDescription",
      JSON.stringify(formData.simpleDescription)
    );
    formDataToSend.append(
      "detailedDescription",
      JSON.stringify(formData.detailedDescription)
    );

    // Добавляем файлы из отдельных инпутов преимуществ
    formData.advantageImages.forEach((file, index) => {
      if (file) {
        formDataToSend.append("advantageImages", file);
      }
    });

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
      category: product.category,
      name: product.name,
      description: product.description,
      importantCharacteristics: product.importantCharacteristics,
      advantages: product.advantages,
      simpleDescription: product.simpleDescription,
      detailedDescription: product.detailedDescription,
      advantageImages: [],
    });
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const updateImportantCharacteristic = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...formData.importantCharacteristics];
    if (field === "unit") {
      updated[index] = { ...updated[index], unit: { text: value } };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setFormData({ ...formData, importantCharacteristics: updated });
  };

  const updateAdvantage = (index: number, field: string, value: string) => {
    const updated = [...formData.advantages];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, advantages: updated });
  };

  const updateSimpleDescription = (index: number, value: string) => {
    const updated = [...formData.simpleDescription.items];
    updated[index] = { text: value };
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
    const updated = [...formData.detailedDescription.items];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({
      ...formData,
      detailedDescription: { items: updated },
    });
  };

  if (isLoadingProducts) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Управление товарами</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew}>
              <Plus className="w-4 h-4 mr-2" />
              Добавить товар
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl h-[90vh] p-0">
            <DialogHeader className="px-6 pt-6">
              <DialogTitle>
                {editingProduct ? "Редактировать товар" : "Создать товар"}
              </DialogTitle>
            </DialogHeader>
            <div
              className="h-[calc(90vh-80px)] overflow-y-auto px-6 pb-6"
              onWheel={(e) => {
                e.stopPropagation();
                const container = e.currentTarget;
                const delta = e.deltaY;
                container.scrollTop += delta;
              }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category" className="block mb-2">
                      Категория
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
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
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
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
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label className="text-lg font-semibold">
                    Важные характеристики
                  </Label>
                  <div className="space-y-6">
                    {formData.importantCharacteristics.map((char, index) => (
                      <div
                        key={index}
                        className="p-6 border rounded-lg bg-gray-50/50"
                      >
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium">
                            Характеристика {index + 1}
                          </h4>
                          {formData.importantCharacteristics.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const updated = [
                                  ...formData.importantCharacteristics,
                                ];
                                updated.splice(index, 1);
                                setFormData({
                                  ...formData,
                                  importantCharacteristics: updated,
                                });
                              }}
                            >
                              Удалить
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label className="block mb-2">Значение</Label>
                            <Input
                              placeholder="Значение"
                              value={char.value}
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
                              value={char.unit?.text || ""}
                              onChange={(e) =>
                                updateImportantCharacteristic(
                                  index,
                                  "unit",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <Label className="block mb-2">Описание</Label>
                            <Input
                              placeholder="Описание"
                              value={char.description}
                              onChange={(e) =>
                                updateImportantCharacteristic(
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    {formData.importantCharacteristics.length < 3 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          const updated = [
                            ...formData.importantCharacteristics,
                          ];
                          updated.push({
                            value: "",
                            unit: { text: "" },
                            description: "",
                          });
                          setFormData({
                            ...formData,
                            importantCharacteristics: updated,
                          });
                        }}
                      >
                        + Добавить характеристику
                      </Button>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-lg font-semibold">Преимущества</Label>
                  <div className="space-y-6">
                    {formData.advantages.map((advantage, index) => (
                      <div
                        key={index}
                        className="p-6 border rounded-lg bg-gray-50/50"
                      >
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium">
                            Преимущество {index + 1}
                          </h4>
                          {formData.advantages.length > 3 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const updated = [...formData.advantages];
                                updated.splice(index, 1);
                                setFormData({
                                  ...formData,
                                  advantages: updated,
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
                              value={advantage.label}
                              onChange={(e) =>
                                updateAdvantage(index, "label", e.target.value)
                              }
                            />
                          </div>
                          <div>
                            <Label className="block mb-2">Иконка</Label>
                            <Input
                              placeholder="Путь к иконке"
                              value={advantage.icon}
                              onChange={(e) =>
                                updateAdvantage(index, "icon", e.target.value)
                              }
                            />
                          </div>
                          <div className="col-span-2">
                            <Label className="block mb-2">Изображение</Label>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const updated = [...formData.advantages];
                                  updated[index] = {
                                    ...updated[index],
                                    image: file.name,
                                  };
                                  setFormData({
                                    ...formData,
                                    advantages: updated,
                                  });

                                  // Добавляем файл в advantageImages
                                  const updatedImages = [
                                    ...formData.advantageImages,
                                  ];
                                  updatedImages[index] = file;
                                  setFormData({
                                    ...formData,
                                    advantages: updated,
                                    advantageImages: updatedImages,
                                  });
                                }
                              }}
                            />
                            {advantage.image && (
                              <div className="mt-2 relative">
                                <img
                                  src={
                                    formData.advantageImages[index]
                                      ? URL.createObjectURL(
                                          formData.advantageImages[index]
                                        )
                                      : editingProduct?.advantageImageUrls?.[
                                          index
                                        ] || advantage.image
                                  }
                                  alt={`Advantage ${index + 1}`}
                                  className="w-32 aspect-[16/9] object-cover rounded"
                                />
                                {formData.advantageImages[index] && (
                                  <span className="absolute top-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                                    Новое
                                  </span>
                                )}
                                {editingProduct?.advantageImageUrls?.[index] &&
                                  !formData.advantageImages[index] && (
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
                              value={advantage.description}
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
                    ))}
                    {formData.advantages.length < 5 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          const updated = [...formData.advantages];
                          updated.push({
                            label: "",
                            icon: "",
                            image: "",
                            description: "",
                          });
                          setFormData({ ...formData, advantages: updated });
                        }}
                      >
                        + Добавить преимущество
                      </Button>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-lg font-semibold block mb-4">
                    Простое описание
                  </Label>
                  <div className="space-y-2">
                    {formData.simpleDescription.items.map((item, index) => (
                      <Textarea
                        key={index}
                        placeholder={`Пункт ${index + 1}`}
                        value={item.text}
                        onChange={(e) =>
                          updateSimpleDescription(index, e.target.value)
                        }
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-lg font-semibold">
                    Детальное описание
                  </Label>
                  <div className="space-y-6">
                    {formData.detailedDescription.items.map((item, index) => (
                      <div
                        key={index}
                        className="p-6 border rounded-lg bg-gray-50/50"
                      >
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium">Пункт {index + 1}</h4>
                          {formData.detailedDescription.items.length > 4 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const updated = [
                                  ...formData.detailedDescription.items,
                                ];
                                updated.splice(index, 1);
                                setFormData({
                                  ...formData,
                                  detailedDescription: { items: updated },
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
                              value={item.title}
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
                              value={item.description}
                              onChange={(e) =>
                                updateDetailedDescription(
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    {formData.detailedDescription.items.length < 10 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          const updated = [
                            ...formData.detailedDescription.items,
                          ];
                          updated.push({
                            title: "",
                            description: "",
                          });
                          setFormData({
                            ...formData,
                            detailedDescription: { items: updated },
                          });
                        }}
                      >
                        + Добавить пункт
                      </Button>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Отмена
                  </Button>
                  <Button
                    type="submit"
                    disabled={
                      createMutation.isPending || updateMutation.isPending
                    }
                  >
                    {editingProduct ? "Обновить" : "Создать"}
                  </Button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Название</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead>Описание</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingProducts ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Загрузка...
                </TableCell>
              </TableRow>
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Нет товаров
                </TableCell>
              </TableRow>
            ) : (
              products.map((product: IProduct) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    {categoryLabelMap.get(product.category) || product.category}
                  </TableCell>
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
