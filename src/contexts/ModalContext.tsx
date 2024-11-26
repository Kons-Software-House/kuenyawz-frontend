import { createContext, useContext, useState, ReactNode } from 'react';

type ModalContextType = {
  showLoginModal: boolean;
  showOtpModal: boolean;
  showRegisterModal: boolean;
  showImageCropperModal: boolean;
  showAddToCartModal: boolean;
  setShowLoginModal: (show: boolean) => void;
  setShowOtpModal: (show: boolean) => void;
  setShowRegisterModal: (show: boolean) => void;
  setShowImageCropperModal: (show: boolean) => void;
  setShowAddToCartModal: (show: boolean) => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showImageCropperModal, setShowImageCropperModal] = useState(false);
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);

  return (
    <ModalContext.Provider value={{ showLoginModal, showOtpModal, showRegisterModal, showImageCropperModal, showAddToCartModal, setShowLoginModal, setShowOtpModal, setShowRegisterModal, setShowImageCropperModal, setShowAddToCartModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
