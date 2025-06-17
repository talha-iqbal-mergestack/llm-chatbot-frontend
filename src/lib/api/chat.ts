import { Message, ChatResponse } from "@/types/chat";
import { apiClient } from "@/lib/api";

export const chatApi = {
  sendMessage: async (
    messages: Message[],
    model = "deepseek/deepseek-r1:free"
  ): Promise<ChatResponse> => {
    return apiClient.post("/chat", { messages, model });
  },
};
