import axios from "axios";
import { API_BASE } from "../constants/url.jsx";
const TOKEN = import.meta.env.VITE_APP_WOBOT_TOKEN;

export const updateCameraStatus = async (id, status) => {
  try {
    const response = await axios.put(
      `${API_BASE}/update/camera/status`,
      { id, status },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating status for camera ${id}:`, error);
    throw new Error(error.response?.data?.message || "Status update failed.");
  }
};
