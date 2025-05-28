export interface FileAttachment {
  type: "pdf";
  name: string;
  // url: string;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
  attachment?: FileAttachment;
}

export interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  attachment?: FileAttachment;
}

export interface ChatResponse {
  response: string;
}
