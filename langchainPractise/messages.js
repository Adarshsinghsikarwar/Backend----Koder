import {
  initChatModel,
  HumanMessage,
  SystemMessage,
  AIMessage,
} from "langchain";
import dotenv from "dotenv/config";

const model = await initChatModel("mistral-small-latest");

// const systemMessage = new SystemMessage("give me ans in detailed manner but in short way");
// const humanMessage = new HumanMessage("What is 2 + 2?");

// const response = await model.invoke([systemMessage, humanMessage]);

// console.log(response.content);

const messages = [
  new SystemMessage("You are a poetry expert"),
  new HumanMessage("Write a haiku about spring"),
  // new AIMessage("Cherry blossoms bloom..."),
  // new HumanMessage("Write another one"),
];

const response = await model.invoke(messages);

console.log(response.content);
