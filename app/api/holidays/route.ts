import { NextResponse } from 'next/server';
import { getHolidaysByDate, getAllHolidays } from '@/lib/calendar';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get('month');
    const day = searchParams.get('day');

    try {
        let holidays;
        if (month && day) {
            holidays = await getHolidaysByDate(parseInt(month), parseInt(day));
        } else {
            holidays = await getAllHolidays();
        }
        return NextResponse.json(holidays);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}