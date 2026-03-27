'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import HolidayCard from '@/components/HolidayCard';
import { Holiday } from '@/app/interfaces/holiday';

const PageContainer = styled.main`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid #333;
  padding-bottom: 1rem;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  color: #0070f3;
  text-decoration: none;
  font-weight: bold;
  border: 1px solid #0070f3;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: all 0.2s;

  &:hover {
    background: #0070f3;
    color: white;
  }
`;

const LoadingText = styled.p`
  text-align: center;
  font-size: 1.2rem;
  margin-top: 3rem;
`;

export default function HolidayListPage() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [revealedIndex, setRevealedIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        const response = await fetch('/api/holidays');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to load holidays');
        }

        setHolidays(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  const handleReveal = (index: number) => {
    setRevealedIndex(revealedIndex === index ? null : index);
  };

  return (
    <PageContainer>
      <Header>
        <h1>🎊 All US Holidays</h1>
        <NavLink href="/">← Back to Search</NavLink>
      </Header>

      <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Click any card to reveal when the holiday takes place!
      </p>

      {loading && <LoadingText>Loading the festivities...</LoadingText>}
      
      {error && (
        <div style={{ color: 'red', textAlign: 'center' }}>
          <h3>Oops!</h3>
          <p>{error}</p>
        </div>
      )}

      <Grid>
        {holidays.map((holiday, index) => (
          <div key={index} onClick={() => handleReveal(index)}>
            <HolidayCard 
              name={holiday.name}
              description={holiday.description}
              date={holiday.date}
              type={holiday.type}
              showDate={revealedIndex === index} 
            />
          </div>
        ))}
      </Grid>
      
      {!loading && holidays.length === 0 && !error && (
        <p style={{ textAlign: 'center' }}>No holidays found.</p>
      )}
    </PageContainer>
  );
}