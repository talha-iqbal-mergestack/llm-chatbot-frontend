import { useMutation } from "@tanstack/react-query";

import { Message } from "@/types/chat";
import { toaster } from "@/components/ui/toaster";
import { chatApi } from "@/lib/api/chat";

export const useChat = () => {
  return useMutation({
    mutationFn: (messages: Message[]) => chatApi.sendMessage(messages),
    onError: (error) => {
      toaster.error({
        description: error.message || "Failed to send message",
      });
    },
  });
};
