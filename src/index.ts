export const sum = (a: number, b: number): number => {
  return a + b;
};

export const difference = (a: number, b: number): number => {
  return Math.abs(a - b);
};

export const product = (a: number, b: number): number => {
  return a * b;
};

export const quotient = (a: number, b: number): number => {
  return a / b;
};

export default {
  sum,
  difference,
  product,
  quotient,
};
