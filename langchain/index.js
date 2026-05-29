import dotenv from "dotenv/config";
import readline from "readline/promises";
import { HumanMessage } from "langchain";
import { ChatMistralAI } from "@langchain/mistralai";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const model = new ChatMistralAI({
  model: "mistral-small-latest",
});

const messages = [];

while (true) {
  const input = await rl.question("You: ");
  messages.push(new HumanMessage(input));
  const response = await model.invoke(messages);
  messages.push(response);
  console.log(`\x1b[34m[AI]\x1b[0m ${response.content}`);
}

rl.close();
