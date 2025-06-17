"use client";

import { useCallback } from "react";
import { Box, Icon, Text } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export function FileUpload({ onFileSelect }: FileUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file.type !== "application/pdf") {
        toaster.warning({
          title: "Invalid file type",
          description: "Please upload a PDF file",
        });
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        toaster.warning({
          title: "File too large",
          description: "Please upload a file smaller than 10MB",
        });
        return;
      }
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  return (
    <Box
      {...getRootProps()}
      cursor="pointer"
      borderWidth={2}
      borderRadius="md"
      borderStyle="dashed"
      borderColor={isDragActive ? "blue.500" : "gray.300"}
      bg={isDragActive ? "blue.50" : "transparent"}
      p={2}
      display="flex"
      alignItems="center"
      justifyContent="center"
      transition="all 0.2s"
      _hover={{ borderColor: "blue.500", bg: "blue.50" }}
    >
      <input {...getInputProps()} />
      <Icon as={FiUpload} mr={2} />
      <Text fontSize="sm" color="gray.600">
        {isDragActive ? "Drop PDF here" : "Upload PDF"}
      </Text>
    </Box>
  );
}
