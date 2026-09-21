import { useState } from "react";

export function CompanyLogo({ logoUrl, companyName }: { logoUrl?: string | null; companyName: string }) {
  const [failed, setFailed] = useState(false);

  if (!logoUrl || failed) {
    return (
      <div className="logo-fallback" aria-label={companyName}>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#9CA3AF" strokeWidth={1.5}>
          <circle cx="12" cy="12" r="10" />
          <ellipse cx="12" cy="12" rx="4.2" ry="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M4.5 7h15M4.5 17h15" />
        </svg>
      </div>
    );
  }

  return <img src={logoUrl} alt={companyName} onError={() => setFailed(true)} />;
}
