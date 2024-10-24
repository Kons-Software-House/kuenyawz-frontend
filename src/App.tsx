import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/core/Navbar";
import AboutUsView from "./views/AboutUsView";

function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/tentang-kami" element={<AboutUsView />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App
