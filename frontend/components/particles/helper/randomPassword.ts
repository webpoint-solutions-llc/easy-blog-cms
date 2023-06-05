/**
 * It takes a number as an argument and returns a string of that length.
 * @param {number} length - The length of the password you want to generate.
 * @returns A string of random characters.
 */
export function generatePassword(length: number) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{};:,.<>?';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return `@A${password}a1`;
}
