import { Annotation } from "@langchain/langgraph";
 
export const agentState = Annotation.Root({
    prompt: Annotation(),
    aiResponse: Annotation(),
    agent: Annotation(),
    conversationId: Annotation(),
    searchResults: Annotation(), // for tavily responce store
    images: Annotation(), // for tavily responce store
})
