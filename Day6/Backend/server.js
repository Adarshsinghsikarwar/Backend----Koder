import app from "./src/app.js";
import { connectToDB } from "./src/config/database.js";

connectToDB();

app.listen(3000, (req, res) => {
  console.log("server is running on port 3000");
});

