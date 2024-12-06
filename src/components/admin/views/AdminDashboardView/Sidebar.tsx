import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Logo from "../../../../assets/Navbar/Main.png"

export default function Sidebar() {
  return (
    <motion.div className="flex flex-col w-60 h-screen bg-secondary-400 text-black overflow-hidden shadow-md">
      <div className="flex items-center justify-center h-20 border-b border-secondary-100">
        <img src={Logo} alt="Logo" className="h-12" />
      </div>
      <nav className="flex flex-col items-start py-4">
        <Link to="/admin" className="flex items-center py-2 pl-4 pr-6 hover:bg-secondary-100 w-full">
          <span className="mr-2">
            [ ]
          </span>
          Dashboard
        </Link>
        <Link to="/admin/products" className="flex items-center py-2 pl-4 pr-6 hover:bg-secondary-100 w-full">
          <span className="mr-2">
            [ ]
          </span>
          Produk
        </Link>
        <Link to="/admin/orders" className="flex items-center py-2 pl-4 pr-6 hover:bg-secondary-100 w-full">
          <span className="mr-2">
            [ ]
          </span>
          Pesanan
        </Link>
        <Link to="/admin/history" className="flex items-center py-2 pl-4 pr-6 hover:bg-secondary-100 w-full">
          <span className="mr-2">
            [ ]
          </span>
          Riwayat Pesanan
        </Link>
        <Link to="/admin/calendar" className="flex items-center py-2 pl-4 pr-6 hover:bg-secondary-100 w-full">
          <span className="mr-2">
            [ ]
          </span>
          Kalender
        </Link>
      </nav>
    </motion.div>
  );
}