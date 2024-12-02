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
import PaymentView from "./views/user/PaymentView";
import AdminDashboardView from "./views/admin/AdminDashboardView";
import AdminCalendarView from "./views/admin/AdminCalendarView";
import AdminProductListView from "./views/admin/AdminProductListView";
import AddNewProductView from "./views/admin/AddNewProductView";
import EditProductView from "./views/admin/EditProductView";
import AdminOrderListView from "./views/admin/AdminOrderListView";
import AdminOrderDetailView from "./views/admin/AdminOrderDetailView";

function App() {
  const location = useLocation();
  const { showLoginModal, showOtpModal, showRegisterModal } = useModal();
  const { checkAuth } = useAuth();
  const [checkingAuth, setCheckingAuth] = useState(false);
  const { setTransitionColor } = useTransitionColor();
  const navigate = useNavigate();

  const routeColors: { [key: string]: "bg-secondary-200" | "bg-tetriary-100" | "bg-tetriary-300" | "bg-tetriary-500" } = {
    "/": "bg-secondary-200",
    "/about": "bg-secondary-200",
    "/calendar": "bg-secondary-200",
  };

  async function pathCheck(path: string) {
    setCheckingAuth(true);
    try {
      if (await checkAuth()) {
        navigate(path, { replace: true });
      } else {
        navigate("/not-found", { replace: true });
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
    if (!location.pathname.startsWith("/product")) {
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
            <Route path="/about" element={<AboutUsView />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/products" element={<ProductListView />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartView />} />
            <Route path="/cart/shipment" element={<PaymentView />} />
            <Route path="*" element={<NotFoundView />} />
            <Route path="admin" element={<AdminDashboardView />} />
            <Route path="admin/calendar" element={<AdminCalendarView />} />
            <Route path="admin/products" element={<AdminProductListView />} />
            <Route path="admin/product/add" element={<AddNewProductView />} />
            <Route path="admin/product/edit/:productId" element={<EditProductView />} />
            <Route path="admin/orders" element={<AdminOrderListView />} />
            <Route path="admin/orders/:purchaseId" element={<AdminOrderDetailView />} />
          </Routes>
        </AnimatePresence>
      }
      {!location.pathname.includes("/admin") && <Footer />}
    </>
  );
}

export default App;
