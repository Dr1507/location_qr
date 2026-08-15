import React, { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function QrIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="5" height="5" rx="1" />
      <rect x="16" y="3" width="5" height="5" rx="1" />
      <rect x="3" y="16" width="5" height="5" rx="1" />
      <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
      <path d="M21 21v.01" />
      <path d="M12 7v3a2 2 0 0 1-2 2H7" />
      <path d="M3 12h.01" />
      <path d="M12 3h.01" />
      <path d="M12 16v.01" />
      <path d="M16 12h1" />
      <path d="M21 12v.01" />
      <path d="M12 21v-1" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function LocationQR() {
  const qrRef = useRef();
  const [location, setLocation] = useState("");
  const [qrValue, setQrValue] = useState("");
  const [error, setError] = useState("");

  const buildMapsUrl = (text) => {
    const trimmed = text.trim();
    if (/^https?:\/\/.+/.test(trimmed)) {
      return trimmed;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      trimmed
    )}`;
  };

  const handleGenerate = () => {
    const trimmed = location.trim();
    if (!trimmed) {
      setError("Please enter your location first.");
      setQrValue("");
      return;
    }
    setError("");
    setQrValue(buildMapsUrl(trimmed));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleGenerate();
    }
  };

  const downloadQR = async () => {
    if (!qrValue) return;

    const baseName = location.trim().replace(/\s+/g, "-") || "location";
    const fileName = `${baseName}.png`;
    const mime = "image/png";
    const canvas = qrRef.current.querySelector("canvas");
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, mime));

    if (window.showSaveFilePicker) {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: fileName,
          types: [
            {
              description: "QR code image",
              accept: { [mime]: [".png"] },
            },
          ],
        });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        return;
      } catch (err) {
        if (err.name === "AbortError") return;
      }
    }

    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = fileName;
    downloadLink.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative flex h-screen h-[100dvh] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] px-6 py-4 text-[#e5e7eb] max-[900px]:px-5 max-[900px]:pb-8 max-[900px]:pt-14 [@media(min-width:901px)_and_(max-height:820px)]:justify-start [@media(min-width:901px)_and_(max-height:820px)]:pt-11">
      <main className="relative z-10 grid min-h-0 w-full max-w-[1060px] grid-cols-[1.1fr_1fr] items-center gap-11 max-[900px]:grid-cols-1 max-[900px]:gap-10 max-[900px]:max-w-[560px] [@media(min-width:901px)_and_(max-height:820px)]:gap-9">
        <section>
          <span className="inline-flex items-center gap-[9px] rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-[#e9d5ff]">
            <span className="h-[7px] w-[7px] rounded-full bg-[#fbbf24] shadow-[0_0_0_4px_rgba(251,191,36,0.18)]" />
            Free &amp; instant
          </span>

          <h1 className="mt-[18px] mb-[10px] bg-[linear-gradient(92deg,#ffffff_0%,#ffffff_58%,#fcd34d_88%,#fbbf24_100%)] bg-clip-text text-[clamp(2.2rem,5vw,3.4rem)] font-extrabold leading-[1.12] tracking-[-0.02em] text-transparent">
            Location QR Code Generator
          </h1>

          <p className="mb-[26px] text-[1.05rem] font-medium text-[#cbd5f1] [@media(min-width:901px)_and_(max-height:820px)]:mb-[18px]">
            Create a scannable QR for any place in seconds.
          </p>

          <div className="mb-7 rounded-2xl border border-white/10 bg-white/[0.06] p-[18px_20px] backdrop-blur [@media(min-width:901px)_and_(max-height:820px)]:mb-5 [@media(min-width:901px)_and_(max-height:820px)]:p-[14px_16px]">
            <h2 className="mb-1.5 text-[0.78rem] font-bold uppercase tracking-[0.08em] text-[#fbbf24]">
              What is this?
            </h2>
            <p className="text-[0.95rem] leading-[1.65] text-[#e5e7eb]">
              Turn any address, landmark, or map link into a QR code people can
              scan with their phone camera. Scanning it opens the place directly
              in Google Maps — perfect for posters, invitations, signage, and
              wayfinding.
            </p>
          </div>

          <ol className="grid gap-4">
            <li className="flex items-start gap-4 rounded-[18px] border border-white/[0.12] bg-white/[0.07] p-[18px_20px] backdrop-blur transition-all duration-300 ease-in-out hover:-translate-y-[3px] hover:border-white/25 hover:shadow-[0_14px_30px_-12px_rgba(0,0,0,0.5)] motion-safe:animate-[step-in_0.5s_ease_backwards] [@media(min-width:901px)_and_(max-height:820px)]:p-[14px_16px] max-[420px]:p-4 [&_svg]:h-[22px] [&_svg]:w-[22px]">
              <div className="relative grid h-[46px] w-[46px] shrink-0 place-items-center rounded-[14px] bg-[linear-gradient(135deg,#ee2a7b,#6228d7)] text-white shadow-[0_8px_18px_-6px_rgba(238,42,123,0.6)]">
                <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-[#fbbf24] text-[0.68rem] font-extrabold text-[#451a03] shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
                  1
                </span>
                <PinIcon />
              </div>
              <div className="min-w-0">
                <h3 className="mt-0.5 mb-1 text-base font-semibold text-white">
                  Enter your location
                </h3>
                <p className="text-[0.9rem] leading-[1.6] text-[#d1d5db]">
                  Type an address, place name, or paste a Google Maps link.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4 rounded-[18px] border border-white/[0.12] bg-white/[0.07] p-[18px_20px] backdrop-blur transition-all duration-300 ease-in-out hover:-translate-y-[3px] hover:border-white/25 hover:shadow-[0_14px_30px_-12px_rgba(0,0,0,0.5)] motion-safe:animate-[step-in_0.5s_ease_backwards] motion-safe:[animation-delay:100ms] [@media(min-width:901px)_and_(max-height:820px)]:p-[14px_16px] max-[420px]:p-4 [&_svg]:h-[22px] [&_svg]:w-[22px]">
              <div className="relative grid h-[46px] w-[46px] shrink-0 place-items-center rounded-[14px] bg-[linear-gradient(135deg,#ee2a7b,#6228d7)] text-white shadow-[0_8px_18px_-6px_rgba(238,42,123,0.6)]">
                <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-[#fbbf24] text-[0.68rem] font-extrabold text-[#451a03] shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
                  2
                </span>
                <QrIcon />
              </div>
              <div className="min-w-0">
                <h3 className="mt-0.5 mb-1 text-base font-semibold text-white">
                  Generate the QR
                </h3>
                <p className="text-[0.9rem] leading-[1.6] text-[#d1d5db]">
                  Click the button and a scannable QR is created instantly.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4 rounded-[18px] border border-white/[0.12] bg-white/[0.07] p-[18px_20px] backdrop-blur transition-all duration-300 ease-in-out hover:-translate-y-[3px] hover:border-white/25 hover:shadow-[0_14px_30px_-12px_rgba(0,0,0,0.5)] motion-safe:animate-[step-in_0.5s_ease_backwards] motion-safe:[animation-delay:200ms] [@media(min-width:901px)_and_(max-height:820px)]:p-[14px_16px] max-[420px]:p-4 [&_svg]:h-[22px] [&_svg]:w-[22px]">
              <div className="relative grid h-[46px] w-[46px] shrink-0 place-items-center rounded-[14px] bg-[linear-gradient(135deg,#ee2a7b,#6228d7)] text-white shadow-[0_8px_18px_-6px_rgba(238,42,123,0.6)]">
                <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-[#fbbf24] text-[0.68rem] font-extrabold text-[#451a03] shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
                  3
                </span>
                <DownloadIcon />
              </div>
              <div className="min-w-0">
                <h3 className="mt-0.5 mb-1 text-base font-semibold text-white">
                  Download &amp; share
                </h3>
                <p className="text-[0.9rem] leading-[1.6] text-[#d1d5db]">
                  Save the QR as a PNG and print or post it anywhere; scanning
                  opens the location in Google Maps.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <aside className="relative rounded-[24px] bg-white p-8 text-[#0f172a] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.45),0_12px_24px_-12px_rgba(0,0,0,0.3)] transition-transform duration-300 ease-in-out hover:-translate-y-[3px] before:absolute before:left-6 before:right-6 before:top-0 before:h-[3px] before:rounded-b-md before:bg-[linear-gradient(90deg,#f9ce34,#ee2a7b,#6228d7)] before:opacity-90 before:content-[''] [@media(min-width:901px)_and_(max-height:820px)]:p-[26px] max-[420px]:p-[24px_20px]">
          <div className="mb-6 flex items-center gap-3.5 [@media(min-width:901px)_and_(max-height:820px)]:mb-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[14px] bg-[linear-gradient(135deg,#dbeafe,#ede9fe)] text-[#3b82f6] [&_svg]:h-6 [&_svg]:w-6">
              <QrIcon />
            </span>
            <div>
              <h2 className="text-xl font-bold text-[#0f172a]">Make your QR</h2>
              <p className="mt-0.5 text-[0.85rem] text-[#64748b]">
                Ready to scan in one click.
              </p>
            </div>
          </div>

          <label
            className="mb-2 block text-[0.85rem] font-semibold text-[#475569]"
            htmlFor="location-input"
          >
            Enter Location
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b] [&_svg]:h-[18px] [&_svg]:w-[18px]">
              <PinIcon />
            </span>
            <input
              id="location-input"
              className="w-full rounded-xl border-[1.5px] border-[#e2e8f0] bg-[#f8fafc] py-[13px] pl-11 pr-3.5 text-[0.95rem] text-[#0f172a] outline-none transition-all duration-200 ease-in-out placeholder:text-[#64748b] hover:border-[#c7d2fe] focus:border-[#3b82f6] focus:bg-white focus:shadow-[0_0_0_4px_rgba(59,130,246,0.15)]"
              type="text"
              placeholder="e.g. Taj Mahal, Agra or paste a Google Maps link"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              spellCheck="false"
            />
          </div>

          {error && (
            <p
              className="mt-2.5 flex items-center gap-[7px] text-[0.82rem] font-medium text-[#ef4444] before:h-[6px] before:w-[6px] before:shrink-0 before:rounded-full before:bg-current before:content-['']"
              role="alert"
            >
              {error}
            </p>
          )}

          <button
            type="button"
            className="mt-4 flex w-full cursor-pointer items-center justify-center gap-[9px] rounded-xl bg-[linear-gradient(135deg,#3b82f6,#2563eb)] px-5 py-3.5 text-[0.98rem] font-semibold text-white shadow-[0_10px_22px_-8px_rgba(59,130,246,0.6)] transition-all duration-200 ease-in-out hover:-translate-y-px hover:bg-[linear-gradient(135deg,#2563eb,#1d4ed8)] hover:shadow-[0_14px_26px_-8px_rgba(37,99,235,0.65)] focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_rgba(59,130,246,0.4)] active:translate-y-0 [&_svg]:h-[18px] [&_svg]:w-[18px]"
            onClick={handleGenerate}
          >
            <QrIcon />
            Generate QR Code
          </button>

          {qrValue && (
            <div
              className="mt-6 animate-[result-in_0.45s_ease_both] border-t border-[#eef2f7] pt-6 [@media(min-width:901px)_and_(max-height:820px)]:mt-4 [@media(min-width:901px)_and_(max-height:820px)]:pt-4 [&_canvas]:block [&_canvas]:rounded-[10px]"
              ref={qrRef}
            >
              <div className="flex justify-center rounded-2xl border-2 border-dashed border-[#cbd5e1] bg-[#fafbfc] p-[18px]">
                <QRCodeCanvas
                  value={qrValue}
                  size={208}
                  bgColor="#ffffff"
                  fgColor="#111111"
                  level="H"
                  includeMargin={true}
                />
              </div>

              <p className="mt-3.5 flex items-center justify-center gap-[7px] text-[0.85rem] font-medium text-[#059669] [&_svg]:h-4 [&_svg]:w-4">
                <CheckIcon />
                QR ready — scan it with any phone camera
              </p>

              <a
                className="mt-3 flex items-center justify-center gap-[7px] text-[0.92rem] font-semibold text-[#3b82f6] no-underline hover:text-[#2563eb] hover:underline hover:underline-offset-[3px] focus-visible:rounded-md focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_rgba(59,130,246,0.3)] [&_svg]:h-4 [&_svg]:w-4"
                href={qrValue}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalIcon />
                View on Google Maps
              </a>

              <button
                type="button"
                className="mt-4 flex w-full cursor-pointer items-center justify-center gap-[9px] rounded-xl bg-[linear-gradient(135deg,#10b981,#059669)] px-5 py-3.5 text-[0.98rem] font-semibold text-white shadow-[0_10px_22px_-8px_rgba(16,185,129,0.55)] transition-all duration-200 ease-in-out hover:-translate-y-px hover:bg-[linear-gradient(135deg,#059669,#047857)] hover:shadow-[0_14px_26px_-8px_rgba(5,150,105,0.6)] focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_rgba(59,130,246,0.4)] active:translate-y-0 [&_svg]:h-[18px] [&_svg]:w-[18px]"
                onClick={downloadQR}
              >
                <DownloadIcon />
                Download QR Code
              </button>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
}

export default LocationQR;
