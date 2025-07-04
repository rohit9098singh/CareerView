import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const extractSalaryMin = (salaryRange: string) => {
  const parts = salaryRange.split('-');
  return parseInt(parts[0].replace(/[^\d]/g, '')) || 0;
};

export const extractSalaryMax = (salaryRange: string) => {
  const parts = salaryRange.split('-');
  return parseInt(parts[1]?.replace(/[^\d]/g, '')) || 0;
};


export const  formatDateInDDMMYYY = (date:string) =>{
  return new Date(date).toLocaleDateString('en-GB')
}