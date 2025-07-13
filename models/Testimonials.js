import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema({
  username:String,
  position:String,
  link:String,
  imageUrl:String,
  content:String,
});

export default mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);
