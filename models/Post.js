import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  topic: String,
  link: String,
  imageUrl: String, // path to the uploaded image
  content: String,
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
