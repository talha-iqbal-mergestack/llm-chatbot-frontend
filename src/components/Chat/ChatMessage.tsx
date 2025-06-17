"use client";

import { Box, Text, VStack, Link, HStack, Icon } from "@chakra-ui/react";
import { FiFileText } from "react-icons/fi";

import { ChatMessageProps } from "@/types/chat";
import ReactMarkdown from "react-markdown";

export function ChatMessage({ role, content, attachment }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <Box w="full" bg={isUser ? "gray.100" : "white"} p={4} borderRadius="md">
      <VStack align="start" gap={2}>
        <Text fontWeight="bold" color={isUser ? "blue.500" : "green.500"}>
          {isUser ? "You" : "Assistant"}
        </Text>
        <ReactMarkdown>{content}</ReactMarkdown>
        {attachment && (
          <Link
            href={attachment.url}
            // isExternal
          >
            <HStack
              gap={2}
              p={2}
              borderWidth={1}
              borderRadius="md"
              _hover={{ bg: "gray.50" }}
            >
              <Icon as={FiFileText} />
              <Text fontSize="sm">{attachment.name}</Text>
            </HStack>
          </Link>
        )}
      </VStack>
    </Box>
  );
}
