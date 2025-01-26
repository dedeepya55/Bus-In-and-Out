import React from "react";
import styles from "../css_files/footer_component.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.footerCol}>
            <h4>Address</h4>
            <ul>
              <li><a href="#">ADITYA UNIVERSITY</a></li>
              <li><a href="#">Aditya Nagar, ADB Road,</a></li>
              <li><a href="#">Surampalem - Pin:533437</a></li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h4>Contact</h4>
            <ul>
              <li><a href="#">Phone : 99897 76661</a></li>
              <li><a href="#">Whats App : +91 7036076661</a></li>
              <li><a href="#">Fax : 0884-2326203</a></li>
              <li><a href="#">E-mail : office@aec.edu.in</a></li>
            </ul>
          </div>
          <div className={styles.footerCol}>
          <h4>Get Help</h4>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Returns</a></li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h4>Follow Us</h4>
            <div className={styles.socialLinks}>
              <a href="https://www.facebook.com/AECaditya"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="https://x.com/AdityaEnggClg"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="https://www.instagram.com/aditya_engg_colleges/"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="https://www.linkedin.com/school/adityauniversity/posts/?feedView=all"><FontAwesomeIcon icon={faLinkedinIn} /></a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footerBg}>
        <div className={styles.footerBgOne}></div>
        <div className={styles.footerBgTwo}></div>
      </div>
    </footer>

  );
};

export default Footer;
