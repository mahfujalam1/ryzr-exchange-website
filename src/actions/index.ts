import axios from "axios";

const API_BASE_URL = "https://web-production-6b4fb.up.railway.app/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

let cachedVideos: any[] | null = null;
const wait = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

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
      // Keep the trailing slash so the backend does not redirect this request
      // to an incorrectly generated http:// URL behind Railway's proxy.
      const response = await api.post("/join-requests/", data);
      return response;
    } catch (error) {
      console.error("Error submitting join request:", error);
      throw error;
    }
  },

  googlePrefill: async (idToken: string) => {
    try {
      const response = await api.post("/join-requests/google-prefill", {
        id_token: idToken,
      });
      return response.data;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  },

  fetchVideos: async (): Promise<any[]> => {
    if (cachedVideos) return cachedVideos;

    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        const response = await api.get("/videos/public");
        cachedVideos = response.data;
        return cachedVideos || [];
      } catch (error: any) {
        const status = error.response?.status;
        const isTemporaryFailure =
          !status || status === 502 || status === 503 || status === 504;

        if (!isTemporaryFailure || attempt === 2) {
          console.error("Error fetching videos:", error);
          return [];
        }

        // Railway may briefly return a gateway error while the service wakes
        // up or restarts. Give it a moment before trying again.
        await wait(1000 * (attempt + 1));
      }
    }

    return [];
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

export const { verifyPhoneNumber, submitJoinRequest, googlePrefill, fetchVideos, saveVideo, shareVideo } = actions;

