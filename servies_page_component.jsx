import React from "react";
import '../css_files/service_page.css';
import { FcStatistics } from "react-icons/fc";
import { MdOutlineFileDownload } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
let Service=()=>{
  return(<>
    <div className="servicediv">
      <div className="servicesub1">
          <div className="servicecards">
            <div className="servicecard1">
              <div className="servicecard1sub">
                <div className="circle">
                    <div className="circlesub"><MdAccessTime className="iconsta"/></div>
                </div>
                <div className="heading">
                  <p>In/Out Timing Updates</p>
                </div>
                <div className="text">
                  <p>Our real-time bus in/out tracking system allows you to see when buses arrive at or leave a station.our website ensures you always have the most accurate information at your fingertips.</p>
                </div>
              </div>
            </div>
            <div className="servicecard2">
            <div className="servicecard2sub">
            <div className="circle">
            <div className="circlesub2"><FcStatistics className="iconsta"/></div>
            </div>
                <div className="heading">
                  <p>Statistical Dashboards</p>
                </div>
                <div className="text">
                  <p>Our dynamic dashboard offers an in-depth look at bus performance, with key statistics displayed in easy-to-read charts.</p>
                </div>
            </div>
            <div className="servicecard3sub">
            <div className="circle">
            <div className="circlesub2"><MdOutlineFileDownload className="iconsta"/></div>
            </div>
                <div className="heading">
                  <p>Downloadable Statistics</p>
                </div>
                <div className="text">
                  <p>We also offer the convenience of downloading the statistical data displayed on our dashboard.</p>
                </div>
            </div>
            </div>
          </div>
      </div>
      <div className="servicesub2">
        <div className="servicesub2card">
          <div className="servicesub2card1">
            <p>OUR SERVICES</p>
          </div>
          <div className="servicesub2card2">
            <p>Welcome to our comprehensive Bus Dashboard and Timings service! </p>
          </div>
          <div className="servicesub2card3">
            <p>Our platform is designed to keep you updated with real-time bus schedules, routes, and insightful statistics to enhance your commuting experience.</p>
          </div>
          <div className="servicesub2button">
            <button className="servicebutton">Go to Dashboard</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
export default Service;