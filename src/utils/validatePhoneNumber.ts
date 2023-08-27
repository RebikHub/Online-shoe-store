export function validatePhoneNumber(phoneNumber: string) {
  const regex = /^(8|(\+7))?\s?\d{3}\s?\d{3}\s?\d{2}\s?\d{2}$/;
  return regex.test(phoneNumber);
}