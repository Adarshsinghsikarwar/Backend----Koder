import { ChatMistralAI } from "@langchain/mistralai";

const model = new ChatMistralAI({
  model: "mistral-small-latest",
});

export function AiTest() {
  model
    .invoke("What is the capital of France?")
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error("Error invoking Mistral AI:", error);
    });
}
