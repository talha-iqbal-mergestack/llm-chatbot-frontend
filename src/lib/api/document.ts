import { apiClient } from "@/lib/api";

export const documentApi = {
  upload: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append("file", file);

    return apiClient.post("/documents/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  query: async (query: string): Promise<{ results: any[] }> => {
    return apiClient.post("/documents/query", { query });
  },
};
