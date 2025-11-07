import React from "react";

const Hero = () => {
  // Use public image path; place herosection image at public/Images/herosection.png
  const bg = '/herosection.png';
  const style = {
    backgroundImage: `linear-gradient(rgba(6,6,8,0.45), rgba(6,6,8,0.45)), url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <section className="hero" style={style}>
      <div className="hero-inner">
        <div className="hero-content">
          <h1>Discover Your Local Music Scene</h1>
          <p>
            Connect with talented artists, get exclusive merchandise, and be part of our vibrant music community. Support local talent and wear your passion.
          </p>
          <a href="#merch" className="btn">Shop Merch</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
