export const sanitizeFileName = (fileName: string): string => {
  // Remove any potentially dangerous characters and limit length
  return fileName.replace(/[^a-zA-Z0-9.-]/g, "").slice(0, 100);
};

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = [".pdf", ".doc", ".docx"];