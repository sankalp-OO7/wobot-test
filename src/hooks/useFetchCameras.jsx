import axios from "axios";
import { API_BASE } from "../constants/url.jsx";
const TOKEN = import.meta.env.VITE_APP_WOBOT_TOKEN;

export const useFetchCameras = () => {
  const fetchCameras = async () => {
    try {
      const response = await axios.get(`${API_BASE}/fetch/cameras`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error fetching cameras:", error);
      throw error;
    }
  };
  return fetchCameras;
};
