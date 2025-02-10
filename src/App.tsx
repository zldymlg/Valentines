import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import { auth, db } from "./firebase"; // Import Firestore
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAuth = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      if (isSignUp) {
        const signInMethods = await fetchSignInMethodsForEmail(auth, email);
        if (signInMethods.length > 0) {
          throw new Error("Email already in use. Please log in instead.");
        }

        // Create User
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Save user details in Firestore
        await setDoc(doc(db, "users", user.uid), {
          fullName: fullName,
          email: email,
          createdAt: serverTimestamp(),
        });

        window.location.href = "/letter.html";
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = "/intro.html";
      }
    } catch (error) {
      setErrorMessage("error pls try again");
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
          className="card p-4 shadow-lg border border-pink-300"
          style={{ width: "24rem", backgroundColor: "#ffe6f2" }}
        >
          <div className="card-body text-center">
            <h2 className="text-danger mb-4">
              {isSignUp ? "Sign Up" : "Log In"}
            </h2>

            {errorMessage && (
              <p className="text-danger small">{errorMessage}</p>
            )}

            <form className="d-grid gap-3" onSubmit={handleAuth}>
              {isSignUp && (
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              )}
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button className="btn btn-danger w-100">
                {isSignUp ? "Sign Up" : "Log In"}
              </button>
            </form>

            <p className="mt-3">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <span
                className="text-danger"
                style={{ cursor: "pointer" }}
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? " Log In" : " Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
