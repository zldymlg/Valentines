import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import { auth, db } from "./firebase"; // Import Firebase
import { doc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";

const LetterCreation: React.FC = () => {
  const [penname, setPenname] = useState("");
  const [toWhom, setToWhom] = useState("");
  const [letter, setLetter] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSendLetter = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!penname || !toWhom || !letter) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const userEmail = auth.currentUser?.email; // Get user email instead of UID

      if (!userEmail) {
        setError("You must be logged in to send a letter.");
        return;
      }

      const userRef = doc(db, "users", userEmail); // Reference user's document

      // Ensure user document exists before updating
      await setDoc(userRef, { letters: [] }, { merge: true });

      // Append new letter to Firestore
      await updateDoc(userRef, {
        letters: arrayUnion({
          penname,
          toWhom,
          letter,
          createdAt: new Date(),
        }),
      });

      // Clear the form after submission
      setPenname("");
      setToWhom("");
      setLetter("");
      setError("");
      setSuccess("Letter sent successfully! 💌");

      // Auto-hide success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error adding letter:", error);
      setError("An error occurred while sending the letter. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="card p-4 shadow-lg border border-danger"
          style={{ width: "24rem", backgroundColor: "#ffe6f2" }}
        >
          <div className="card-body text-center">
            <h2 className="text-danger mb-4">Create Your Letter</h2>
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}
            <form className="d-grid gap-3" onSubmit={handleSendLetter}>
              <input
                type="text"
                className="form-control border border-danger"
                placeholder="Penname"
                value={penname}
                onChange={(e) => setPenname(e.target.value)}
              />
              <input
                type="text"
                className="form-control border border-danger"
                placeholder="To Whom?"
                value={toWhom}
                onChange={(e) => setToWhom(e.target.value)}
              />
              <textarea
                className="form-control border border-danger"
                placeholder="Write your letter..."
                rows={4}
                value={letter}
                onChange={(e) => setLetter(e.target.value)}
              ></textarea>
              <button className="btn btn-danger w-100" type="submit">
                Send Letter 💖
              </button>
            </form>
          </div>
        </div>
        <div className="footer"></div>
      </motion.div>
    </div>
  );
};

export default LetterCreation;
