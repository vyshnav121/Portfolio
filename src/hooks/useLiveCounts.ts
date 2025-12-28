import { useState, useEffect } from 'react';
import type { PortfolioItem } from '../types';

interface LiveCounts {
  views: number;
  likes: number;
}

// Extract Instagram reel ID from URL
const extractInstagramReelId = (url: string): string | null => {
  const match = url.match(/\/reel\/([^/?]+)/);
  return match ? match[1] : null;
};

// Fetch live counts from API (you can replace this with your actual API endpoint)
const fetchLiveCounts = async (item: PortfolioItem): Promise<LiveCounts | null> => {
  try {
    // For Instagram reels, extract the reel ID
    if (item.platform === 'instagram' && item.videoUrl) {
      const reelId = extractInstagramReelId(item.videoUrl);
      if (reelId) {
        // Replace with your actual API endpoint
        // Example: const response = await fetch(`/api/instagram/${reelId}`);
        // return await response.json();
        
        // For now, simulate API call with incremental updates
        // In production, replace this with actual API call
        return simulateLiveCounts(item);
      }
    }
    
    // For other platforms, you can add similar logic
    return simulateLiveCounts(item);
  } catch (error) {
    console.error('Error fetching live counts:', error);
    return null;
  }
};

// Simulate live counts with incremental updates
const simulateLiveCounts = (item: PortfolioItem): LiveCounts => {
  // Add random increment to simulate live updates
  const viewsIncrement = Math.floor(Math.random() * 100) + 10;
  const likesIncrement = Math.floor(Math.random() * 5) + 1;
  
  return {
    views: (item.views || 0) + viewsIncrement,
    likes: (item.likes || 0) + likesIncrement,
  };
};

export const useLiveCounts = (item: PortfolioItem, updateInterval: number = 30000) => {
  const [counts, setCounts] = useState<LiveCounts>({
    views: item.views || 0,
    likes: item.likes || 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Skip if item is invalid (dummy item)
    if (!item.id || item.id === '') {
      return;
    }

    // Initial fetch
    const updateCounts = async () => {
      setIsLoading(true);
      const newCounts = await fetchLiveCounts(item);
      if (newCounts) {
        setCounts(newCounts);
        // Update the original item's counts (for persistence)
        if (item.views !== undefined) item.views = newCounts.views;
        if (item.likes !== undefined) item.likes = newCounts.likes;
      }
      setIsLoading(false);
    };

    // Update immediately
    updateCounts();

    // Set up polling interval
    const interval = setInterval(updateCounts, updateInterval);

    return () => clearInterval(interval);
  }, [item.id, item.videoUrl, updateInterval]);

  return { counts, isLoading };
};

