'use client';

import { useState } from "react";
import Modal from "@/components/Modal";

export default function ErrorPopup() {
  const [isError, setIsError] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        onClick={() => setIsError(true)}
        className="px-4 py-2 bg-red-500 text-white rounded-lg"
      >
        エラー発生！
      </button>

      <Modal isOpen={isError} onClose={() => setIsError(false)}>
        <h2 className="text-xl font-bold text-red-600">エラー</h2>
        <p>何か問題が発生しました…😭</p>
      </Modal>
    </div>
  );
}
