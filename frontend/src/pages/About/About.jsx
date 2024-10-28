import React from "react";
import "./About.scss";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import MetaData from "../../components/MetaData"
const About = () => {
  return (
    <div className="about">
      <MetaData title={"Meteor | About"} />

      <div className="about-sec-one">
        <div className="text-portion">
          <h1>Passionate About Building Exciting Projects.</h1>
          <p>fahim abdullah</p>
        </div>

        <div className="image-portion">
          <img
            src="https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_1280.jpg"
            alt="err"
          />
        </div>
      </div>

      <div className="social-media">
        <h1>Follow Us</h1>
        <div className="links">
          <a href="https://x.com/BASITAbdul15666">
            <BsTwitterX />
            Twitter
          </a>
          <a href="https://www.linkedin.com/in/fahim-abdullah-474900253/">
            <FaLinkedin />
            LinkedIn
          </a>
          <a href="https://github.com/basitabdullah">
            <FaGithub />
            Github
          </a>
        </div>

        <div className="paragraph">
          <p>Fahim Abdullah is a skilled web developer with expertise in React, Firebase, MERN stack, and full-stack development. He creates visually appealing, responsive applications while actively seeking jobs to enhance his programming skills.</p>
        </div>
      </div>
    </div>
  );
};

export default About;