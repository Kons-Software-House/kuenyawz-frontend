import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import { useModal } from "./contexts/ModalContext";
import { useTransitionColor } from "./contexts/TransitionColorContext";
import Navbar from "./components/core/Navbar";
import Footer from "./components/core/Footer";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import LandingView from "./views/customer/LandingView";
import NotFoundView from "./views/customer/NotFoundView";
import AboutUsView from "./views/customer/AboutUsView";
import CalendarView from "./views/customer/CalendarView";
import ProductListView from "./views/customer/ProductListView";
import ProductDetailPage from "./views/customer/ProductDetailView";
import Sidebar from "./components/vendor/Sidebar";

function App() {
  const location = useLocation();
  const { showLoginModal, showRegisterModal } = useModal();
  const { setTransitionColor } = useTransitionColor();

  const routeColors: { [key: string]: "bg-secondary-200" | "bg-tetriary-100" | "bg-tetriary-300" | "bg-tetriary-500" } = {
    "/": "bg-secondary-200",
    "/tentang-kami": "bg-secondary-200",
    "/kalender": "bg-secondary-200",
  };

  useEffect(() => {
    if (!location.pathname.startsWith("/produk")) {
      setTransitionColor(routeColors[location.pathname] ?? "bg-secondary-200");
    }
    window.scrollTo(0, 0);
  }, [location, setTransitionColor]);

  return (
    <>
      {!location.pathname.includes("/vendor") && <Navbar />}
      {location.pathname.includes("/vendor") && <Sidebar />}
      {showLoginModal && <LoginModal />}
      {showRegisterModal && <RegisterModal />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingView />} />
          <Route path="/tentang-kami" element={<AboutUsView />} />
          <Route path="/kalender" element={<CalendarView />} />
          <Route path="/menu" element={<ProductListView />} />
          <Route path="/produk" element={<ProductDetailPage background="bg-tetriary-500" />} />
          <Route path="*" element={<NotFoundView />} />
          <Route path="vendor/dashboard" element={<></>} />
        </Routes>
      </AnimatePresence>
      {!location.pathname.includes("/vendor") && <Footer />}
    </>
  );
}

export default App;
