import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import { useModal } from "./contexts/ModalContext";
import { useTransitionColor } from "./contexts/TransitionColorContext";
import Navbar from "./components/user/core/Navbar";
import Footer from "./components/user/core/Footer";
import LoginModal from "./components/user/modals/LoginModal";
import RegisterModal from "./components/user/modals/RegisterModal";
import LandingView from "./views/user/LandingView";
import NotFoundView from "./views/user/NotFoundView";
import AboutUsView from "./views/user/AboutUsView";
import CalendarView from "./views/user/CalendarView";
import ProductListView from "./views/user/ProductListView";
import ProductDetailPage from "./views/user/ProductDetailView";
import AdminDashboardView from "./views/admin/AdminDashboardView";
import AdminProductListView from "./views/admin/AdminProductListView";
import AddNewProductView from "./views/admin/AddNewProductView";

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
      {!location.pathname.includes("/admin") && <Navbar />}
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
          <Route path="admin/dashboard" element={<AdminDashboardView />} />
          <Route path="admin/produk" element={<AdminProductListView />} />
          <Route path="admin/produk/tambah" element={<AddNewProductView />} />
        </Routes>
      </AnimatePresence>
      {!location.pathname.includes("/admin") && <Footer />}
    </>
  );
}

export default App;
