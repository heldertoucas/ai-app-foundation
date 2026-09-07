import { createOpenAI } from "@ai-sdk/openai";
import { keys } from "../keys";

const getProvider = () => {
  const localBaseUrl = process.env.OLLAMA_BASE_URL || process.env.LOCAL_AI_BASE_URL;

  if (localBaseUrl) {
    // Local-first runtime (e.g. Ollama via OpenAI-compatible endpoint)
    return createOpenAI({
      baseURL: localBaseUrl,
      apiKey: "ollama",
    });
  }

  // Cloud provider (OpenAI)
  return createOpenAI({
    apiKey: keys().OPENAI_API_KEY || "dummy-key-for-offline",
    compatibility: "strict",
  });
};

const provider = getProvider();

export const models = {
  chat: provider(process.env.AI_CHAT_MODEL || "gpt-4o-mini"),
  embeddings: provider.textEmbeddingModel?.(process.env.AI_EMBEDDING_MODEL || "text-embedding-3-small"),
};
