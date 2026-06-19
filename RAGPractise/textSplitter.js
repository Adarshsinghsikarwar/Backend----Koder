import fs from "fs";
import { PDFParse } from "pdf-parse";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import dotenv from "dotenv/config";

const dataBuffer = fs.readFileSync("./story.pdf");

const parser = new PDFParse({
  data: dataBuffer,
});

const data = await parser.getText();

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 0,
});

const chunks = await splitter.splitText(data.text);

const embeddings = new MistralAIEmbeddings({
  apiKey: process.env.MISTRAL_API_KEY,
  model: "mistral-embed",
});

const docs = await Promise.all(chunks.map(async (chunk) => {
  const embedding = await embeddings.embedDocuments([chunk]);
  return {
    text: chunk,
    embedding,
  };
}));


console.log(docs);


