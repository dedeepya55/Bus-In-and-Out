import React, { useState, useEffect } from 'react';
import styles from '../css_files/arrow.module.css';
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.pageYOffset > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`${styles.toTop} ${isVisible ? styles.active : ''}`}
      aria-label="Back to Top"
    >
      <FaArrowUp />
    </button>
  );
};

export default ScrollToTop;
