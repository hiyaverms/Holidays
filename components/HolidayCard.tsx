'use client';

import styled from "styled-components";
import { Holiday } from "@/app/interfaces/holiday";

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  border: 2px solid #222;
  margin: 1rem;
  width: 280px;
  min-height: 200px;
  border-radius: 12px;
  background-color: #ffffff;
  /* Neobrutalism style shadow */
  box-shadow: 6px 6px 0px #000; 
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translate(-3px, -3px);
    box-shadow: 9px 9px 0px #000;
    background-color: #fffdf0;
  }

  &:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px #000;
  }
`;

const HolidayName = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  color: #1a1a1a;
`;

const Description = styled.p`
  font-size: 0.85rem;
  color: #555;
  line-height: 1.4;
  margin-bottom: 1rem;
  flex-grow: 1;
`;

const DateBox = styled.div<{ $isRevealed: boolean }>`
  margin-top: auto;
  padding: 0.5rem;
  border-radius: 6px;
  text-align: center;
  background-color: ${props => props.$isRevealed ? '#e0f2fe' : '#f3f4f6'};
  border: 1px dashed ${props => props.$isRevealed ? '#0070f3' : '#999'};
  transition: background-color 0.3s ease;
`;

const DateText = styled.span`
  font-weight: bold;
  font-family: monospace;
  color: #0070f3;
  font-size: 1.1rem;
`;

const PlaceholderText = styled.span`
  color: #888;
  font-size: 0.9rem;
  font-style: italic;
`;

const Tag = styled.span`
  display: inline-block;
  background: #eee;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 0.5rem;
  align-self: flex-start;
`;

// Interface for Props
interface HolidayCardProps extends Holiday {
  showDate: boolean;
}

export default function HolidayCard({ name, description, date, type, showDate }: HolidayCardProps) {
  return (
    <CardWrapper className="holiday-card">
      <div>
        <HolidayName>{name}</HolidayName>
        <Description>
          {description || "No description provided for this holiday."}
        </Description>
      </div>

      <DateBox $isRevealed={showDate}>
        {showDate ? (
          <DateText>{date.iso}</DateText>
        ) : (
          <PlaceholderText>Click to see date</PlaceholderText>
        )}
      </DateBox>

      <Tag>{type[0] || 'Public Holiday'}</Tag>
    </CardWrapper>
  );
}