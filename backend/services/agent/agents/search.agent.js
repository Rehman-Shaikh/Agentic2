import { searchTool } from "../config/tavily.js";
import { checkAgentLimit } from "../config/agentLimit.js";

export const searchAgent = async (state) => {
  try {
    await checkAgentLimit(state.userId, "search");
    const results = await searchTool.invoke({
      query: state.prompt,
    });
    console.log(results);
    return {
      ...state,
      searchResults: results,
      images: results.images,
    };
  } catch (error) {
    console.log(error);
    return {
      ...state,
      searchResults: [],
      images: [],
      aiResponse: error?.data?.message || "Failed to generate search results",
    };
  }
};
