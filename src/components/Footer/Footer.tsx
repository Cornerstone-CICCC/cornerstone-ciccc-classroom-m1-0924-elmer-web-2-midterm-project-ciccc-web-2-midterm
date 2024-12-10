import React from 'react';
import './Footer.css';

interface FooterProps {
  isDarkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  return (
    <footer className={`footer-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="footer-content">
        <p>&copy; Movie App. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer