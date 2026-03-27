'use client';

import { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import HolidayCard from '@/components/HolidayCard';
import { Holiday } from '@/app/interfaces/holiday';

const PageContainer = styled.main`
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid #eee;
  padding-bottom: 1rem;
`;

const SearchSection = styled.section`
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  text-align: center;
`;

const StyledInput = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border: 2px solid #333;
  border-radius: 8px;
  margin-right: 1rem;
  outline: none;

  &:focus {
    border-color: #0070f3;
  }
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: #0070f3;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

export default function DateSearchPage() {
  const [date, setDate] = useState('');
  const [results, setResults] = useState<Holiday[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value; // Format: YYYY-MM-DD
    setDate(selectedDate);
    
    if (!selectedDate) return;

    // Requirement 3: Don't show loading forever
    setLoading(true);
    setError(null);

    try {
      // Split the date string to get month and day for the API call
      const [year, month, day] = selectedDate.split('-');
      
      const response = await fetch(`/api/holidays?month=${parseInt(month)}&day=${parseInt(day)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch holidays');
      }

      setResults(data);
    } catch (err: any) {
      // Requirement 3: Proper error handling
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <Header>
        <h1>📅 Holiday Finder</h1>
        <NavLink href="/list">View All Holidays →</NavLink>
      </Header>

      <SearchSection>
        <h2>Pick a date to see what's being celebrated</h2>
        <StyledInput 
          type="date" 
          value={date} 
          onChange={handleDateChange} 
        />
        {loading && <p>Checking the calendar...</p>}
        {error && <p style={{ color: 'red' }}>⚠️ {error}</p>}
      </SearchSection>

      <Grid>
        {results.length > 0 ? (
          results.map((holiday, index) => (
            <HolidayCard 
              key={index} 
              {...holiday} 
              showDate={true} 
            />
          ))
        ) : (
          !loading && date && <p>No holidays found for this specific date in the US.</p>
        )}
      </Grid>
    </PageContainer>
  );
}