import { initChatModel } from "langchain";
import dotenv from "dotenv/config.js";
import { z } from "zod";

const model = await initChatModel("mistral-small-latest");

//const response = await model.invoke("what is 2 + 2?");

// const responses = await model.batch([
//   "Why do parrots have colorful feathers?",
//   "How do airplanes fly?",
//   "What is quantum computing?",
//   "Why do parrots have colorful feathers?",
//   "How do airplanes fly?",
//   "What is quantum computing?",
// ]);
// for (const response of responses) {
//   console.log(response.content);
// }

const schema = z.object({ name: z.string(), age: z.number() });

const structuredModel = model.withStructuredOutput(schema);

const response = await structuredModel.invoke(
    "Rahul is 25 years old."
);

console.log(response);