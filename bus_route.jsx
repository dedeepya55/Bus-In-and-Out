import React from 'react';

const BusTimeline = ({ routes }) => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Bus Route Timeline</h2>
      <div style={{ position: 'relative', margin: '0 auto', maxWidth: '600px' }}>
        {routes.map((route, index) => (
          <div key={index} style={{ position: 'relative', marginBottom: '20px' }}>
            {/* Timeline Dot */}
            <div
              style={{
                position: 'absolute',
                left: '-10px',
                top: '0',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: 'pink',
                zIndex: 1,
              }}
            />
            {/* Vertical Line */}
            {index !== routes.length - 1 && (
              <div
                style={{
                  position: 'absolute',
                  left: '-2px',
                  top: '16px', // Adjusted to start just below the dot
                  width: '2px',
                  height: '40px', // Adjust height to control spacing between dots
                  background: 'red',
                }}
              />
            )}
            <div style={{ paddingLeft: '30px', borderLeft: '2px solid #007bff' }}>
              {/* <h4>{route.time}</h4> */}
              <p>{route.locations}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusTimeline;
