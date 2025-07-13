"use client"
import { useEffect, useState } from "react";
import "./css/videopage.css";
import SwiperCarousel from "../components/SwiperCarousel";
import { motion } from "framer-motion";
import ScrollToHash from "../components/ScrollToHash";

const VideoPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [videos, setVideos] = useState([]);
  const [embedUrl, setEmbedUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("Video Title");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/videoCat/index");
        const data = await res.json();
        console.log(data);
        const validCategories = data.posts.filter(post => 
          post.subcategories?.length > 0
        );
        
        setCategories(validCategories);
        
        if (validCategories.length > 0) {
          setSelectedCategory(validCategories[0]);
          setSelectedSubcategory(validCategories[0].subcategories[0]);
        }
      } catch (err) {
        console.error("Failed to load categories", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      if (!selectedCategory || !selectedSubcategory) return;
      
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:3000/api/video-categories/get-videos/${selectedCategory.category}/${selectedSubcategory.name}`
        );
        const data = await res.json();
        
        // Handle the response format - it's an array with one item containing subcategories
        const matchedSubcategory = data[0]?.subcategories?.find(
          sub => sub.name === selectedSubcategory.name
        );
        
        const videos = matchedSubcategory?.videos || [];
        setVideos(videos);
        
        if (videos.length > 0) {
          const firstVideo = videos[0];
          setVideoTitle(firstVideo.name);
          setVideoUrl(firstVideo.link || "");
        } else {
          setVideoTitle("No videos available");
          setVideoUrl("");
        }
      } catch (err) {
        console.error("Failed to load videos", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [selectedSubcategory]);

  useEffect(() => {
    if (!videoUrl) {
      setEmbedUrl("");
      return;
    }

    const videoId = extractVideoId(videoUrl);
    if (videoId) {
      setEmbedUrl(`https://www.youtube.com/embed/${videoId}`);
    } else {
      // Handle direct video URLs (non-YouTube)
      setEmbedUrl(videoUrl);
    }
  }, [videoUrl]);

  const extractVideoId = (url) => {
    if (!url) return null;
    try {
      const match = url.match(/(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be\.com\/watch\?v=)([\w-]{11})/);
      return match ? match[1] : null;
    } catch (error) {
      console.error("Error extracting video ID:", error);
      return null;
    }
  };

  if (loading && categories.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  if (categories.length === 0) {
    return <div className="error">No video categories found</div>;
  }

  return (
    <div>
      <ScrollToHash />
      <section className="vid-banner">
        <video 
          src={selectedCategory?.backgroundVideo || "./videos/bulb-video.mp4"} 
          autoPlay 
          muted 
          loop
        ></video>
        <div className="banner-text">
          <h3>Videos</h3>
          <p>{selectedCategory?.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</p>
        </div>
      </section>

      <section className="video-gallery">
        <div className="category">
          <div id="productvideo" className="category-container">
            {categories.map((cat) => (
              <button
                key={cat._id}
                className={`btn-outline-rounded ${selectedCategory?._id === cat._id ? "active" : ""}`}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedSubcategory(cat.subcategories[0]);
                }}
              >
                {cat.title || cat.category}
              </button>
            ))}
          </div>
        </div>

        <div className="sub-category">
          <h2>{selectedCategory?.title || selectedCategory?.category}</h2>
          <p>{selectedCategory?.description || "Video collection"}</p>
          
          <div className="button-group">
            {selectedCategory?.subcategories?.map((sub, index) => (
              <motion.button
                key={sub._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1, delay: index * 0.3 }}
                className={`btn-outline-rounded ${selectedSubcategory?._id === sub._id ? "dark" : ""}`}
                onClick={() => {
                  setSelectedSubcategory(sub);
                  const el = document.getElementById("youtubevideosection");
                  if (el) window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
                }}
              >
                {sub.name}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="video-section">
          <div id="youtubevideosection" style={{ height: "100vh", margin: "4em auto" }}>
            {embedUrl ? (
              embedUrl.includes('youtube.com') ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={embedUrl}
                  title={videoTitle}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video controls width="100%" height="100%">
                  <source src={embedUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )
            ) : (
              <div className="no-video">Select a video to play</div>
            )}
          </div>
          
          <div>
            <h1 style={{ textAlign: "left", marginTop: "-50px" }}>
              {videoTitle}
            </h1>
          </div>
          
          {loading ? (
            <div>Loading videos...</div>
          ) : (
            <SwiperCarousel
              setVideoYtLink={setVideoUrl}
              setVideoTitle={setVideoTitle}
              videos={videos}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default VideoPage;