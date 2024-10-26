import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/core/Navbar";
import LandingView from "./views/LandingView";
import AboutUsView from "./views/AboutUsView";
import CalendarView from "./views/CalendarView";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingView />} />
          <Route path="/tentang-kami" element={<AboutUsView />} />
          <Route path="/kalender" element={<CalendarView />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
