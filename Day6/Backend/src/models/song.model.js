import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title : String,
  artist : String,
  url : String,
  posterUrl : String,
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "users"
  }
}   );

 const Song = mongoose.model("songs", songSchema);

 export default Song;