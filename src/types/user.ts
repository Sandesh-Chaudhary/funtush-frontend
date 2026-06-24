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


//emergency contact 

export interface EmergencyContact{
    name: string;
    phone: string;
    relationship: string;
}

export type NotificationType = 
  | 'booking_confirmed'
  | 'guide_assigned'
  | 'payment_reminder'
  | 'trek_reminder';


  export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  created_at: string;
  read: boolean;
  link?: string;
  }