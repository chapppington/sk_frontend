import { BACKEND_MAIN } from "@/constants";

export async function fetchSeoSettingsSSR(pagePath: string) {
  const backendUrl = BACKEND_MAIN;
  try {
    const res = await fetch(
      `${backendUrl}/api/site-seo-settings/by-path?path=${encodeURIComponent(
        pagePath
      )}`,
      {
        next: { revalidate: 60 },
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
