import { createServerFn } from "@tanstack/react-start";

// Handle del canal de YouTube de Niños Perdidos. Cámbialo aquí si difiere.
const CHANNEL_HANDLE = "@ninosperdidos.rock";

export type YTVideo = {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
};

async function resolveChannelId(handle: string, key: string): Promise<string | null> {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(handle)}&maxResults=1&key=${key}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = (await res.json()) as { items?: { snippet?: { channelId?: string } }[] };
  return data.items?.[0]?.snippet?.channelId ?? null;
}

export const getYoutubeVideos = createServerFn({ method: "GET" }).handler(async () => {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) {
    return {
      videos: [] as YTVideo[],
      channelUrl: `https://www.youtube.com/${CHANNEL_HANDLE}`,
      error: "YOUTUBE_API_KEY no está configurada",
    };
  }
  try {
    const channelId = await resolveChannelId(CHANNEL_HANDLE, key);
    if (!channelId) {
      return {
        videos: [] as YTVideo[],
        channelUrl: `https://www.youtube.com/${CHANNEL_HANDLE}`,
        error: "Canal no encontrado",
      };
    }
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=8&key=${key}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`YouTube API ${res.status}`);
    const data = (await res.json()) as {
      items?: {
        id: { videoId?: string };
        snippet: { title: string; publishedAt: string; thumbnails: { high?: { url: string }; medium?: { url: string } } };
      }[];
    };
    const videos: YTVideo[] = (data.items ?? [])
      .filter((v) => v.id.videoId)
      .map((v) => ({
        id: v.id.videoId as string,
        title: v.snippet.title,
        thumbnail: v.snippet.thumbnails.high?.url ?? v.snippet.thumbnails.medium?.url ?? "",
        publishedAt: v.snippet.publishedAt,
      }));
    return {
      videos,
      channelUrl: `https://www.youtube.com/channel/${channelId}`,
      error: null as string | null,
    };
  } catch (err) {
    return {
      videos: [] as YTVideo[],
      channelUrl: `https://www.youtube.com/${CHANNEL_HANDLE}`,
      error: err instanceof Error ? err.message : "Error desconocido",
    };
  }
});
