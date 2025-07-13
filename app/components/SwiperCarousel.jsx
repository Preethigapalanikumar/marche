"use client";
import { useState, useEffect } from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./css/carousel.css";

const SwiperCarousel = ({ videos, setVideoYtLink, setVideoTitle }) => {
  const [slideState, setSlideState] = useState({
    noOfSlide: 3,
    navigation: true,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setSlideState({ noOfSlide: 1, navigation: false });
      } else if (window.innerWidth <= 770) {
        setSlideState({ noOfSlide: 2, navigation: false });
      } else {
        setSlideState({ noOfSlide: 3, navigation: true });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleVideoSelect = (video) => {
    setVideoYtLink(video.link);
    setVideoTitle(video.name);
  };

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      autoplay={{ delay: 10000, disableOnInteraction: false }}
      spaceBetween={20}
      slidesPerView={slideState.noOfSlide}
      navigation={slideState.navigation}
      pagination={{ clickable: true }}
    >
      {videos.map((video) => (
        <SwiperSlide key={video._id}>
          <div 
            className="video-card" 
            onClick={() => handleVideoSelect(video)}
          >
            <img 
              src={video.thumbnail || "./videos/card-thumbnail.png"} 
              alt={video.name} 
              className="video-thumbnail"
            />
            <h3>{video.name}</h3>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperCarousel;