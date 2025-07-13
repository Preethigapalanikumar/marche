"use client"; // if you're using app directory
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../assets/logo.png"; // Adjust the path if needed
import "./css/header.css";// Place your CSS file in `styles` folder (or adjust as needed)

const Nav = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { title: "Home", path: "/", subItems: [] },
    {
      title: "About",
      path: "/AboutPage",
      subItems: [
        { name: "Story", path: "/AboutPage#ourstory" },
        { name: "Purpose", path: "/AboutPage#ourpurpose" },
        { name: "Mission", path: "/AboutPage#ourmission" },
        { name: "Vision", path: "/AboutPage#ourvision" },
      ],
    },
    {
      title: "Products",
      path: "/ProductPage",
      subItems: [{ name: "Marche Robo", path: "/ProductPage#marche-robo" }],
    },
    { title: "Videos", path: "/VideoPage", subItems: [] },
    {
      title: "BroadCast",
      path: "/NewsPage",
      subItems: [
        { name: "Social Media", path: "/NewsPage#social" },
        { name: "News & Events", path: "/NewsPage#newsandevents" },
      ],
    },
    { title: "Contact", path: "/ContactPage", subItems: [] },
  ];


  return (
    <nav
      className={`navbar ${isHovered ? "navbar-expanded" : isScrolled ? "navbar-small" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveMenu(null);
      }}
    >
      <div className={`logo-container1 ${isScrolled && !isHovered ? "hide-logo" : ""}`}>
        <Link href="/" onClick={scrollToTop}>
          <Image src={logo} alt="Logo" className="logo" />
        </Link>
      </div>

      <ul className="nav-list">
        {menuItems.map((item, index) => (
          <li key={index} className="nav-item" onMouseEnter={() => setActiveMenu(index)}>
            <Link href={item.path} className="nav-link" onClick={scrollToTop}>
              {item.title}
            </Link>

            {item.subItems.length > 0 && (
              <div className={`submenu ${activeMenu === index ? "show" : "hide"}`}>
                {item.subItems.map((sub, subIndex) => (
                  <div
                    key={subIndex}
                    className="submenu-item"
                    style={{ transitionDelay: `${subIndex * 0.1}s` }}
                  >
                    <Link href={sub.path}  className="submenu-link">
                      {sub.name}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;