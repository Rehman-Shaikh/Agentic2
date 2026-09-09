import { SystemMessage, HumanMessage, AIMessage } from "@langchain/core/messages";
import { getModel } from "../config/llmModels.js";
import { getMemory } from "../config/memory.js";

export const chatAgent = async (state) => {
  try {
    const llm = await getModel("chat");
    const history = (await getMemory(state.conversationId)) || [];

    const systemPrompt = `You are VertexAi, an intelligent AI assistant.
Rules:
- For simple questions, greetings, and short queries, respond naturally in plain text.
- For technical, educational, coding, or detailed topics, use clean Markdown.

Formatting:
- Use # for titles and ## for sections.
- Leave a blank line after headings.
- Use bullet points for lists.
- Use numbered lists for steps.
- Use fenced code blocks with language tags for code.
- Keep paragraphs short and readable.
- Never write headings and content on the same line.
- Never generate large walls of text.`;

    const messages = [new SystemMessage(systemPrompt)];

    // Populate memory history safely
    history.forEach((msg) => {
      if (msg.role === "user") {
        messages.push(new HumanMessage(msg.content));
      } else if (msg.role === "assistant") {
        messages.push(new AIMessage(msg.content));
      }
    });

    // Check if current prompt is already the last item in history to prevent duplication
    const lastMsg = history[history.length - 1];
    if (!lastMsg || lastMsg.content !== state.prompt) {
      messages.push(new HumanMessage(state.prompt));
    }

    const response = await llm.invoke(messages);

    return {
      ...state,
      aiResponse: typeof response.content === "string" ? response.content : JSON.stringify(response.content),
    };
  } catch (error) {
    console.error("Error in chatAgent:", error);
    throw error;
  }
};