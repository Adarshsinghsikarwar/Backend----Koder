import url from 'url';
import { fileURLToPath , pathToFileURL } from 'url';


const __filename = fileURLToPath(import.meta.url); // Get the current file path
const __dirname = url.fileURLToPath(new URL('.', import.meta.url)); // Get the current directory path

const myFileURL = pathToFileURL(__filename); // Convert file path to file URL

console.log('Current file path:', __filename);
console.log('Current directory path:', __dirname);
console.log('File URL:', myFileURL.href); // 'file:///path/to/your/file.js'

const myURL = new URL('https://example.com:8080/pathname/?search=test#hash');

console.log('href:', myURL.href); // 'https://example.com:8080/pathname/?search=test#hash'
console.log('origin:', myURL.origin); // 'https://example.com:8080'
console.log('protocol:', myURL.protocol); // 'https:'
console.log('host:', myURL.host); // 'example.com:8080'
console.log('hostname:', myURL.hostname); // 'example.com'
console.log('port:', myURL.port); // '8080'
console.log('pathname:', myURL.pathname); // '/pathname/'
console.log('search:', myURL.search); // '?search=test'
console.log('hash:', myURL.hash); // '#hash'

