import { type StoryProps } from '../data/StoryProps';
import React, { useMemo } from 'react';
import { Link } from "react-router-dom";

function getLatestItem(data: StoryProps[]): StoryProps | null {
  if (data.length === 0) return null;

  return data.reduce((latest, current) => {
    const currentMs = new Date(current.date).getTime();
    const latestMs = new Date(latest.date).getTime();
    
    return currentMs > latestMs ? current : latest;
  });
}

export default function LatestAdventure( { stories }: { stories: StoryProps[] } ): React.JSX.Element{
   const latestItem = useMemo(() => {
    return getLatestItem(stories);
    }, []);

  if (!latestItem) {
    return <p>No travel data available.</p>;
  }
  const formattedDate = new Date(latestItem.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
  return (
    <div className="latest-adventure-container">
      <h1>Latest Adventure</h1>
      <h2>{latestItem.title}</h2>
      <p>{latestItem.description}</p>
      <p className="date">{formattedDate}</p>
      <Link to="/traveling">Read More</Link>
      </div>
    )
}