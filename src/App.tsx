import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import LandingView from "./views/LandingView";

function App() {
  const location = useLocation();
  return (
    <>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingView />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
