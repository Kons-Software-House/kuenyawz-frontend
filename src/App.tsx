import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useNavigate, Route, Routes, useLocation } from "react-router-dom";
import { useModal } from "./contexts/ModalContext";
import { useTransitionColor } from "./contexts/TransitionColorContext";
import { useAuth } from "./contexts/AuthContext";
import Navbar from "./components/user/core/Navbar";
import Footer from "./components/user/core/Footer";
import LoginModal from "./components/user/modals/LoginModal";
import OtpModal from "./components/user/modals/OtpModal";
import RegisterModal from "./components/user/modals/RegisterModal";
import LandingView from "./views/user/LandingView";
import NotFoundView from "./views/user/NotFoundView";
import AboutUsView from "./views/user/AboutUsView";
import CalendarView from "./views/user/CalendarView";
import ProductListView from "./views/user/ProductListView";
import ProductDetailPage from "./views/user/ProductDetailView";
import CartView from "./views/user/CartView";
import AdminDashboardView from "./views/admin/AdminDashboardView";
import AdminCalendarView from "./views/admin/AdminCalendarView";
import AdminProductListView from "./views/admin/AdminProductListView";
import AddNewProductView from "./views/admin/AddNewProductView";
import EditProductView from "./views/admin/EditProductView";

function App() {
  const location = useLocation();
  const { showLoginModal, showOtpModal, showRegisterModal } = useModal();
  const { checkAuth } = useAuth();
  const [checkingAuth, setCheckingAuth] = useState(false);
  const { setTransitionColor } = useTransitionColor();
  const navigate = useNavigate();

  const routeColors: { [key: string]: "bg-secondary-200" | "bg-tetriary-100" | "bg-tetriary-300" | "bg-tetriary-500" } = {
    "/": "bg-secondary-200",
    "/tentang-kami": "bg-secondary-200",
    "/kalender": "bg-secondary-200",
  };

  async function pathCheck(path: string) {
    setCheckingAuth(true);
    try {

      if (await checkAuth()) {
        navigate(path);
      } else {
        navigate("/not-found");
      }
    } finally {
      setCheckingAuth(false);
    }
  }

  useEffect(() => {
    if (location.pathname.startsWith("/admin")) {
      pathCheck(location.pathname);
    }
  }, [location.pathname]);

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
      {showOtpModal && <OtpModal />}
      {showRegisterModal && <RegisterModal />}
      {checkingAuth ? <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      </div> :
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingView />} />
            <Route path="/tentang-kami" element={<AboutUsView />} />
            <Route path="/kalender" element={<CalendarView />} />
            <Route path="/menu" element={<ProductListView />} />
            <Route path="/produk/:productId" element={<ProductDetailPage />} />
            <Route path="/keranjang" element={<CartView />} />
            <Route path="*" element={<NotFoundView />} />
            <Route path="admin/dashboard" element={<AdminDashboardView />} />
            <Route path="admin/kalender" element={<AdminCalendarView />} />
            <Route path="admin/produk" element={<AdminProductListView />} />
            <Route path="admin/produk/tambah" element={<AddNewProductView />} />
            <Route path="admin/produk/edit/:productId" element={<EditProductView />} />
          </Routes>
        </AnimatePresence>
      }
      {!location.pathname.includes("/admin") && <Footer />}
    </>
  );
}

export default App;
