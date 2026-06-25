/**
 * Trek Helpers
 * **/
import type { RawBooking, RawPackage,RawAgency,
    RawGuide,TrekViewModel,TrekTabCategory,RawBookingStatus, } from '@/types/trek';

/**
 * Decide which tab a booking belongs to
 * */


export function getCategoryFromBooking(
    status: RawBookingStatus,
    departureDate:string,
    durationDays:number
): TrekTabCategory {
    if (status === 'completed') return 'completed';
    if (status === 'cancelled' || status === 'refunded' ) return 'cancelled';

    const today = new Date ();
    const departure = new Date(departureDate);
    const tripEnd = new Date(departure);
    tripEnd.setDate(tripEnd.getDate()+ durationDays);

    if(today >= departure && today <= tripEnd) {
        return 'active';
    }

    return 'upcoming';
}

/**
 * Days until departure 
 */


export function getDaysUntilDeparture(departureDate: string ): number {
    const today = new Date();
    today.setHours(0,0,0,0);

    const departure = new Date(departureDate)
    departure.setHours(0,0,0,0);

    const diffMs = departure.getTime() - today.getTime();
    return Math.ceil(diffMs /(1000*60*60*24));
}

//format Countdown


export function formatCountdown(days: number, status: RawBookingStatus) : string {
    if (status === 'completed') return 'Trek Completed ';

    if (status === 'cancelled' || status === 'refunded') return 'Cancelled';

    if (days === 0) return 'Departing today !';
    if (days === 1) return 'Departing tomorrow';
    if (days  < 1 ) return `In ${days} days`;
    if (days  < 0) return `${Math.abs(days)} days ago`;

    return '';
}



/**
 * Build a TrekViewModel by joining all data sources
 */

export function buildTrekViewModel(
    booking: RawBooking,
    packages:RawPackage[],
    agencies:RawAgency[],
    guides:RawGuide[]
): TrekViewModel{ 
     const pkg = packages.find((p) => p.id === booking.package_id);
     const agency = agencies.find((a) => a.id === booking.agency_id);
     const guide = guides.find((g) => g.id === booking.guide_id);

     const category = getCategoryFromBooking(
        booking.status,
        booking.departure_date,
        pkg?.duration_days ?? 0
     );


       return {
    bookingId: booking.id,
    packageId: booking.package_id,
    packageName: pkg?.title ?? 'Unknown Package',
    packageImage: pkg?.images?.[0] ?? '',
    agencyName: agency?.name ?? 'Unknown Agency',
    agencyLogo: agency?.logo ?? '',
    guideName: guide?.name ?? 'Guide TBA',
    guidePhoto: guide?.photo ?? '',
    departureDate: booking.departure_date,
    durationDays: pkg?.duration_days ?? 0,
    groupSize: booking.group_size,
    totalPrice: booking.total_price,
    status: booking.status,
    category,
    daysUntilDeparture: getDaysUntilDeparture(booking.departure_date),
    highlights: pkg?.highlights ?? [],
  };

}
/**
 * Get all treks for a specific user, fully populated
 */


export function getUserTreks(
    userId: string,
    bookings: RawBooking[],
    packages: RawPackage[],
    agencies:RawAgency[],
    guides: RawGuide[]
): TrekViewModel[] {
    return bookings 
    .filter((b) => b.trekker_id === userId)
    .map((b) => buildTrekViewModel(b, packages  , agencies, guides));
}