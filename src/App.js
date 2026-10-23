import React, { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./App.css";

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

function App() {
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
    <div className="app">
      <div className="app__bg" aria-hidden="true">
        <div className="app__blob app__blob--one" />
        <div className="app__blob app__blob--two" />
        <div className="app__blob app__blob--three" />
      </div>

      <main className="app__grid">
        <section className="hero">
          <h1 className="hero__title">Location QR Code Generator</h1>
          <p className="hero__subtitle">
            Create a scannable QR for any place in seconds.
          </p>

          <div className="hero__intro">
            <h2 className="hero__intro-title">What is this?</h2>
            <p className="hero__intro-text">
              Turn any address, landmark, or map link into a QR code people can
              scan with their phone camera. Scanning it opens the place directly
              in Google Maps — perfect for posters, invitations, signage, and
              wayfinding.
            </p>
          </div>
        </section>

        <aside className="generator-card">
          <div className="generator-card__header">
            <span className="generator-card__icon">
              <QrIcon />
            </span>
            <div>
              <h2 className="generator-card__title">Make your QR</h2>
              <p className="generator-card__hint">Ready to scan in one click.</p>
            </div>
          </div>

          <label className="generator-card__label" htmlFor="location-input">
            Enter Location
          </label>
          <div className="generator-card__input-wrap">
            <span className="generator-card__input-icon">
              <PinIcon />
            </span>
            <input
              id="location-input"
              className="generator-card__input"
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
            <p className="generator-card__error" role="alert">
              {error}
            </p>
          )}

          <button
            type="button"
            className="generator-card__generate"
            onClick={handleGenerate}
          >
            <QrIcon />
            Generate QR Code
          </button>

          {qrValue && (
            <div className="generator-card__result" ref={qrRef}>
              <div className="generator-card__frame">
                <QRCodeCanvas
                  value={qrValue}
                  size={208}
                  bgColor="#ffffff"
                  fgColor="#111111"
                  level="H"
                  includeMargin={true}
                />
              </div>
              <p className="generator-card__ready">
                <CheckIcon />
                QR ready — scan it with any phone camera
              </p>
              <a
                className="generator-card__maps-link"
                href={qrValue}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalIcon />
                View on Google Maps
              </a>
              <button
                type="button"
                className="generator-card__download"
                onClick={downloadQR}
              >
                <DownloadIcon />
                Download QR Code
              </button>
            </div>
          )}
        </aside>

        <ol className="steps">
          <li className="step">
            <div className="step__icon">
              <span className="step__num">1</span>
              <PinIcon />
            </div>
            <div className="step__body">
              <h3 className="step__title">Enter your location</h3>
              <p className="step__text">
                Type an address, place name, or paste a Google Maps link.
              </p>
            </div>
          </li>
          <li className="step">
            <div className="step__icon">
              <span className="step__num">2</span>
              <QrIcon />
            </div>
            <div className="step__body">
              <h3 className="step__title">Generate the QR</h3>
              <p className="step__text">
                Click the button and a scannable QR is created instantly.
              </p>
            </div>
          </li>
          <li className="step">
            <div className="step__icon">
              <span className="step__num">3</span>
              <DownloadIcon />
            </div>
            <div className="step__body">
              <h3 className="step__title">Download &amp; share</h3>
              <p className="step__text">
                Save the QR as a PNG and print or post it anywhere; scanning
                opens the location in Google Maps.
              </p>
            </div>
          </li>
        </ol>
      </main>
    </div>
  );
}

export default App;
