"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
// import uparraw from "../assets/up-arrow-svgrepo-com (1).svg"
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
export const Layouts = ({ children, title }) => {
  const [upArrow, setUpArrow] = useState(false);
  useEffect(() => {
    document.title = title;
    document.addEventListener("scroll", (e) => {
      if (window.scrollY === 0) {
        setUpArrow(false);
      } else {
        setUpArrow(true);
      }
    });
  }, []);

  return (
    <>
      <Header />

      <div className="spacedivider">{children}</div>

      <div
        onClick={scrollToTop}
        className={upArrow ? "backtotop showuparrow" : "backtotop"}
      >
        <svg
          viewBox="-3.2 -3.2 38.40 38.40"
          width="76px"
          height="76px"
          fill="#000000"
        >
          <g strokeWidth="0" transform="translate(4.48,4.48), scale(0.72)">
            <rect
              x="-3.2"
              y="-3.2"
              width="38.40"
              height="38.40"
              rx="19.2"
              fill="#560cf5"
            />
          </g>
          <g
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="#CCCCCC"
            strokeWidth="3.904"
          ></g>
          <g>
            <line
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.056"
              strokeMiterlimit="10"
              x1="16"
              y1="11"
              x2="16"
              y2="23"
            />
            <polyline
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.056"
              strokeMiterlimit="10"
              points="10.3,16 16,10.3 21.7,16"
            />
            <circle
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.056"
              strokeMiterlimit="10"
              cx="16"
              cy="16"
              r="12"
            />
          </g>
        </svg>
      </div>
      <Footer />
    </>
  );
};
