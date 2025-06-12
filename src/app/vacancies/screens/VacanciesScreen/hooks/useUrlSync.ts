import { useCallback } from "react";
import { useSearchParams, usePathname } from "next/navigation";

interface UseUrlSyncReturn {
  createQueryString: (params: { category?: string; page?: string }) => string;
  updateUrl: (params: { category?: string; page?: string }) => void;
}

export function useUrlSync(): UseUrlSyncReturn {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (params: { category?: string; page?: string }) => {
      const newParams = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        if (value) newParams.set(key, value);
      });
      return newParams.toString();
    },
    [searchParams]
  );

  const updateUrl = useCallback(
    (params: { category?: string; page?: string }) => {
      const newUrl = `${pathname}?${createQueryString(params)}`;
      window.history.pushState({}, "", newUrl);
    },
    [pathname, createQueryString]
  );

  return {
    createQueryString,
    updateUrl,
  };
}
