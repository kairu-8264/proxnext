'use client';

import { useState, useEffect } from 'react';
import { getLabels } from '@/app/utils/localization';

export default function Dashboard() {

  const [language, setLanguage] = useState<string>('en');

  useEffect(() => {
    const browserLanguage = navigator.language;
    setLanguage(browserLanguage);
  }, []);

  const currentLabels = getLabels(language);
  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      <div className="p-6 rounded-lg shadow-md w-96" style={{ backgroundColor: "var(--surface)", color: "var(--onBackground)" }}>
        <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: "var(--primary)" }}>{currentLabels.dashboard}</h2>
      </div>
    </div>
  );
}
