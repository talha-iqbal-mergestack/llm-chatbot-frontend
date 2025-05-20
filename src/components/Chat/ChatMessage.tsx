'use client';

import { Box, Text, VStack } from '@chakra-ui/react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user';
  
  return (
    <Box
      w="full"
      bg={isUser ? 'gray.100' : 'white'}
      p={4}
      borderRadius="md"
    >
      <VStack align="start" gap={2}>
        <Text fontWeight="bold" color={isUser ? 'blue.500' : 'green.500'}>
          {isUser ? 'You' : 'Assistant'}
        </Text>
        <Text>{content}</Text>
      </VStack>
    </Box>
  );
}