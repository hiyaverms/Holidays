# Holidays
 
A Next.js app for browsing U.S. holidays. You can list every holiday this year, look up holidays for a specific date, and open a detail page for any holiday. The data comes from the [Calendarific API](https://calendarific.com/).
 
🔗 **Live demo:** (https://holidays-dzbf.vercel.app/)
 
## Features
 
- A full list of this year's U.S. holidays
- Search by month and day
- Dynamic detail pages (`/holiday/[id]`)
- Its own API route (`/api/holidays`), so the API key stays on the server
## Tech stack
 
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS
- Calendarific REST API
## Project structure
 
```
app/
├── page.tsx                # home and date search
├── list/page.tsx           # all holidays
├── holiday/[id]/page.tsx   # holiday details
└── api/holidays/route.ts   # server-side proxy to Calendarific
lib/calendar.ts             # API client
components/HolidayCard.tsx
```
 
## Run locally
 
```bash
npm install
echo "CALENDARIFIC_API_KEY=your_key" > .env.local
npm run dev
# open http://localhost:3000
```
 
