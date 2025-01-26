import React, { useEffect } from 'react';
import '../css_files/homepagemain.css';
import shape from '../../assets/project_iship/shape.png';
import shape2 from '../../assets/project_iship/shape2.png';
import loading from '../../assets/project_iship/loading-removebg-preview.png';
import BackgrountForHome from '../../assets/project_iship/background_for_home3.png';
import bus from '../../assets/project_iship/bus_image13.png';

function ForHome() {

  useEffect(() => {
    const handleParallax = (e) => {
      document.querySelectorAll('.layer').forEach((layer) => {
        const speed = layer.getAttribute('data-speed');
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    };

    document.addEventListener('mousemove', handleParallax);

    return () => {
      document.removeEventListener('mousemove', handleParallax);
    };
  }, []);

  return (
    <div className='homeparent'>
      <div className='homechild1'>
        <img src={loading} data-speed="8" className='layer' alt="Loading" />
        <img src={BackgrountForHome}  />
      </div>
      <div className='homechild2'>
      <img src={shape} data-speed="2" className='layer1' alt="Man" /> 
      <img src={shape2} data-speed="6" className='layer2' alt="Message" />
        <img src={bus} alt="Bus" />
      </div>
    </div>
  );
}

export default ForHome;
