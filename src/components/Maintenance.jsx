import React from 'react';
import './Maintenance.css';

const AnimatedRobot = () => (
  <div className="robot-svg-wrapper">
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="robot-svg">
      {/* Background Glow */}
      <circle cx="200" cy="200" r="160" fill="var(--surface-light)" opacity="0.6" className="pulse-glow" />
      
      {/* Gears turning in background */}
      <g className="gear-spin-slow" transform="translate(110, 260)">
        <path d="M20,0 L25,10 L35,10 L30,20 L40,30 L30,35 L30,45 L20,40 L10,45 L10,35 L0,30 L10,20 L5,10 L15,10 Z" fill="var(--border-color)" transform="translate(-20, -20) scale(1.8)" />
        <circle cx="0" cy="0" r="12" fill="var(--bg-color)" />
      </g>
      <g className="gear-spin-fast" transform="translate(290, 170)">
        <path d="M20,0 L25,10 L35,10 L30,20 L40,30 L30,35 L30,45 L20,40 L10,45 L10,35 L0,30 L10,20 L5,10 L15,10 Z" fill="var(--accent-color)" opacity="0.5" transform="translate(-20, -20) scale(1.2)" />
        <circle cx="0" cy="0" r="8" fill="var(--bg-color)" />
      </g>

      {/* Robot Base/Wheels */}
      <rect x="140" y="300" width="120" height="30" rx="15" fill="var(--text-color)" />
      <circle cx="155" cy="315" r="8" fill="var(--bg-color)" className="wheel-spin" />
      <circle cx="200" cy="315" r="8" fill="var(--bg-color)" className="wheel-spin" />
      <circle cx="245" cy="315" r="8" fill="var(--bg-color)" className="wheel-spin" />

      {/* Body */}
      <rect x="160" y="180" width="80" height="110" rx="20" fill="var(--accent-color)" />
      <rect x="175" y="200" width="50" height="70" rx="10" fill="rgba(255,255,255,0.25)" />
      
      {/* Neck */}
      <rect x="190" y="160" width="20" height="25" fill="var(--text-muted)" />
      
      {/* Head (Grouped for bobbing) */}
      <g className="head-bob">
        <rect x="140" y="90" width="120" height="80" rx="30" fill="var(--accent-color)" />
        
        {/* Face/Screen */}
        <rect x="155" y="105" width="90" height="50" rx="15" fill="var(--text-color)" />
        
        {/* Eyes */}
        <circle cx="180" cy="130" r="10" fill="var(--bg-color)" className="eye-blink" />
        <circle cx="220" cy="130" r="10" fill="var(--bg-color)" className="eye-blink" />

        {/* Antenna */}
        <line x1="200" y1="90" x2="200" y2="40" stroke="var(--text-muted)" strokeWidth="6" strokeLinecap="round" />
        <circle cx="200" cy="40" r="12" fill="var(--accent-dark)" className="antenna-glow" />
      </g>

      {/* Left Arm */}
      <rect x="130" y="190" width="25" height="75" rx="12.5" fill="var(--accent-dark)" transform="rotate(20, 142, 200)" />
      
      {/* Right Arm (Working with Wrench) */}
      <g className="arm-work" transform-origin="252px 200px">
        <rect x="240" y="190" width="25" height="80" rx="12.5" fill="var(--accent-dark)" />
        {/* Hand/Claw */}
        <path d="M240 260 C 230 290, 275 290, 265 260" fill="var(--text-color)" strokeWidth="5" />
        {/* Wrench */}
        <g transform="translate(252, 275) rotate(-60)">
          <rect x="-8" y="-15" width="16" height="60" rx="5" fill="var(--text-muted)" />
          <circle cx="0" cy="-15" r="16" fill="var(--text-muted)" />
          <circle cx="0" cy="-15" r="8" fill="var(--bg-color)" />
          <path d="M-16 -30 L16 -30 L16 -12 L-16 -12 Z" fill="var(--bg-color)" />
        </g>
      </g>

      {/* Control Panel it's working on */}
      <rect x="270" y="240" width="70" height="90" rx="10" fill="var(--text-color)" />
      <rect x="280" y="255" width="50" height="8" rx="4" fill="var(--accent-color)" />
      <rect x="280" y="275" width="50" height="8" rx="4" fill="var(--border-color)" />
      <rect x="280" y="295" width="20" height="20" rx="4" fill="var(--surface-color)" />
      <circle cx="315" cy="305" r="8" fill="var(--accent-color)" className="pulse-glow" />
    </svg>
  </div>
);

const Maintenance = () => {
  return (
    <div className="maintenance-container">
      <div className="maintenance-content">
        <AnimatedRobot />
        
        <h1 className="maintenance-title">Under Construction</h1>
        <p className="maintenance-text">
          Our website is currently undergoing scheduled maintenance. 
          We're working hard to bring you a better experience. 
          Please check back soon!
        </p>
        
        <div className="maintenance-progress">
          <div className="maintenance-progress-bar"></div>
        </div>
        
        <button className="btn" onClick={() => window.location.reload()}>
          Refresh Page
        </button>
      </div>
    </div>
  );
};

export default Maintenance;
