import React from "react";

const Hero = () => {
  // Use public image path; place herosection image at public/Images/herosection.png
  const bg = '/herosection.png';
  const style = {
    backgroundImage: `linear-gradient(rgba(6,6,8,0.45), rgba(6,6,8,0.45)), url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '60vh',
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <section className="hero" style={style}>
      <div className="hero-inner">
        <div className="hero-content">
         
        </div>
      </div>
    </section>
  );
};

export default Hero;
