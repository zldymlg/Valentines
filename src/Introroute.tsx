import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IntroPage from "./Intro";
import LetterCreation from "./letter";
import Login from "./AuthPage";
import Product from "./product";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/letter" element={<LetterCreation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </Router>
  );
}

export default App;
