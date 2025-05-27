// Utility function to sanitize input and prevent XSS
export default function sanitizeInput(input: string | null): string {
  if (!input) return "";

  return (
    input
      // Remove HTML tags
      .replace(/<\/?[^>]+(>|$)/g, "")
      // Remove dangerous protocols
      .replace(/(javascript|data|vbscript|file|about|blob):/gi, "")
      // Remove event handlers
      .replace(/on\w+=/gi, "")
      // Remove HTML entities
      .replace(/&[a-z0-9]+;/gi, "")
      // Remove Unicode-based attacks
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
      // Remove CSS-based attacks
      .replace(/expression\s*\(/gi, "")
      .replace(/url\s*\(/gi, "")
      // Remove common XSS vectors
      .replace(/document\./gi, "")
      .replace(/window\./gi, "")
      .replace(/eval\s*\(/gi, "")
      .replace(/setTimeout\s*\(/gi, "")
      .replace(/setInterval\s*\(/gi, "")
      // Trim whitespace
      .trim()
  );
}
