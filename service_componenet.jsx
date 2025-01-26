import React from "react";
import '../css_files/service.css';
import { FcStatistics } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { MdOutlineFileDownload, MdAccessTime } from "react-icons/md";

let Service = ({ onServiceClick }) => {
    const navigate = useNavigate();

    const handleClick = (serve) => {
        onServiceClick(serve); 
        navigate('/dashboard', { state: { dashboard: serve } }); 
    };

    return (
        <div className="services-container">
            <div className="service-items">
                <div className="service-info">
                    <h2>Our Services</h2>
                    <h1>Welcome to our comprehensive Bus Dashboard and Timings service!</h1>
                    <p>
                        Whether you run a small business or a large eCommerce store, we will provide professional services to meet your needs.
                    </p>
                </div>
                <div className="Service-items2">
                    <div className="service-item">
                        <div className="icon-div">
                            <div className="service-icon-wrapper">
                                <MdAccessTime className="service-icon" />
                            </div>
                        </div>
                        <h3 className="service-title">In/Out Timing Updates</h3>
                        <p className="service-description">
                            Our real-time bus in/out tracking system allows you to see when buses arrive at or leave a station.
                        </p>
                    </div>
                    <div className="service-item">
                        <div className="icon-div">
                            <div className="service-icon-wrapper">
                                <FcStatistics className="service-icon" />
                            </div>
                        </div>
                        <h3 className="service-title">Statistical Dashboards</h3>
                        <p className="service-description">
                            Our dynamic dashboard highlights bus performance with key metrics in clear, interactive charts, making data easy to understand at a glance.    
                        </p>
                    </div>
                    <div className="service-item">
                        <div className="icon-div">
                            <div className="service-icon-wrapper">
                                <MdOutlineFileDownload className="service-icon" />
                            </div>
                        </div>
                        <h3 className="service-title">Data Reports</h3>
                        <p className="service-description">
                            We offer easy downloads of all dashboard statistics in formats like PDF, Excel, or CSV for offline analysis. 
                        </p>
                    </div>
                </div>
                <div className="button2">
                    <button className="estimate-button" onClick={() => handleClick('YourService')}>View Dashboard</button>
                </div>
            </div>
        </div>
    );
};

export default Service;
