'use client';

import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-md">
      <div className="p-6 rounded-lg shadow-lg w-96 relative" style={{ backgroundColor: "var(--tertiaryContainer)" }}>
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 px-3 py-1 rounded-lg" style={{ color: "var(--onTertiaryContainer)" }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}