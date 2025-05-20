"use client";

import { useState } from "react";
import { Box, VStack, Input, Button } from "@chakra-ui/react";

import { ChatMessage } from "@/components/chat/ChatMessage";
import { Message } from "@/types/chat";
import { useChat } from "@/hooks/useChat";

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const mutation = useChat();

  const handleSuccess = (data: { response: string }) => {
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: data.response },
    ]);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    mutation.mutate([...messages, newMessage], {
      onSuccess: handleSuccess,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box maxW="800px" mx="auto" h="100vh" py={8} px={4}>
      <VStack h="full" gap={4}>
        <Box
          flex={1}
          w="full"
          overflowY="auto"
          borderWidth={1}
          borderRadius="lg"
          p={4}
        >
          <VStack gap={4} align="stretch">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                role={message.role}
                content={message.content}
              />
            ))}
          </VStack>
        </Box>
        <Box w="full" position="relative">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            pr="4.5rem"
          />
          <Button
            position="absolute"
            right={2}
            top="50%"
            transform="translateY(-50%)"
            colorScheme="blue"
            size="sm"
            onClick={handleSendMessage}
            loading={mutation.isPending}
          >
            Send
          </Button>
        </Box>
      </VStack>
    </Box>
  );
}
