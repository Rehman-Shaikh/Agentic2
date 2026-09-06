import axios from "axios"
import { graph } from "../graph/graph.js"
 
export const agent = async (req, res) => {
  try {
    const { prompt, conversationId } = req.body
    
    // Step A: Inter-Service HTTP Call to Chat Service to Save User Input
    await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
      conversationId,
      role: "user",
      content: prompt
    })
 
    // Step B: Invoke LangGraph Engine to Execute Agent Workflow. It takes state as input and returns the updated state with AI response.
    const result = await graph.invoke({
      prompt,
      conversationId
    })
 
    // Step C: Extract AI Output and Respond
    const response = result.aiResponse
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ message: error.message || "Agent execution failed" })
  }
}
