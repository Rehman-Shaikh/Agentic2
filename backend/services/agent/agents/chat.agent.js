import { getModel } from "../config/llmModels.js"

export const chatAgent = async (state) => {
    const llm = await getModel("chat");
    const SystemPrompt = "You are MultiAgetAi, an intelligent AI assistant."
    const response = await llm.invoke([{
        "role": "system",
        "content": SystemPrompt
    },
    {
        "role": "user",
        "content": state.prompt
    }]);
    return {
        ...state,
        aiResponse: response.content
    }
}