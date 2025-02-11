import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Intro.css";
import Music from "./assets/akonalang.mp3";

function App() {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.play().catch((error) => {
        console.log("Error playing audio:", error);
      });
    }
  }, []);

  const [x, setX] = useState<number>(52);
  const [y, setY] = useState<number>(55);
  const [gif, setGif] = useState<string | null>(null);

  const body = document.querySelector("body") as HTMLBodyElement | null;

  useEffect(() => {
    if (!body) {
      console.error("Body element not found.");
      return;
    }

    const createFlower = (): void => {
      const flower = document.createElement("div");
      flower.className = "flower";
      flower.textContent = "🌸";
      flower.style.left = Math.random() * 90 + "vw";
      flower.style.animationDuration = Math.random() * 4 + 4 + "s";
      flower.style.animation = "fallDown 5s linear infinite";

      body.appendChild(flower);
      setTimeout(() => {
        flower.remove();
      }, 5000);
    };

    const flowerInterval = setInterval(createFlower, 100);
    return () => clearInterval(flowerInterval);
  }, [body]);

  function moveNoButton(): void {
    setX(Math.random() * 100);
    setY(Math.random() * 100);

    const gifs = [
      "https://media.giphy.com/media/XYEEvoX0Ub69ZgN9ai/giphy.gif",
      "https://media.giphy.com/media/K6WIhJ07gwGkIAQfwN/giphy.gif",
      "https://media.giphy.com/media/dI53rvCkTsyJWFA3Fc/giphy.gif",
    ];
    setGif(gifs[Math.floor(Math.random() * gifs.length)]);

    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log("Error playing audio:", error);
      });
    }
  }

  function handleYesClick(event: React.FormEvent) {
    event.preventDefault(); //
    navigate("/product"); //
  }

  // Define button styles
  const noStyle: React.CSSProperties = {
    left: `${x}%`,
    top: `${y}%`,
    position: "absolute",
  };

  const yesStyle: React.CSSProperties = {
    left: "40%",
    top: "55%",
    position: "absolute",
  };

  const gifStyle: React.CSSProperties = {
    display: "block",
    margin: "0 auto",
    width: "150px",
    height: "auto",
    position: "absolute",
    top: "15%",
    left: "50%",
    transform: "translateX(-50%)",
    paddingBottom: "10px",
  };

  return (
    <React.Fragment>
      <audio id="bg-music" ref={audioRef} autoPlay loop>
        <source src={Music} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <>
        {gif && <img src={gif} alt="Funny reaction" style={gifStyle} />}
        <p className="pre-valentine">Will you be my</p>
        <p className="valentine">Valentine</p>
        <form onSubmit={handleYesClick}>
          <button style={yesStyle} type="submit">
            YES!
          </button>
        </form>
        <button
          onMouseOver={moveNoButton}
          onClick={moveNoButton}
          style={noStyle}
        >
          no
        </button>
      </>
      <div className="footer"></div>
    </React.Fragment>
  );
}

export default App;
