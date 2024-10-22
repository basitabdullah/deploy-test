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
            src="https://images.unsplash.com/photo-1717533564570-4ea91a5df160?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
