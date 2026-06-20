// import fs from "fs";

// Read a file
// const data = fs.readFileSync('hello.txt', 'utf8')
// console.log(data);

// console.log('File content:', data);

// const data = fs.readFile('hello.txt', 'utf8', (err, data) => {
//   if (err) throw err;
//   console.log('File content:', data);
// });

// Write to a file
// fs.writeFile('hello.txt', 'Hello, World!', (err) => {
//   if (err) throw err;
//   console.log('File has been written.');
// });

// fs.writeFileSync('hello.txt', 'Hello, World! or batao' , (err) => {
//   if (err) throw err;
//   console.log('File has been written.');
// });

// append to a file
// fs.appendFile('hello.txt', '\nAppended text.', (err) => {
//   if (err) throw err;
//   console.log('Text has been appended.');
// });

// fs.appendFileSync('hello.txt', '\nAppended text.', (err) => {
//   if (err) throw err;
//   console.log('Text has been appended.');
// })

// make a new folder
// fs.mkdir('newFolder', (err) => {
//   if (err) throw err;
//   console.log('Folder has been created.');
// })

// fs.mkdirSync('newFolder1', (err) => {
//   if (err) throw err;
//   console.log('Folder has been created.');
// })

// fs.mkdir('newFolder2/src/index.js', { recursive: true }, (err) => {
//     if (err) throw err;
//     console.log('Folder has been created.');
// })

// read the contents of a folder
// fs.readdir('.', (err, files) => {
//   if (err) throw err;
//   console.log('Files in the folder:', files);
// })

// const files = fs.readdirSync(".");
// console.log('Files in the folder:', files);

// delete a file

// fs.unlink('hello.txt', (err) => {
//   if (err) throw err;
//   console.log('File has been deleted.');
// });

// fs.unlinkSync("newFolder2/src/index.js");
// console.log("File has been deleted.");

// delete a folder
// fs.rmdir('newFolder', (err) => {
//   if (err) throw err;
//   console.log('Folder has been deleted.');
// });
// fs.rmdirSync("newFolder1");
// console.log("Folder has been deleted.");

// rename a file
// fs.rename('hello.txt', 'greeting.txt', (err) => {
//   if (err) throw err;
//   console.log('File has been renamed.');
// });

// fs.renameSync("greeting.txt", "hello.txt");
// console.log("File has been renamed.");

// get file stats
// fs.stat('hello.txt', (err, stats) => {
//   if (err) throw err;
//   console.log('File stats:', stats);
// });

// check if a file exists
// fs.existsSync('hello.txt') ? console.log('File exists.') : console.log('File does not exist.');

// copy a file
// fs.copyFile('hello.txt', 'hello_copy.txt', (err) => {
//   if (err) throw err;
//   console.log('File has been copied.');
// });

// fs.copyFileSync('hello.txt', 'hello_copy.txt', (err) => {
//   if (err) throw err;
//   console.log('File has been copied.');
// });

// fs.watch("hello.txt", (eventType, filename) => {
//   if (filename) {
//     console.log(`File ${filename} has been ${eventType}.`);
//   }
// });

import fs from "fs/promises";

async function read() {
    try {
        const data = await fs.readFile("hello.txt", "utf8");
        console.log(data);
    }
    catch (err) {
        console.log(err);
    }
}

read();

