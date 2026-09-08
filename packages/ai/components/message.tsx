import type { UIMessage } from "ai";
import type { ComponentProps } from "react";
import { Streamdown } from "streamdown";
import { twMerge } from "tailwind-merge";

export interface MessageData {
  role: string;
  content?: string;
  parts?: UIMessage["parts"];
}

interface MessageProps {
  data: MessageData | UIMessage;
  markdown?: ComponentProps<typeof Streamdown>;
}

export const Message = ({ data, markdown }: MessageProps) => {
  const content =
    ("content" in data && typeof data.content === "string"
      ? data.content
      : undefined) ??
    ("parts" in data && Array.isArray(data.parts)
      ? data.parts
          .filter((p) => p.type === "text")
          .map((p) => (p as { text: string }).text)
          .join("")
      : "");

  return (
    <div
      className={twMerge(
        "flex max-w-[80%] flex-col gap-2 rounded-xl px-4 py-2",
        data.role === "user"
          ? "self-end bg-foreground text-background"
          : "self-start bg-muted"
      )}
    >
      <Streamdown {...markdown}>{content}</Streamdown>
    </div>
  );
};
