export default function HolidayDetail({
  searchParams,
}: {
  searchParams: { name: string; desc: string };
}) {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>{searchParams.name}</h1>
      <p>{searchParams.desc || "No description available."}</p>
      <a href="/">← Back to list</a>
    </div>
  );
}