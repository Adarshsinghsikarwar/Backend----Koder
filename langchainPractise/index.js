import { ChatMistralAI } from "@langchain/mistralai";
import { createAgent } from "langchain";
import { tool } from "@langchain/core/tools";
import dotenv from "dotenv/config.js";

const model = new ChatMistralAI({
  model: "mistral-small-latest",
});

const addTool = new tool(async ({ a, b }) => a + b, {
  name: "add",
  description: "Adds two numbers together",
});

const agent = createAgent({
  model,
  tools: [addTool],
  systemPrompt: "give ans in detailed manner",
});

// const events = await agent.streamEvents(
//   {
//     messages: [
//       {
//         role: "user",
//         content: "What is 15 + 20?",
//       },
//     ],
//   },
//   {
//     version: "v2",
//   }
// );

// for await (const event of events) {
//   console.log(event);
// }

// const stream = await agent.stream({
//   messages: [
//     {
//       role: "user",
//       content: "What is 2 + 2?",
//     },
//   ],
// });

// for await (const chunk of stream) {
//   console.log(chunk.messages?.at(-1)?.content);
// }
// const response = await agent.invoke({
//   messages: [
//     {
//       role: "user",
//       content: "What is 2 + 2?",
//     },
//   ],
// });

// console.log(response.messages[response.messages.length - 1].content);
