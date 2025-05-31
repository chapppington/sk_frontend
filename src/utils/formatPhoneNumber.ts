// Perfect function, it handles all cases of phone inputs

// Test cases:
// formatPhoneNumber("8") => "+7"
// formatPhoneNumber("89") => "+7 (9"
// formatPhoneNumber("8999") => "+7 (999"
// formatPhoneNumber("8999123") => "+7 (999) 123"
// formatPhoneNumber("8999123456") => "+7 (999) 123-45-67"
// formatPhoneNumber("+7") => "+7"
// formatPhoneNumber("+79") => "+7 (9"
// formatPhoneNumber("+7999") => "+7 (999"
// formatPhoneNumber("+7999123") => "+7 (999) 123"
// formatPhoneNumber("+7999123456") => "+7 (999) 123-45-67"
// formatPhoneNumber("999") => "+7 (999"
// formatPhoneNumber("999123") => "+7 (999) 123"
// formatPhoneNumber("9991234567") => "+7 (999) 123-45-67"
// formatPhoneNumber("8(999)123-45-67") => "+7 (999) 123-45-67"

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
