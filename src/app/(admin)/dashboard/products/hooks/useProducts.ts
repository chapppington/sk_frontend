import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import productService from "@/services/product.service";
import portfolioService from "@/services/portfolio.service";
import sitemapService from "@/services/sitemap.service";
import { IProduct, CreateProductData } from "@/shared/types/product.types";
import { IPortfolioItem } from "@/shared/types/portfolio.types";

interface UseProductsOptions {
  onSuccess?: () => void;
  onReset?: () => void;
}

export const useProducts = (options?: UseProductsOptions) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Запрос всех продуктов для админ панели (включая скрытые)
  const {
    data: products = [],
    isLoading: isLoadingProducts,
    error: productsError,
  } = useQuery({
    queryKey: ["products-admin"],
    queryFn: async () => {
      const { data } = await productService.fetchAllForAdmin();
      return data;
    },
  });

  // Запрос всех проектов портфолио
  const {
    data: portfolioItems = [],
    isLoading: isLoadingPortfolio,
    error: portfolioError,
  } = useQuery({
    queryKey: ["portfolio"],
    queryFn: async () => {
      const { data } = await portfolioService.fetchAll();
      return data;
    },
  });

  // Мутация создания продукта
  const createMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return productService.create(formData);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["products-admin"] });
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

      // Вызываем callback функции
      options?.onSuccess?.();
      options?.onReset?.();
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось создать товар",
        variant: "destructive",
      });
    },
  });

  // Мутация обновления продукта
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) =>
      productService.update(id, data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["products-admin"] });
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

      // Вызываем callback функции
      options?.onSuccess?.();
      options?.onReset?.();
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить товар",
        variant: "destructive",
      });
    },
  });

  // Мутация удаления продукта
  const deleteMutation = useMutation({
    mutationFn: (id: string) => productService.delete(id),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["products-admin"] });
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

  // Мутация массового импорта товаров
  const importMutation = useMutation({
    mutationFn: async (products: CreateProductData[]) => {
      return productService.importFromExcel(products);
    },
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["products-admin"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });

      // Regenerate sitemap after importing products
      try {
        await sitemapService.regenerateSitemap();
      } catch (error) {
        console.error("Failed to regenerate sitemap:", error);
      }

      // Показываем детальную информацию о результате импорта
      const { created = 0, updated = 0 } = data.data || {};
      let description = "Товары успешно импортированы";

      if (created > 0 && updated > 0) {
        description = `Создано ${created} новых товаров, обновлено ${updated} существующих товаров`;
      } else if (created > 0) {
        description = `Создано ${created} новых товаров`;
      } else if (updated > 0) {
        description = `Обновлено ${updated} существующих товаров`;
      }

      toast({
        title: "Успех",
        description,
      });

      // Вызываем callback функции
      options?.onSuccess?.();
      options?.onReset?.();
    },
    onError: (error: any) => {
      toast({
        title: "Ошибка",
        description:
          error?.response?.data?.message || "Не удалось импортировать товары",
        variant: "destructive",
      });
    },
  });

  // Мутация массового обновления порядка товаров
  const updateOrderMutation = useMutation({
    mutationFn: (order: { id: string; order: number }[]) =>
      productService.updateOrder(order),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products-admin"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Успех",
        description: "Порядок товаров успешно обновлён",
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить порядок товаров",
        variant: "destructive",
      });
    },
  });

  return {
    // Данные
    products,
    portfolioItems,

    // Состояния загрузки
    isLoadingProducts,
    isLoadingPortfolio,

    // Ошибки
    productsError,
    portfolioError,

    // Мутации
    createMutation,
    updateMutation,
    deleteMutation,
    importMutation,
    updateOrderMutation,

    // Утилиты
    queryClient,
  };
};
