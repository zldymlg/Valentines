import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function AuthPage() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleAuth = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      if (isSignUp) {
        const signInMethods = await fetchSignInMethodsForEmail(auth, email);
        if (signInMethods.length > 0) {
          throw new Error("Email already in use. Please log in instead.");
        }

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          fullName,
          email,
          createdAt: serverTimestamp(),
        });

        navigate("/letter");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/intro");
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Error, please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
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
            <h2 className="text-danger mb-3">
              {isSignUp ? "Sign Up" : "Log In"}
            </h2>

            {errorMessage && (
              <p className="text-danger small">{errorMessage}</p>
            )}

            <form className="d-flex flex-column gap-2" onSubmit={handleAuth}>
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
              <button className="btn btn-danger w-100 mt-2" type="submit">
                {isSignUp ? "Sign Up" : "Log In"}
              </button>
            </form>

            <p className="mt-3">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <span
                className="text-danger"
                style={{ cursor: "pointer", fontWeight: "bold" }}
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? " Log In" : " Sign Up"}
              </span>
            </p>
          </div>
        </div>
        <div className="footer">
          <footer />
        </div>
      </motion.div>
    </div>
  );
}
