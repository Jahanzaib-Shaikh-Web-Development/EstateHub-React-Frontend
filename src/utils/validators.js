export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
export const isPhone = (v) => /^[+\d][\d\s-]{9,14}$/.test(v.trim())
