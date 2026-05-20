export const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())

export const isStrongEnoughPassword = (value) => value.trim().length >= 6
