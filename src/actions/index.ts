import axios from "axios";

const API_BASE_URL = "https://web-production-6b4fb.up.railway.app/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
});

let cachedVideos: any[] | null = null;

const actions = {
  verifyPhoneNumber: async (phoneNumber: string) => {
    try {
      const response = await api.post("/join-requests/check-phone", {
        phone: phoneNumber,
      });
      return response.data;
    } catch (error: any) {
      console.error("Error verifying phone number:", error);
      throw error;
    }
  },

  submitJoinRequest: async (data: any) => {
    try {
      const response = await api.post("/join-requests", data);
      return response;
    } catch (error) {
      console.error("Error submitting join request:", error);
      throw error;
    }
  },

  fetchVideos: async (): Promise<any[]> => {
    if (cachedVideos) return cachedVideos;
    try {
      const response = await api.get("/videos/public");
      cachedVideos = response.data;
      return cachedVideos || [];
    } catch (error) {
      console.error("Error fetching videos:", error);
      return [];
    }
  },

  saveVideo: async (videoId: string) => {
    try {
      const response = await api.post(`/videos/${videoId}/save`);
      return response.data;
    } catch (error) {
      console.error(`Error saving video ${videoId}:`, error);
      throw error;
    }
  },

  shareVideo: async (videoId: string) => {
    try {
      const response = await api.post(`/videos/${videoId}/share`);
      return response.data;
    } catch (error) {
      console.error(`Error sharing video ${videoId}:`, error);
      throw error;
    }
  }
};

export const { verifyPhoneNumber, submitJoinRequest, fetchVideos, saveVideo, shareVideo } = actions;

