import { Buffer } from "buffer";

// const buf = Buffer.alloc(10);
// console.log(buf);

// const buf = Buffer.from('Hello, World!');
// console.log(buf);
// console.log(buf.toString()); // Convert buffer to string

// const buf = Buffer.from([65, 66, 67, 68, 69]); // Create a buffer from an array of bytes
// console.log(buf); // Output: <Buffer 41 42 43 44 45>
// console.log(buf.toString()); // Convert buffer to string, Output: 'ABCDE'

// const buf = Buffer.from("Hello , world");
// console.log(buf.length); // Output: 12

// const buf = Buffer.from("Hello");
// console.log(buf[0]);
// console.log(String.fromCharCode(buf[0]));

// const buf = Buffer.from("Hello");
// buf[0] = 74;
// console.log(buf.toString());

// encoding

// Buffer.from("Hello", "utf8"); // Default encoding is utf8
// Buffer.from("Hello", "ascii");
// Buffer.from("Hello", "base64");
// Buffer.from("Hello", "hex");
// Buffer.from("Hello", "latin1");

// const buf1 = Buffer.from("Hello ");
// const buf2 = Buffer.from("World");
// const result = Buffer.concat([buf1, buf2]);
// console.log(result.toString());

// const buf1 = Buffer.from("ABC");
// const buf2 = Buffer.from("ABC");

// console.log(buf1.equals(buf2));