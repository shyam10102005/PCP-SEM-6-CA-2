import axios from "axios";

const BASE_URL = "https://t4e-testserver.onrender.com/api";

// GitHub raw URL — data lives in the cloud, not hardcoded locally
const GITHUB_DATA_URL =
  "https://raw.githubusercontent.com/shyam10102005/PCP-SEM-6-CA-2/main/public/orders.json";

export const getToken = async (studentId, password, set) => {
  const { data } = await axios.post(`${BASE_URL}/public/token`, {
    studentId,
    password,
    set,
  });

  return data;
};

export const getDataset = async (token, dataUrl) => {
  const { data } = await axios.get(`${BASE_URL}${dataUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.data;
};

// Fetch orders from GitHub (no local hardcoding needed)
export const getOrdersFromGitHub = async () => {
  const { data } = await axios.get(GITHUB_DATA_URL);
  return data;
};
