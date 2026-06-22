import { SessionUser, UserRole } from "@/types/user"; 
import {ROUTES} from '@/lib/constants/routes'


export const SESSION_KEY = 'funtush_session';

export const ROLE_REDIRECT: Record<UserRole,string> = {
    agency_admin: ROUTES.AGENCY.DASHBOARD,
    moderator: ROUTES.AGENCY.DASHBOARD,
    trekker: ROUTES.TREKKER.MY_TREKS,
};


export function saveSession(user: SessionUser): void {

    if (typeof window === 'undefined') 
        return ;
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function getSession(): SessionUser | null {
    if (typeof window === 'undefined') return null;

    try{
        const raw = localStorage.getItem(SESSION_KEY);
        if (!raw) return null ;
        return JSON.parse(raw) as SessionUser;
    } catch {
        localStorage.removeItem(SESSION_KEY);
        return null;
    }
}


export function clearSession(): void {
    if (typeof window === 'undefined') 
        return;
    localStorage.removeitem(SESSION_KEY);
}

export function isAuthenticated(): boolean{
    return getSession() != null ;
}
