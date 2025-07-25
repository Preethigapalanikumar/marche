import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "./css/caruseltwo.css";
import "swiper/swiper-bundle.css";
import { useEffect, useState } from "react";

const TESTIMONIALDATA = [
  {
    card: {
      img: "./home/testmonial-profile.jpg",
      content:
        "Marche has transformed our approach to healthcare with their cutting-edge biomedical products. The innovation and quality they bring to the table have significantly improved our patient care standards. Their team is incredibly knowledgeable and always ready to support us. Marche is a true leader in medical innovation, and we are proud to collaborate with them.",
      username: "Dr. John Harris",
      position: "Medical Director",
      linkedin: "https://www.linkedin.com/company/marche-healthcare/",
    },
  },
  {
    card: {
      img: "./home/testmonial-profile.jpg",
      content:
        "Our partnership with Marche has been instrumental in enhancing our medical services. Their innovative products are not only reliable but also remarkably effective in improving patient outcomes. The dedication and expertise of the Marche team are truly commendable. We highly recommend Marche for their unparalleled contribution to biomedical advancements.",
      username: "Dr. Sarah Collins",
      position: "Director of Medical Research",
      linkedin: "https://www.linkedin.com/company/marche-healthcare/",
    },
  },
  {
    card: {
      img: "./home/testmonial-profile.jpg",
      content:
        "Working with Marche has been an absolute pleasure. Their biomedical innovations have brought new levels of efficiency and effectiveness to our healthcare practices. The quality of their products and the support from their team have exceeded our expectations. Marche is at the forefront of medical technology, and we are thrilled to be their partners.",
      username: "Dr. Michael Roberts",
      position: "Head of Clinical Operations",
      linkedin: "https://www.linkedin.com/company/marche-healthcare/",
    },
  },
  {
    card: {
      img: "./home/testmonial-profile.jpg",
      content:
        "Marche's innovative biomedical products have revolutionized our medical procedures. Their commitment to excellence and cutting-edge technology is evident in every product we use. The team at Marche is responsive and dedicated to ensuring we have the best tools for patient care. We highly recommend Marche for their outstanding contributions to healthcare innovation.",
      username: "Dr. Laura Mitchell",
      position: "Senior Physician",
      linkedin: "https://www.linkedin.com/company/marche-healthcare/",
    },
  },
  {
    card: {
      img: "./home/testmonial-profile.jpg",
      content:
        "Collaborating with Marche has significantly elevated our healthcare delivery. Their state-of-the-art biomedical products have enhanced our diagnostic accuracy and treatment effectiveness. Marche’s team is highly professional and always ready to assist. We are extremely satisfied with the advancements they bring to the medical field.",
      username: "Anthony Bahringer",
      position: "Senior Research Manager",
      linkedin: "https://www.linkedin.com/company/marche-healthcare/",
    },
  },
];
const videoCardDetials = [
  { id: 1, link: "./videos/card-thumbnail.png", name: "Video name1" },
  { id: 2, link: "./videos/card-thumbnail.png", name: "Video name2" },
  { id: 3, link: "./videos/card-thumbnail.png", name: "Video name3" },
  { id: 1, link: "./videos/card-thumbnail.png", name: "Video name1" },
  { id: 2, link: "./videos/card-thumbnail.png", name: "Video name2" },
  { id: 3, link: "./videos/card-thumbnail.png", name: "Video name3" },
];

const SwiperSingle = ({ testmonial }) => {
  const [testimonials,setTestimonials]=useState([]);
  useEffect(() => {
    const fetchTestimonials = async () => {
      const res = await fetch("/api/testimonial/index");
      // console.log(res);
      const data = await res.json();

      const formattedTestimonials = data.posts.map((post) => ({
        id: post._id,
        username:post.username,
        position:post.position,
        linkedin:post.link,
        img: post.imageUrl,
        content: post.content,
      }));
      setTestimonials(formattedTestimonials);
    };

    fetchTestimonials();
  }, []);
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      autoplay={{ delay: 10000, disableOnInteraction: false }}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    >
      {testimonials.length>0?testimonials.map((item, idx) => (
        <SwiperSlide key={idx}>
          <div className="testimonoial-home-container">
            <div className="testmonial-card">
              <div className="content">
                <p className="review">{item.content}</p>
                <div className="details">
                  <div>
                    <h5>{item.username}</h5>
                    <p className="desigination">{item.position}</p>
                  </div>

                  <a href={item.linkedin} target="_blank" className="icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="Icon / LinkedIn">
                        <path
                          id="Vector"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.5 3.24268C3.67157 3.24268 3 3.91425 3 4.74268V19.7427C3 20.5711 3.67157 21.2427 4.5 21.2427H19.5C20.3284 21.2427 21 20.5711 21 19.7427V4.74268C21 3.91425 20.3284 3.24268 19.5 3.24268H4.5ZM8.52076 7.2454C8.52639 8.20165 7.81061 8.79087 6.96123 8.78665C6.16107 8.78243 5.46357 8.1454 5.46779 7.24681C5.47201 6.40165 6.13998 5.72243 7.00764 5.74212C7.88795 5.76181 8.52639 6.40728 8.52076 7.2454ZM12.2797 10.0044H9.75971H9.7583V18.5643H12.4217V18.3646C12.4217 17.9847 12.4214 17.6047 12.4211 17.2246C12.4203 16.2108 12.4194 15.1959 12.4246 14.1824C12.426 13.9363 12.4372 13.6804 12.5005 13.4455C12.7381 12.568 13.5271 12.0013 14.4074 12.1406C14.9727 12.2291 15.3467 12.5568 15.5042 13.0898C15.6013 13.423 15.6449 13.7816 15.6491 14.129C15.6605 15.1766 15.6589 16.2242 15.6573 17.2719C15.6567 17.6417 15.6561 18.0117 15.6561 18.3815V18.5629H18.328V18.3576C18.328 17.9056 18.3278 17.4537 18.3275 17.0018C18.327 15.8723 18.3264 14.7428 18.3294 13.6129C18.3308 13.1024 18.276 12.599 18.1508 12.1054C17.9638 11.3713 17.5771 10.7638 16.9485 10.3251C16.5027 10.0129 16.0133 9.81178 15.4663 9.78928C15.404 9.78669 15.3412 9.7833 15.2781 9.77989C14.9984 9.76477 14.7141 9.74941 14.4467 9.80334C13.6817 9.95662 13.0096 10.3068 12.5019 10.9241C12.4429 10.9949 12.3852 11.0668 12.2991 11.1741L12.2797 11.1984V10.0044ZM5.68164 18.5671H8.33242V10.01H5.68164V18.5671Z"
                          fill="white"
                        />
                      </g>
                    </svg>
                  </a>
                </div>
              </div>
              <img src={item.img} alt="" />
            </div>
          </div>
        </SwiperSlide>
      )):<></>}
    </Swiper>
  );
};
export default SwiperSingle;
