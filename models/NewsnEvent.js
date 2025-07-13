import mongoose from "mongoose";

const NewsnEventSchema = new mongoose.Schema({
  topic: String,
  imageUrl: String, // path to the uploaded image
  content: String,
});

export default mongoose.models.NewsnEvent || mongoose.model("NewsnEvent", NewsnEventSchema);
