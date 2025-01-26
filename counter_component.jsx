import React from "react";
import '../css_files/about_page.css';
import CountUp from 'react-countup';
import { useState } from "react";
import ScrollTrigger from "react-scroll-trigger";
function CounterCompo() {
    
    const [counterState,setCounterState] =useState(false)
    return (
        <>
        
        <div className="sample">
            <div className="counter_class">
            
                
                <ScrollTrigger onEnter={()=> setCounterState(true)} onExit={()=> setCounterState(false)}>
                <div className="counter_class_div">
                    <div className="bus_count">
                        <div className="bus_count_number">
                        { counterState &&
                            <CountUp start={0} end={50} duration={5} className="countup" ></CountUp>
                        }
                        </div>
                        <div className="bus_count_name">
                        Buses
                        </div>
                    </div>
                    <div className="driver_count">
                        <div className="driver_count_number">
                        { counterState &&
                            <CountUp start={0} end={30} duration={5} className="countup" />
                        }
                        </div>
                        <div className="driver_count_name">
                        Drivers
                        </div>
                    </div>
                    <div className="student_count">
                        <div className="student_count_number">
                        { counterState &&
                            <CountUp start={0} end={500} duration={5} className="countup" />
                        }
                        </div>
                        <div className="student_count_name">
                        Students
                        </div>
                    </div>
                </div>
            </ScrollTrigger>
            </div>
            </div>
        </>
      );
    }
    
    export default CounterCompo;