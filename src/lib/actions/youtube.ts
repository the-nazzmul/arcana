"use server";
import axios from "axios";
const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

export async function GetYTVideos(query: string) {
  const params = {
    part: "snippet",
    q: query,
    maxResults: 1,
    type: "video",
    relevanceLanguage: "en",
    key: process.env.YOUTUBE_API_KEY,
  };
  const res = await axios.get(YOUTUBE_BASE_URL, { params });
  console.log(res.data.items[0].id.videoId);
  return res.data.items[0].id.videoId;
}
