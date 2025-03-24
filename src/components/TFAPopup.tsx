'use client';

import { useState } from "react";
import Modal from "@/components/Modal";
import Cookies from "js-cookie";
import { useRouter } from 'nextjs-toploader/app';
import LoadingSpinner from "@/components/LoadingSpinner";

interface TFAPopupProps {
  isOpen: boolean;
  onClose: () => void;
  tfaToken: string;
  tfaUsername: string;
  tfaRealm: string;
}

export default function TFAPopup({ isOpen, onClose, tfaToken, tfaUsername, tfaRealm }: TFAPopupProps) {
  const [code, setCode] = useState('');

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleVerify = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/tfa-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: `${tfaUsername}@${tfaRealm}`,
          tfa_challenge: tfaToken,
          password: "totp:" + code
        })
      });
      const data = await response.json();

      if (data.data && data.data.ticket) {
        Cookies.set('token', data.data.ticket);
        router.push('/dashboard');
      } else {
        console.error('Error verifying TFA:', data);
      }
    } catch (error) {
      console.error('Error verifying TFA:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <LoadingSpinner />}
      <Modal isOpen={isOpen} onClose={onClose}>
        <h2 className="text-xl font-bold">2要素認証</h2>
        <p>認証コードを入力してください。</p>
        <input
          type="number"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="mt-2 px-3 py-2 border rounded-lg w-full"
          placeholder="6桁のコード"
        />
        <button onClick={handleVerify} className="mt-4 px-4 py-2 rounded-lg w-full" style={{ backgroundColor: "var(--onTertiaryContainer)", color: "var(--tertiaryContainer)" }}>
          認証する
        </button>
      </Modal>
    </div>
  );
}