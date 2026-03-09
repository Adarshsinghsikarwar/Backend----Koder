// server ko start krna
// server aur db ko connect krna

import app from "./src/app.js";
import mongoose from "mongoose";

async function connectToDB() {
  await mongoose.connect(
    "mongodb+srv://adarshsikarwar543_user_db:YcvoSPj22018XyRA@cluster0.wawunnc.mongodb.net/Day-3"
  );
  console.log("Server is connected to DB")
}
connectToDB();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
