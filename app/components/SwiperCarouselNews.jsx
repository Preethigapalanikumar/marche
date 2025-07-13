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
import NewsCard from "./NewsCard";
import MediaCard from "./MediaCard";

const SwiperCarouselNews = ({ items }) => {
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

  return (
    <>
      {items.length === 0 ? (
        <p>Loading images...</p>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          autoplay={{ delay: 10000, disableOnInteraction: false }}
          spaceBetween={0}
          slidesPerView={slideState.noOfSlide}
          navigation={slideState.navigation}
          pagination={{ clickable: true }}
        >
          {items.map((item, idx) => (
            <SwiperSlide key={`${item.id}-${idx}`}>
              <MediaCard {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default SwiperCarouselNews;
