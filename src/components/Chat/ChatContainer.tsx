"use client";

import { useState } from "react";
import {
  Box,
  VStack,
  Input,
  Button,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { FiPaperclip } from "react-icons/fi";
import { documentApi } from "@/lib/api/document";

import { ChatMessage } from "@/components/chat/ChatMessage";
import { FileUpload } from "@/components/chat/FileUpload";
import { Message, FileAttachment } from "@/types/chat";
import { useChat } from "@/hooks/useChat";

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const mutation = useChat();

  const handleResponse = (data: { response: string }) => {
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: data.response },
    ]);
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setShowFileUpload(false);
  };

  const handleSendMessage = async () => {
    if (!input.trim() && !selectedFile) return;

    let attachment: FileAttachment | undefined;
    if (selectedFile) {
      try {
        await documentApi.upload(selectedFile);
        attachment = {
          type: "pdf",
          name: selectedFile.name,
          // url: url,
        };
      } catch (error) {
        console.error("Error uploading file:", error);
        return;
      }
    }

    const newMessage: Message = {
      role: "user",
      content: input.trim() || "Uploaded file: " + selectedFile?.name,
      attachment,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setSelectedFile(null);

    if (attachment) {
      try {
        const { answer } = await documentApi.query(
          input.trim() || "Summarize this document"
        );
        if (answer) {
          handleResponse({ response: answer });
        }
      } catch (error) {
        console.error("Error querying document:", error);
        handleResponse({
          response: "Sorry, I couldn't process the document. Please try again.",
        });
      }
    } else {
      mutation.mutate([...messages, newMessage], {
        onSuccess: handleResponse,
      });
    }
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
        <VStack w="full" gap={2}>
          {showFileUpload && (
            <Box w="full">
              <FileUpload onFileSelect={handleFileSelect} />
            </Box>
          )}
          <VStack w="full" gap={2}>
            {selectedFile && (
              <HStack w="full" p={2} bg="gray.50" borderRadius="md" gap={2}>
                <FiPaperclip />
                <Text fontSize="sm" color="gray.600">
                  {selectedFile.name}
                </Text>
              </HStack>
            )}
            <HStack w="full">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                pr="4.5rem"
              />
              <IconButton
                aria-label="Attach file"
                size="sm"
                onClick={() => setShowFileUpload(!showFileUpload)}
              >
                <FiPaperclip />
              </IconButton>
              <Button
                size="sm"
                onClick={handleSendMessage}
                loading={mutation.isPending}
              >
                Send
              </Button>
            </HStack>
          </VStack>
        </VStack>
      </VStack>
    </Box>
  );
}
