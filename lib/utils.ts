import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function onChangeMoney(value: string) {
  let cleanValue = value.replace(/\D/g, "");
  let formattedValue = (Number(cleanValue) / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
  return formattedValue;
}