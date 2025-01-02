import { type ClassValue, clsx } from 'clsx';
import { deleteCookie } from 'cookies-next';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clearToken() {
  deleteCookie('ascent_u_access_token');
  deleteCookie('ascent_u_refresh_token');
}
