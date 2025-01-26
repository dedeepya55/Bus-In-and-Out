import React from "react";
import '../css_files/about_page.css';
import CountUp from 'react-countup';
import bus1Image from '../../assets/project_iship/statistics.png';
import { useState } from "react";
import ScrollTrigger from "react-scroll-trigger";
import blue_tick from '../../assets/project_iship/blue_tick_rbg.png';

function AboutPage() {
    
    const [counterState,setCounterState] =useState(false)
    return (
        <>
            <div className="AboutPage" id="AboutPage">
                <div className="AboutPage_div_left">
                    <p className="about-heading">About Us</p>
                    <p className="about-description">
                       Our website provides
                       <br/><br/>
                       <div className="about1">
                        <div className="img1_bt">
                            <img src={blue_tick}/>
                        </div>
                        <div className="info_about1">
                        Real-time Bus Tracking & Management
                        </div>
                       </div>
                       <div className="about1">
                        <div className="img1_bt">
                            <img src={blue_tick}/>
                        </div>
                        <div className="info_about1">
                        Reliable & Timely Information
                        </div>
                       </div>
                       <div className="about1">
                        <div className="img1_bt">
                            <img src={blue_tick}/>
                        </div>
                        <div className="info_about1">
                        Comprehensive Bus Management Tools
                        </div>
                       </div>
                       <div className="about1">
                        <div className="img1_bt">
                            <img src={blue_tick}/>
                        </div>
                        <div className="info_about1">
                        Commitment to Innovation & User Satisfaction
                        </div>
                       </div>
                  </p>
                </div>
                <div className="AboutPage_div_right">
                    <img src={bus1Image} alt="Bus" className="about-image" />
                </div>
            </div>
        </>
    );
}

export default AboutPage;