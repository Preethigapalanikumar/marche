"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import "./css/contactpage.css";
import ContactCards from "../components/ContactCards";
import emailImg from "../assets/contact/mail.png";
import internetImg from "../assets/contact/circle.png";
import locationImg from "../assets/contact/pin.png";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [purpose, setPurpose] = useState("");
  const [message, setMessage] = useState("");
  const cardDetails = [
    {
      img: "/email-8-svgrepo-com.svg",
      header: "Email",
      content: "Hi, our team is here to assist you, just mail us!",
      link: "info@marchehealthcare.org",
    },
    {
      img:"/globe-svgrepo-com.svg",
      header: "Join our Community",
      content:
        "Stay informed with our latest news and events. Follow us to be part of the conversation",
      link: [
        {
          lin: "https://www.linkedin.com/company/marche-healthcare/",
          img: (
            <motion.svg
              whileHover={{ scale: 1.2 }}
              // width="42"
              // height="35"
              className="logo-inside-logo-div"
              viewBox="0 0 24 24"
              // fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.25c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 12.25h-3v-5.5c0-1.38-.56-2-1.75-2-1.14 0-1.75.79-1.75 2v5.5h-3v-11h3v1.62c.41-.79 1.27-1.62 2.75-1.62 1.94 0 3.5 1.12 3.5 4.01v6.99z" />
            </motion.svg>
          ),
        },
        {
          lin: "https://x.com/info_march49738",
          img: (
            <motion.svg
              whileHover={{ scale: 1.2 }}
              // width="42"
              // height="35"
              className="logo-inside-logo-div"
              viewBox="0 0 24 24"
              // fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 4.56c-.89.39-1.84.65-2.84.77a4.92 4.92 0 0 0 2.17-2.71c-.94.56-1.97.96-3.08 1.18a4.89 4.89 0 0 0-8.32 4.45c-4.07-.2-7.68-2.15-10.1-5.1a4.87 4.87 0 0 0-.66 2.46c0 1.7.87 3.2 2.19 4.08-.81-.03-1.57-.25-2.23-.62v.06c0 2.38 1.69 4.36 3.93 4.81-.41.11-.84.17-1.28.17-.31 0-.61-.03-.91-.08.61 1.91 2.39 3.3 4.5 3.34a9.86 9.86 0 0 1-6.1 2.1c-.4 0-.79-.02-1.17-.07a13.94 13.94 0 0 0 7.56 2.21c9.05 0 14-7.5 14-14 0-.21 0-.42-.01-.63a9.9 9.9 0 0 0 2.45-2.53z"
                // fill="currentColor"
              />
            </motion.svg>
          ),
        },
        {
          lin: "https://www.instagram.com/invites/contact/?igsh=jcoo1221g882&utm_content=uh81aej",
          img: (
            <motion.svg
              whileHover={{ scale: 1.2 }}
              // width="42"
              // height="35"
              className="logo-inside-logo-div"
              viewBox="0 0 24 24"
              // fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.94.24 2.39.41.59.23 1.01.51 1.46.96.45.45.73.87.96 1.46.18.45.36 1.22.41 2.39.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.94-.41 2.39-.23.59-.51 1.01-.96 1.46-.45.45-.87.73-1.46.96-.45.18-1.22.36-2.39.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.94-.24-2.39-.41-.59-.23-1.01-.51-1.46-.96-.45-.45-.73-.87-.96-1.46-.18-.45-.36-1.22-.41-2.39-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.24-1.94.41-2.39.23-.59.51-1.01.96-1.46.45-.45.87-.73 1.46-.96.45-.18 1.22-.36 2.39-.41 1.27-.06 1.65-.07 4.85-.07zm0-2.16c-3.29 0-3.7.01-4.99.07-1.32.06-2.23.26-3.01.57-.87.34-1.61.8-2.36 1.55-.75.75-1.21 1.49-1.55 2.36-.31.78-.51 1.69-.57 3.01-.06 1.29-.07 1.7-.07 4.99s.01 3.7.07 4.99c.06 1.32.26 2.23.57 3.01.34.87.8 1.61 1.55 2.36.75.75 1.49 1.21 2.36 1.55.78.31 1.69.51 3.01.57 1.29.06 1.7.07 4.99.07s3.7-.01 4.99-.07c1.32-.06 2.23-.26 3.01-.57.87-.34 1.61-.8 2.36-1.55.75-.75 1.21-1.49 1.55-2.36.31-.78.51-1.69.57-3.01.06-1.29.07-1.7.07-4.99s-.01-3.7-.07-4.99c-.06-1.32-.26-2.23-.57-3.01-.34-.87-.8-1.61-1.55-2.36-.75-.75-1.49-1.21-2.36-1.55-.78-.31-1.69-.51-3.01-.57-1.29-.06-1.7-.07-4.99-.07zM12 5.84c-3.4 0-6.16 2.76-6.16 6.16s2.76 6.16 6.16 6.16 6.16-2.76 6.16-6.16-2.76-6.16-6.16-6.16zm0 10.32c-2.29 0-4.16-1.87-4.16-4.16s1.87-4.16 4.16-4.16 4.16 1.87 4.16 4.16-1.87 4.16-4.16 4.16zm6.48-10.64c-.77 0-1.4-.63-1.4-1.4s.63-1.4 1.4-1.4 1.4.63 1.4 1.4-.63 1.4-1.4 1.4z"
                // fill="currentColor"
              />
            </motion.svg>
          ),
        },
        {
          lin: "https://youtube.com/@marchehealthcare?si=Nktj1VOLNtZBrdmS",
          img: (
            <motion.svg
              whileHover={{ scale: 1.2 }}
              className="logo-inside-logo-div"
              // width="42"
              // height="42"
              viewBox="0 0 24 24"
              // fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.6 3.2c-.8-.3-2.8-.3-5.6-.3s-4.8 0-5.6.3c-.8.3-1.4.7-2 1.3-.5.5-1 1.2-1.3 2-.3.8-.3 2.8-.3 5.6s0 4.8.3 5.6c.3.8.7 1.4 1.3 2 .5.5 1.2 1 2 1.3.8.3 2.8.3 5.6.3s4.8 0 5.6-.3c.8-.3 1.4-.7 2-1.3.5-.5 1-1.2 1.3-2 .3-.8.3-2.8.3-5.6s0-4.8-.3-5.6c-.3-.8-.7-1.4-1.3-2-.5-.5-1.2-1-2-1.3zm-7.6 9.9v-5.4l4.6 2.7-4.6 2.7z"
                // fill="currentColor"
              />
            </motion.svg>
          ),
        },
      ],
    },
    {
      img:"location-pin-svgrepo-com.svg",
      header: "Locate us",
      content: "Find our office and location to reach us",
      link: {
        url: "https://maps.app.goo.gl/sS6HjUAPMz4iFf5t5",
        text: "13, Near Auroville, Pondicherry-Tindivanam highways, Thiruchitrambalam, Vanur, Tamilnadu-605111",
      },
    },
  ];
  return (
    <div>
      <section className="banner">
        <div className="banner-text">
          <h3>Contact us</h3>
          <p>
            Kindly submit you details and share your message to us, thankyou
          </p>
        </div>
      </section>
      <motion.section
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        id="cards"
        className="cards-in-contactpage"
      >
        {cardDetails.map((card) => (
          <ContactCards key={card.header} {...card} />
        ))}
      </motion.section>
      <section id="form">
        <div className="splitter">
          <form className="contact-form">
            <h3>Hello! Feel free to get in touch with us</h3>

            <p>
              Discover how we can support your needs by reaching out to us we're
              here to provide assistance and guidance.
            </p>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="purpose">Purpose</label>
              <select
                id="purpose"
                value={purpose}
                onChange={(event) => setPurpose(event.target.value)}
              >
                <option value="" disabled>
                  Select a purpose
                </option>
                <option value="Request-demo">Request a Demo</option>
                <option value="Purchase">Purchase</option>
                <option value="Career">Career Oportunity</option>
                <option value="Find-distributor">Find a Distributor</option>
                <option value="meeting">Meeting</option>
                {/* <option value="IFU-download">IFU Download</option> */}
                <option value="Others">Others</option>
              </select>
            </div>
            <div>
              <label htmlFor="message">
                Detailed message about selected purpose: {purpose}
              </label>
              <textarea
                type="text"
                id="message"
                rows={10}
                placeholder="Type your message..."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
            </div>

            <button type="button">Submit</button>
          </form>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="group-images"
          >
            <img src="./contact/contact-group-img.jpeg" alt="contact images" />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
