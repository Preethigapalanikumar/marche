// models/VideoCategory.js
import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  name: String,          // Title or topic of the video
  thumbnail: String,     // Path or URL to thumbnail image
  link: String           // Video file path or external link
});

const subcategorySchema = new mongoose.Schema({
  name: String,          // Subcategory name (e.g., Feature1, Module1)
  videos: [videoSchema]
});

const videoCategorySchema = new mongoose.Schema({
  category: String,       // Main category (e.g., product, training)
  title: String,          // Display title for the category
  description: String,    // Description of the category
  backgroundVideo: String, // Background video path or URL
  subcategories: [subcategorySchema]
});

const VideoCategory = mongoose.models.VideoCategory || mongoose.model("VideoCategory", videoCategorySchema);

export default VideoCategory;
