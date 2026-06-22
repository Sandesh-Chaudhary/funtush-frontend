export type UserRole = 'agency_admin' | 'moderator' | 'trekker'

export interface RawUser{
    id: string;
    role: UserRole ;
    agency_id: string | null;
    name: string;
    email: string;
    password: string;
    phone: string;
    member_since:string;
    country: string;
}


export interface SessionUser {
      id: string;
    role: UserRole ;
    agency_id: string | null;
    name: string;
    email: string;
    password: string;
    phone: string;
    member_since:string;
    token: string;
    country: string;
}