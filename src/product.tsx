import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import "./product.css";
import music from "./assets/kai.mp3";

const LoveMonthPage: React.FC = () => {
  const [message, setMessage] = useState("");
  const [penname, setPenname] = useState("");
  const [toWhom, setToWhom] = useState("");
  const [isFlapOpen, setIsFlapOpen] = useState(false);

  useEffect(() => {
    const fetchLetter = async () => {
      const user = auth.currentUser;
      if (!user) return;

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

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) fetchLetter();
    });

    return () => unsubscribe();
  }, []);

  // ✅ FIX: Properly toggle flap with state
  const handleEnvelopeClick = () => {
    setIsFlapOpen((prev) => !prev);
  };

  return (
    <div>
      <audio id="bg-music" autoPlay loop>
        <source src={music} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div className="bubbles"></div>
      <div className="flowers"></div>

      <div className="container">
        <div
          className={`envelope-wrapper ${isFlapOpen ? "flap" : ""}`}
          onClick={handleEnvelopeClick}
        >
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
      <div className="footer"></div>
    </div>
  );
};

export default LoveMonthPage;
