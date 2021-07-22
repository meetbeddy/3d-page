import React, { useRef, useEffect } from "react";
import gsap from "gsap";

function ThemeText() {
  const textRef = useRef(null);
  const mainRef = useRef(null);
  const buttonRef = useRef(null);
  useEffect(() => {
    gsap.from(textRef.current, {
      autoAlpha: 0,
      x: -100,
      y: 100,
      duration: 2,
      ease: "in",
      delay: 5,
    });
    gsap.set(mainRef.current, { x: "-101%" });
    gsap.timeline(mainRef.current, {
      repeat: 5,
      yoyo: true,
      repeatDelay: 2,
    });
    gsap.timeline().to(
      mainRef.current,
      1,
      {
        x: "0%",
        duration: 1.2,
      },
      "+=0.3"
    );

    gsap.from(buttonRef.current, {
      x: 100,
      y: 100,
      duration: 2,
      ease: "in",
      delay: 8,
    });
  }, []);
  return (
    <div className="container">
      <div className="main" ref={mainRef}>
        <h1 style={{ color: "red" }}>
          The Sky is Full of Dreams <br />
        </h1>
        <h2> think bigger, go beyond</h2>
      </div>
      <span ref={textRef} style={{ color: "red" }}>
        <h1>we can take you there</h1>
      </span>
      <div className="button" ref={buttonRef}>
        <button>Fly With Us </button>
      </div>
    </div>
  );
}

export default ThemeText;
