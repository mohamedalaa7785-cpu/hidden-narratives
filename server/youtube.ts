/**
 * YouTube API Integration
 * Fetches channel videos and metadata
 */

import axios from "axios";

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  viewCount?: number;
  likeCount?: number;
}

/**
 * Fetch videos from YouTube channel
 * Requires: YOUTUBE_API_KEY and YOUTUBE_CHANNEL_ID environment variables
 */
export async function getChannelVideos(maxResults: number = 12): Promise<YouTubeVideo[]> {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;

    if (!apiKey || !channelId) {
      console.warn("YouTube API key or channel ID not configured");
      return getPlaceholderVideos();
    }

    // Get uploads playlist ID
    const channelResponse = await axios.get(`${YOUTUBE_API_BASE}/channels`, {
      params: {
        part: "contentDetails",
        id: channelId,
        key: apiKey,
      },
    });

    const uploadsPlaylistId = channelResponse.data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    if (!uploadsPlaylistId) {
      return getPlaceholderVideos();
    }

    // Get videos from uploads playlist
    const videosResponse = await axios.get(`${YOUTUBE_API_BASE}/playlistItems`, {
      params: {
        part: "snippet",
        playlistId: uploadsPlaylistId,
        maxResults,
        key: apiKey,
      },
    });

    return videosResponse.data.items?.map((item: any) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
      publishedAt: item.snippet.publishedAt,
    })) || getPlaceholderVideos();
  } catch (error) {
    console.error("Failed to fetch YouTube videos:", error);
    return getPlaceholderVideos();
  }
}

/**
 * Get video statistics (views, likes)
 */
export async function getVideoStats(videoId: string): Promise<{ viewCount: number; likeCount: number } | null> {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) return null;

    const response = await axios.get(`${YOUTUBE_API_BASE}/videos`, {
      params: {
        part: "statistics",
        id: videoId,
        key: apiKey,
      },
    });

    const stats = response.data.items?.[0]?.statistics;
    if (stats) {
      return {
        viewCount: parseInt(stats.viewCount, 10) || 0,
        likeCount: parseInt(stats.likeCount, 10) || 0,
      };
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch video stats:", error);
    return null;
  }
}

/**
 * Get placeholder videos for development/fallback
 */
function getPlaceholderVideos(): YouTubeVideo[] {
  return [
    {
      id: "dQw4w9WgXcQ",
      title: "Hidden Narratives - Episode 1",
      description: "Deep historical analysis of ancient civilizations",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
      publishedAt: new Date().toISOString(),
      viewCount: 1000,
      likeCount: 50,
    },
    {
      id: "jNQXAC9IVRw",
      title: "Hidden Narratives - Episode 2",
      description: "Exploring lost power structures",
      thumbnail: "https://img.youtube.com/vi/jNQXAC9IVRw/hqdefault.jpg",
      publishedAt: new Date(Date.now() - 86400000).toISOString(),
      viewCount: 800,
      likeCount: 40,
    },
  ];
}

/**
 * Format video URL for embedding
 */
export function getEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}

/**
 * Format video URL for watch page
 */
export function getWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}
