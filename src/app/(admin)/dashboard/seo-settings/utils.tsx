// Utility functions for SEO settings management

/**
 * Renders description text with support for bold formatting
 * Supports **bold**, <b>bold</b>, and <strong>bold</strong> syntax
 */
export function renderDescription(desc: string) {
  const parts = desc.split(
    /(\*\*[^*]+\*\*|<b>[^<]+<\/b>|<strong>[^<]+<\/strong>)/g
  );
  return parts.map((part, i) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) {
      return (
        <b key={i} className="font-bold text-[#fff]">
          {part.replace(/\*\*/g, "")}
        </b>
      );
    }
    if (/^<b>[^<]+<\/b>$/.test(part)) {
      return (
        <b key={i} className="font-bold text-[#fff]">
          {part.replace(/<\/?b>/g, "")}
        </b>
      );
    }
    if (/^<strong>[^<]+<\/strong>$/.test(part)) {
      return (
        <b key={i} className="font-bold text-[#fff]">
          {part.replace(/<\/?strong>/g, "")}
        </b>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

/**
 * Truncates text with ellipsis if it exceeds the maximum length
 */
export function truncateWithEllipsis(text: string, max: number) {
  return text.length > max ? text.slice(0, max - 1) + "…" : text;
}

/**
 * Creates preview data for SEO settings form
 */
export function getFormPreview(formData: {
  title: string;
  description: string;
  pagePath: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}) {
  const baseUrl =
    process.env.NEXT_PUBLIC_FRONTEND_URL || "https://sibkomplekt.ru";

  return {
    google: {
      title: formData.title,
      description: formData.description,
      url: `${baseUrl}${formData.pagePath}`,
      titleLength: formData.title.length,
      descriptionLength: formData.description.length,
      titleStatus: formData.title.length <= 60 ? "good" : "warning",
      descriptionStatus:
        formData.description.length <= 160 ? "good" : "warning",
    },
    yandex: {
      title: formData.title,
      description: formData.description,
      url: `${baseUrl}${formData.pagePath}`,
      titleLength: formData.title.length,
      descriptionLength: formData.description.length,
      titleStatus: formData.title.length <= 60 ? "good" : "warning",
      descriptionStatus:
        formData.description.length <= 160 ? "good" : "warning",
    },
    og: {
      title: formData.ogTitle || formData.title,
      description: formData.ogDescription || formData.description,
      image: formData.ogImage,
      url: `${baseUrl}${formData.pagePath}`,
    },
  };
}

/**
 * Default form data for creating new SEO settings
 */
export const defaultFormData = {
  pagePath: "",
  pageName: "",
  title: "",
  description: "",
  keywords: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  canonicalUrl: "",
  isActive: true,
} as const;

/**
 * Resets form data to default values
 */
export function resetFormData() {
  return { ...defaultFormData };
}
