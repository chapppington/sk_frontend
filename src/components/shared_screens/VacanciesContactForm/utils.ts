export const sanitizeFileName = (fileName: string): string => {
  // Remove any potentially dangerous characters and limit length
  return fileName.replace(/[^a-zA-Z0-9.-]/g, "").slice(0, 100);
};
