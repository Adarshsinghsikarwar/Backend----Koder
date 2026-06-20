// import readline from 'readline';

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.question("What is your name? ", (name) => {
//   console.log(`Hello ${name}`);
//   rl.close();
// });

// rl.question("Name: ", (name) => {
//   rl.question("Age: ", (age) => {
//     console.log(`${name} is ${age} years old`);
//     rl.close();
//   });
// });

import readline from "readline/promises";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// const name = await rl.question("Name: ");
// const age = await rl.question("Age: ");

// console.log(`${name} is ${age} years old`);

// rl.close();

// rl.on("line", (input) => {
//   console.log(`You typed: ${input}`);
// });

// rl.on("close", () => {
//   console.log("Goodbye!");
// });

// rl.close();
// rl.pause();
// rl.resume();
// rl.setPrompt("Enter command > ");
// rl.prompt();