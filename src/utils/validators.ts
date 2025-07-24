export function isValidPhone(input: string): boolean {
  return /^\d{10}$/.test(input);
}
export function isValidEmail(input: string): boolean {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input);
}