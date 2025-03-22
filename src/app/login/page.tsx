'use client';

import { useState, useEffect } from 'react';
import { getLabels } from '@/app/utils/localization';
import { useRouter } from 'nextjs-toploader/app';
import Cookies from 'js-cookie';

import ErrorPopup from "@/components/ErrorPopup";
import TFAPopup from "@/components/TFAPopup";

export default function Login() {
  interface Realm {
    realm: string;
    type: string;
    comment: string;
  }

  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [realm, setRealm] = useState('');
  const [realms, setRealms] = useState<Realm[]>([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<string>('en');

  useEffect(() => {
    const browserLanguage = navigator.language;
    setLanguage(browserLanguage);
  }, []);

  useEffect(() => {
    async function fetchRealms() {
      try {
        const response = await fetch('/api/realms');
        const data = await response.json();
        setRealms(data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching realms:', error);
        setLoading(false);
      }
    }
    fetchRealms();
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, realm }),
      });
      const data = await response.json();
      if (data.data.ticket) {
        if (data.data.NeedTFA) {
          TFAPopup();
          return;
        }
        Cookies.set('token', data.data.ticket);
        router.push('/dashboard');
      }
      else {
        ErrorPopup();
      }
    }
    catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const currentLabels = getLabels(language);
  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      <div className="p-6 rounded-lg shadow-md w-96" style={{ backgroundColor: "var(--surface)", color: "var(--onBackground)" }}>
        <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: "var(--primary)" }}>{currentLabels.login}</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium" style={{ color: "var(--onSurface)" }}>{currentLabels.username}</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              style={{
                borderColor: "var(--outline)",
                backgroundColor: "var(--surfaceContainerLow)",
                color: "var(--onSurface)"
              }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder='root'
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium" style={{ color: "var(--onSurface)" }}>{currentLabels.password}</label>
            <input
              type="password"
              className="w-full p-2 border rounded mt-1"
              style={{
                borderColor: "var(--outline)",
                backgroundColor: "var(--surfaceContainerLow)",
                color: "var(--onSurface)"
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium" style={{ color: "var(--onSurface)" }}>{currentLabels.realm}</label>
            {loading ? (
              <p>{currentLabels.loadingRealms}</p>
            ) : (
              <select
                className="w-full p-2 border rounded mt-1"
                style={{
                  borderColor: "var(--outline)",
                  backgroundColor: "var(--surfaceContainerLow)",
                  color: "var(--onSurface)"
                }}
                value={realm}
                onChange={(e) => setRealm(e.target.value)}
                required
              >
                <option value="">{currentLabels.selectRealm}</option>
                {realms.map((r) => (
                  <option key={r.realm} value={r.realm}>
                    {r.comment} ({r.realm})
                  </option>
                ))}
              </select>
            )}
          </div>
          <button
            type="submit"
            className="w-full p-2 rounded"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--onPrimary)"
            }}
          >
            {currentLabels.login}
          </button>
        </form>
      </div>
    </div>
  );
}
