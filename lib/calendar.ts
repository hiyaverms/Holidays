const API_KEY = process.env.CALENDARIFIC_API_KEY;
const BASE_URL = 'https://calendarific.com/api/v2/holidays';

export async function getHolidaysByDate(month: number, day: number) {
    const year = new Date().getFullYear();
    const url = `${BASE_URL}?api_key=${API_KEY}&country=US&year=${year}&month=${month}&day=${day}`;
    
    const res = await fetch(url);
    const data = await res.json();
    
    if (data.meta.code !== 200) throw new Error(data.meta.error_detail || "API Error");
    return data.response.holidays;
}

export async function getAllHolidays() {
    const year = new Date().getFullYear();
    const url = `${BASE_URL}?api_key=${API_KEY}&country=US&year=${year}`;
    
    const res = await fetch(url);
    const data = await res.json();
    
    if (data.meta.code !== 200) throw new Error(data.meta.error_detail || "API Error");
    return data.response.holidays;
}