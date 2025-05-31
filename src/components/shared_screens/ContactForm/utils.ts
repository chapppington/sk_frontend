export const sanitizeFileName = (fileName: string): string => {
  // Remove any potentially dangerous characters and limit length
  return fileName.replace(/[^a-zA-Z0-9.-]/g, "").slice(0, 100);
};

export const formatPhoneNumber = (value: string): string => {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, "");

  // If no digits, return empty string
  if (digits.length === 0) {
    return "";
  }

  // Use the digits typed by the user for formatting after +7
  // If the user started with 7, we can potentially skip that 7
  const digitsToFormat = digits.startsWith("7") ? digits.slice(1) : digits;

  // If the first digit the user effectively typed is '8', just show +7
  if (digitsToFormat.length > 0 && digitsToFormat[0] === "8") {
    return "+7";
  }

  // Limit to 10 digits for the rest of the number (after +7)
  const remainingDigits = digitsToFormat.slice(0, 10);

  // Start with '+7'
  let formattedNumber = "+7";

  // Apply the mask: (XXX) XXX-XX-XX
  if (remainingDigits.length > 0) {
    formattedNumber += ` (${remainingDigits.slice(0, 3)}`;
    if (remainingDigits.length > 3) {
      formattedNumber += `) ${remainingDigits.slice(3, 6)}`;
      if (remainingDigits.length > 6) {
        formattedNumber += `-${remainingDigits.slice(6, 8)}`;
        if (remainingDigits.length > 8) {
          formattedNumber += `-${remainingDigits.slice(8, 10)}`;
        }
      }
    }
  }

  return formattedNumber;
};
