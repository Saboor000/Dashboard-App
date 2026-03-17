import axios from "axios";

export async function fetchDashboardData(signal) {
  try {
    const { data } = await axios.get("/dashboard-data.json", {
      signal,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      updatedAt: data?.updatedAt ?? null,
      records: Array.isArray(data?.records) ? data.records : [],
    };
  } catch (error) {
    if (axios.isCancel(error) || error?.name === "AbortError") {
      throw error;
    }

    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to fetch dashboard data.";

    throw new Error(message);
  }
}
