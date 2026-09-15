import { getModel } from "../config/llmModels.js";
import { checkAgentLimit } from "../config/agentLimit.js";

export const codingAgent = async (state) => {
  try {
    await checkAgentLimit(state.userId, "coding");
    const intentLlm = await getModel("intent"); // by default groq
    const llm = await getModel("coding");

    const intentRes = await intentLlm.invoke(`
You are an intent classifier.

Return ONLY one of these values.

CODE_GENERATION
CODE_REVIEW
CODE_EXPLANATION
DEBUGGING
OPTIMIZATION
CONVERSION
DOCUMENTATION

User Request:
${state.prompt}
    `);

    const intent = intentRes.content.trim();

    if (intent === "CODE_GENERATION") {
      const prompt = `
You are CortexAI Coding Agent.

Generate the requested project.

Default stack:
- HTML
- CSS
- JavaScript

Use React / Next.js / Vue ONLY if explicitly requested.

Rules:

- Responsive
- Modern UI
- CSS Variables
- Flexbox/Grid
- Smooth Scroll
- Hover Effects
- Beautiful spacing
- Single page unless user asks otherwise.

IMAGES
==========================================================
For placeholder images, use standard reliable dynamic image URLs like:
https://picsum.photos/800/600

Return ONLY valid JSON.

Schema:

{
  "files":[
    {
      "name":"index.html",
      "content":"..."
    },
    {
      "name":"style.css",
      "content":"..."
    },
    {
      "name":"script.js",
      "content":"..."
    }
  ]
}

Rules:

- Output must start with {
- Output must end with }
- No markdown
- No explanation
- No extra text
- No \`\`\`
- Never mention intent

User Request:
${state.prompt}`;

      const res = await llm.invoke(prompt);
      let data;

      try {
        // 1. Markdown code blocks (```json ... ```) ko remove karein
        const cleanedContent = res.content
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .replace(/\u00a0/g, " ") // Invisible non-breaking spaces ko fix karein
          .trim();

        // 2. Clear content ko parse karein
        data = JSON.parse(cleanedContent);
      } catch (err) {
        console.error("Invalid JSON from coding agent:", res.content);
        return {
          ...state,
          aiResponse:
            "Sorry, I couldn't generate valid code output. Please try again.",
          artifacts: [],
        };
      }

      return {
        ...state,
        aiResponse: "Code Generated Successfully.",
        artifacts: [
          {
            id: Date.now(),
            type: "Project",
            files: data.files || [],
            title: state.prompt,
          },
        ],
      };
    }

    const res = await llm.invoke(`
The user's request is:

${intent}

Return Markdown only.

Never generate project files.

Use headings like:

# Overview

## Explanation

## Problems

## Improvements

## Best Practices

## Optimized Code (if needed)

User Request:

${state.prompt}
    `);

    const data = res.content;

    return {
      ...state,
      aiResponse: data,
      artifacts: [],
    };
  } catch (error) {
    console.log(error)
        return{
            ...state,
            aiResponse:error?.data?.message || "Failed to generate coding output.",
            artifacts: [],
        }
  }
};