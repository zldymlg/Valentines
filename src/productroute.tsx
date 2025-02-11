import { Routes, Route } from "react-router-dom";
import AuthPage from "./AuthPage";
import LetterPage from "./letter";
import IntroPage from "./Intro";
import Product from "./product";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/letter" element={<LetterPage />} />
      <Route path="/intro" element={<IntroPage />} />
      <Route path="/product" element={<Product />} />
    </Routes>
  );
}

export default App;
