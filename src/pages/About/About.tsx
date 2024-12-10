import React from 'react'
import "./About.css"

interface AboutProps {
  isDarkMode: boolean;
}

const About: React.FC<AboutProps> = ({ isDarkMode }) => {
  return (
    <div className={`about-container ${isDarkMode ? 'dark' : 'light'}`}>
      <h1>About</h1>
      <p>This is a movie web app that displays trending movies and TV series of the day.</p>
    </div>
  )
}

export default About