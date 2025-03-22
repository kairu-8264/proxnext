'use client';

import { useState } from "react";
import Modal from "@/components/Modal";

export default function TFAPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [code, setCode] = useState("");
  
    return (
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          2FA認証
        </button>
  
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <h2 className="text-xl font-bold">2要素認証</h2>
          <p>認証コードを入力してください。</p>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="mt-2 px-3 py-2 border rounded-lg w-full"
            placeholder="6桁のコード"
          />
          <button
            onClick={() => alert(`コード: ${code}`)}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg w-full"
          >
            認証する
          </button>
        </Modal>
      </div>
    );
  }