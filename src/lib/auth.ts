import { SessionUser, UserRole } from "@/types";
import {ROUTES} from '@/lib/constants/routes'


export const SESSION_KEY = 'funtush_session';
export const SESSION_COOKIE = 'funtush_session';



export const ROLE_REDIRECT: Record<UserRole,string> ={
    agency_admin: ROUTES.AGENCY.DASHBOARD,
    moderator: ROUTES.AGENCY.DASHBOARD,
    trekker: ROUTES.TREKKER.MY_TREKS,
};


export function saveSession(user: SessionUser): void {
    if (typeof window === 'undefined')return;
    localStorage.setItem(SESSION_KEY,JSON.stringify(user));
}

export function getSession(): SessionUser | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SessionUser;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function clearSession(): void {
    if (typeof window === 'undefined')  return ;
    localStorage.removeItem(SESSION_KEY);
}


export function saveSessionCookie(user: SessionUser): void {
    if (typeof window === 'undefined') return;

    const encoded = encodeURIComponent(JSON.stringify(user));
        document.cookie = `${SESSION_COOKIE}=${encoded}; path=/; max-age=86400; SameSite=Lax`;
}

export function clearSessionCookie(): void {
  if (typeof window === 'undefined') return;
  document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0`;
}



export function saveSessionEverywhere(user: SessionUser): void {
  saveSession(user);
  saveSessionCookie(user);
}


export function clearSessionEverywhere(): void {
  clearSession();
  clearSessionCookie();
}


export function isAuthenticated(): boolean {
    return getSession() !== null;
}