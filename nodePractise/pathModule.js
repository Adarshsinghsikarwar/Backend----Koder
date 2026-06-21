import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
console.log("File name:", __filename);
const __dirname = path.dirname(__filename);
console.log("Directory name:", __dirname);

// const filePath = path.join("src", "utils", "helpers.js");
// console.log("File path:", filePath);

// const fileName = path.basename(filePath);
// console.log("File name:", fileName);

// const pathName = path.resolve("hello.txt");
// console.log("Path name:", pathName);

// join only combine the string 
// resolve will give the absolute path of the file

// const dirPath = path.dirname("hello.txt");
// console.log("Directory path:", dirPath);

// const extName = path.extname("hello.txt");
// console.log("Extension name:", extName);

// const parsedPath = path.parse("hello.txt");
// console.log("Parsed path:", parsedPath);

// const obj = {
//   dir: "/home/user",
//   base: "index.js"
// };

// console.log(path.format(obj));

// const normalizedPath = path.normalize("src//utils/../helpers.js");
// console.log("Normalized path:", normalizedPath);

// const isAbsolutePath = path.isAbsolute("hello.txt");
// console.log("Is absolute path:", isAbsolutePath);


// const relativePath = path.relative("src/utils", "src/helpers.js");
// console.log("Relative path:", relativePath);

// console.log(__dirname); current jis folder me hai uska path dega
// console.log(__filename); ye current jis file me hai uska path dega

// const filePath = path.join(__dirname, "hello.txt");
// console.log("File path:", filePath);