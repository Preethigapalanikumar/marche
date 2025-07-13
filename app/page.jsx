"use client";

import { useState } from "react";
import "./css/homepage.css";
import { motion } from "framer-motion";
import VideoPlayer from "./components/VideoPlayer";
import SectionHeader from "./components/SectionHeader";
import VideoTabButton from "./components/VideoTabButton";

// import Author from "./assts/home/author.png";
import Carousel from "./components/Carousel";
// import CaruselTwo from "./components/CaruselTwo";
// import NewsCard from "./components/NewsCard";
import SwiperSingle from "./components/SwiperSingle";


import { SwiperSlide,Swiper } from "swiper/react";
import { Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/autoplay';
import Link from "next/link";
const VIDEODATA = {
  productvideo: {
    src: "./home/background-video.mp4",
  },
  trainingvideo: {
    src: "./videos/videobg.mp4",
  },
  surgeryvideo: {
    src: "./home/background-video.mp4",
  },
};
export default function HomePage() {
  const scrollToProduct = () => {
    scroll.scrollTo("/news", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  const [videoLink, setVideoLink] = useState("productvideo");
  function videoTabHandle(selectedButton) {
    setVideoLink(selectedButton);
  }

  return (
    <div>
      <div className="home-top">
        <Carousel />
      </div>

      <div className="value-proposition">
        <div className="value-column">
          <SectionHeader
            title={`Videos`}
            content={`Gain insights into our product's functionality and benefits via
              our video showcase`}
          />
        </div>
        <div className="video-player">
          <div className="video-wrapper">
            <VideoPlayer src={VIDEODATA[videoLink].src} />
            <ul className="videotabbuttons">
              <VideoTabButton
                state={videoLink}
                title="Product Video"
                onSelect={() => {
                  videoTabHandle("productvideo");
                }}
              />

              <VideoTabButton
                state={videoLink}
                title="Training Video"
                onSelect={() => {
                  videoTabHandle("trainingvideo");
                }}
              />

              <VideoTabButton
                state={videoLink}
                title="Surgery Video"
                onSelect={() => {
                  videoTabHandle("surgeryvideo");
                }}
              />

              <a href={"/VideoPage"}>
                <VideoTabButton title={"View All"}></VideoTabButton>
              </a>
            </ul>
          </div>
        </div>
      </div>

      <div className="marche-values-div">
        <h2 className="team-heading">Marche’s Values</h2>
        <div className="home-our-team">
          <video autoPlay muted loop className="background-video">
            <source src={`./home/background-video.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="overlay">
            <div className="team-header">
              <p className="team-paragraph">
                At the heart of our mission, our values guide us in every step.
                Discover the principles that drive our commitment to improving
                lives globally
              </p>
            </div>

            <div className="team-cards-container">
              <div className="team-cards">
                <motion.div
                  initial={{ x: -100, y: 100 }}
                  whileInView={{ x: 0, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="team-card"
                >
                  <div className="team-icon-container">
                    <img
                      src={`./money.png`}
                      alt="Team Icon"
                      className="team-icon"
                    />
                  </div>

                  <div className="card-content">
                    <h3 className="card-heading">Innovation</h3>
                    <p className="card-paragraph">
                      Pushing Boundaries, Bridging Health Disparities
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: -100, y: 100 }}
                  whileInView={{ x: 0, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="team-card"
                >
                  <div className="team-icon-container">
                    <img
                      src={`./Collab.png`}
                      alt="Team Icon"
                      className="team-icon"
                    />
                  </div>

                  <div className="card-content">
                    <h3 className="card-heading">Collaboration</h3>
                    <p className="card-paragraph">
                      Unite diverse expertise to create impactful innovations
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: -100, y: 100 }}
                  whileInView={{ x: 0, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="team-card"
                >
                  <div className="team-icon-container">
                    <img
                      src={`./Access.png`}
                      alt="Team Icon"
                      className="team-icon"
                    />
                  </div>

                  <div className="card-content">
                    <h3 className="card-heading">Accessibility</h3>
                    <p className="card-paragraph">
                      Bringing Modern Healthcare to Everyone
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ x: -100, y: 100 }}
                  whileInView={{ x: 0, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="team-card"
                >
                  <div className="team-icon-container">
                    <img
                      src={`./Compassion.png`}
                      alt="Team Icon"
                      className="team-icon"
                    />
                  </div>

                  <div className="card-content">
                    <h3 className="card-heading">Compassion</h3>
                    <p className="card-paragraph">
                      Empathy at Our Core Enhancing Lives Worldwide
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* testmonial */}
      <div className="testmonialslide">
        <SwiperSingle />
      </div>

      <div className="our-partners">
        <SectionHeader
          title={`Our Partners`}
          content={`Your support fuels our mission to innovate and ensure health equity worldwide. Together, we are making advanced healthcare accessible for all.`}
        />
        <div className="partners-logos">
          <Swiper
            slidesPerView={3} // Number of slides visible
            slidesPerGroup={1} // Moves 1 slide at a time
            autoplay={{ delay: 2000, disableOnInteraction: false }} // Auto slide every 2 sec
            loop={true} // Enables infinite scrolling
            modules={[Autoplay]} // Import Autoplay module
          >
            <SwiperSlide>
              <motion.div
                // initial={{ opacity: 0, y: 100 }}
                // whileInView={{ opacity: 1, y: 0 }}
                // transition={{ duration: .7, ease: "easeInOut", delay: 0.1 }}
                className="logo-container"
              >
                <img src={`./home/partner1.png`} alt="birac Logo" />
              </motion.div>
            </SwiperSlide>
            <SwiperSlide>
              <motion.div
                // initial={{ opacity: 0, y: 100 }}
                // whileInView={{ opacity: 1, y: 0 }}
                // transition={{ duration: .7, ease: "easeInOut", delay: 0.1 }}
                className="logo-container"
              >
                <img src={`./home/partner2.png`} alt="aic-pecf Logo" />
              </motion.div>
            </SwiperSlide>
            <SwiperSlide>
              <motion.div
                // initial={{ opacity: 0, y: 100 }}
                // whileInView={{ opacity: 1, y: 0 }}
                // transition={{ duration: .7, ease: "easeInOut", delay: 0.1 }}
                className="logo-container"
              >
                <img src={`./home/partner3.png`} alt="incubation Logo" />
              </motion.div>
            </SwiperSlide>
            <SwiperSlide>
              <motion.div
                // initial={{ opacity: 0, y: 100 }}
                // whileInView={{ opacity: 1, y: 0 }}
                // transition={{ duration: .7, ease: "easeInOut", delay: 0.1 }}
                className="logo-container"
              >
                <img src={`./home/partner4.png`} alt="startupTn Logo" />
              </motion.div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
