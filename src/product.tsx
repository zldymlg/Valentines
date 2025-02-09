import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase"; // Import Firebase config
import "./product.css";
import music from "./assets/kai.mp3";

const LoveMonthPage: React.FC = () => {
  const [message, setMessage] = useState("");
  const [penname, setPenname] = useState("");
  const [toWhom, setToWhom] = useState("");

  useEffect(() => {
    const fetchLetter = async () => {
      const user = auth.currentUser; // Get user state
      if (!user) return; // Avoid unnecessary Firestore calls

      const userRef = doc(db, "users", user.email!);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        const letters = data.letters || [];

        if (letters.length > 0) {
          const latestLetter = letters[letters.length - 1];
          setMessage(latestLetter.letter || "No message found.");
          setPenname(latestLetter.penname || "Anonymous");
          setToWhom(latestLetter.toWhom || "Someone Special");
        } else {
          setMessage("No letters found.");
        }
      } else {
        setMessage("No user data found.");
      }
    };

    // Wait for authentication state to change
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) fetchLetter();
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const envelope = document.querySelector(".envelope-wrapper");
    if (!envelope) return;

    const handleClick = () => {
      envelope.classList.toggle("flap");
    };

    envelope.addEventListener("click", handleClick);
    return () => envelope.removeEventListener("click", handleClick);
  }, []);

  // Floating Flowers Effect
  useEffect(() => {
    const flowerContainer = document.querySelector(".flowers");
    if (!flowerContainer) return;

    function createFlower() {
      let flower = document.createElement("div");
      flower.classList.add("flower");
      flower.innerHTML = "🌸";
      flower.style.position = "absolute";
      flower.style.left = `${Math.random() * 100}vw`;
      flower.style.animation = `floatFlower ${
        Math.random() * 10 + 10
      }s linear infinite`;
      flower.style.fontSize = `${Math.random() * 20 + 20}px`;
      // flowerContainer.appendChild(flower);

      setTimeout(() => flower.remove(), 10000);
    }

    const intervalId = setInterval(createFlower, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <audio id="bg-music" autoPlay loop>
        <source src={music} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div className="bubbles"></div>
      <div className="flowers"></div>

      <div className="container">
        <div className="envelope-wrapper">
          <div className="envelope">
            <div className="letter">
              <div className="text">
                <strong>Dear {toWhom},</strong>
                <p>{message}</p>
                <em>- {penname}</em>
              </div>
            </div>
          </div>
          <div className="heart"></div>
        </div>
      </div>
    </div>
  );
};

export default LoveMonthPage;
