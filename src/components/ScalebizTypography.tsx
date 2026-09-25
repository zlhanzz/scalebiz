import React from "react";

interface ScalebizTypographyProps {
  variant: "fill" | "stroke";
  className?: string;
}

// Geometri vektor presisi Montserrat 900 Black hasil fusi kontur bersih (clean single-contour)
// Huruf A: Kontur luar 8-titik terpadu + lubang counter trapesium mandiri (tanpa overlap crossbar)
// Huruf E: 12-point polygon tunggal tanpa overlapping sub-path atau sekat vertikal internal
// Huruf B: Kontur luar lengkung tanpa loop tumpang tindih di pinggang + 2 counter lubang mandiri tanpa notch di batang
// Huruf Z: 10-point single polygon non-self-intersecting tanpa tumpang tindih diagonal
const SCALEBIZ_GLYPHS = [
  {
    char: "S",
    d: "M31.80,76.60L31.80,76.60Q23.00,76.60 14.80,74.60Q6.60,72.60 1.30,69.40L1.30,69.40L8.90,52.20Q13.90,55.10 20.05,56.85Q26.20,58.60 32.00,58.60L32.00,58.60Q35.40,58.60 37.35,58.15Q39.30,57.70 40.20,56.85Q41.10,56.00 41.10,54.80L41.10,54.80Q41.10,52.90 39.00,51.80Q36.90,50.70 33.45,49.95Q30.00,49.20 25.90,48.35Q21.80,47.50 17.65,46.10Q13.50,44.70 10.05,42.40Q6.60,40.10 4.50,36.35Q2.40,32.60 2.40,27.00L2.40,27.00Q2.40,20.50 6.05,15.15Q9.70,9.80 16.95,6.60Q24.20,3.40 35.00,3.40L35.00,3.40Q42.10,3.40 49.00,4.90Q55.90,6.40 61.40,9.50L61.40,9.50L54.30,26.60Q49.10,24.00 44.25,22.70Q39.40,21.40 34.80,21.40L34.80,21.40Q31.40,21.40 29.40,22.00Q27.40,22.60 26.55,23.60Q25.70,24.60 25.70,25.80L25.70,25.80Q25.70,27.60 27.80,28.65Q29.90,29.70 33.35,30.40Q36.80,31.10 40.95,31.90Q45.10,32.70 49.20,34.10Q53.30,35.50 56.75,37.80Q60.20,40.10 62.30,43.80Q64.40,47.50 64.40,53.00L64.40,53.00Q64.40,59.40 60.75,64.75Q57.10,70.10 49.90,73.35Q42.70,76.60 31.80,76.60Z",
  },
  {
    char: "C",
    d: "M112.60,76.60L112.60,76.60Q104.20,76.60 97.05,73.95Q89.90,71.30 84.65,66.40Q79.40,61.50 76.50,54.80Q73.60,48.10 73.60,40.00L73.60,40.00Q73.60,31.90 76.50,25.20Q79.40,18.50 84.65,13.60Q89.90,8.70 97.05,6.05Q104.20,3.40 112.60,3.40L112.60,3.40Q122.90,3.40 130.85,7.00Q138.80,10.60 144.00,17.40L144.00,17.40L129.10,30.70Q126.00,26.80 122.25,24.65Q118.50,22.50 113.80,22.50L113.80,22.50Q110.10,22.50 107.10,23.70Q104.10,24.90 101.95,27.20Q99.80,29.50 98.60,32.75Q97.40,36.00 97.40,40.00L97.40,40.00Q97.40,44.00 98.60,47.25Q99.80,50.50 101.95,52.80Q104.10,55.10 107.10,56.30Q110.10,57.50 113.80,57.50L113.80,57.50Q118.50,57.50 122.25,55.35Q126.00,53.20 129.10,49.30L129.10,49.30L144.00,62.60Q138.80,69.30 130.85,72.95Q122.90,76.60 112.60,76.60Z",
  },
  {
    char: "A",
    // 100% clean unified A: kontur luar 8-titik + lubang counter trapesium mandiri tanpa overlap
    d: "M147.50,75.00L178.10,5.00L201.30,5.00L231.90,75.00L207.50,75.00L204.72,62.80L174.28,62.80L171.50,75.00ZM178.15,45.80L184.90,16.20L194.10,16.20L200.85,45.80Z",
  },
  {
    char: "L",
    d: "M295.90,75.00L240.70,75.00L240.70,5.00L264.30,5.00L264.30,56.70L295.90,56.70L295.90,75.00Z",
  },
  {
    char: "E",
    // 100% clean 12-point polygon: lengan tengah menyatu mulus ke tiang utama tanpa sekat vertikal internal
    d: "M307.40,5.00L365.60,5.00L365.60,22.80L330.60,22.80L330.60,32.00L360.20,32.00L360.20,49.00L330.60,49.00L330.60,57.20L364.30,57.20L364.30,75.00L307.40,75.00Z",
  },
  {
    char: "B",
    // 100% clean outer perimeter (titik temu tajam pinggang) + 2 lubang counter mandiri tanpa celah notch di batang
    d: "M379.70,75.00L379.70,5.00L417.10,5.00Q431.60,5.00 438.50,10.15Q445.40,15.30 445.40,23.30Q445.40,28.60 442.45,32.75Q439.50,36.90 435.75,38.43Q442.20,40.90 445.45,45.25Q448.70,49.60 448.70,55.70Q448.70,64.80 441.15,69.90Q433.60,75.00 419.10,75.00ZM402.90,58.50L402.90,47.50L417.10,47.50Q421.00,47.50 422.95,48.90Q424.90,50.30 424.90,53.00Q424.90,55.70 422.95,57.10Q421.00,58.50 417.10,58.50ZM402.90,31.90L402.90,21.50L413.90,21.50Q417.90,21.50 419.75,22.80Q421.60,24.10 421.60,26.70Q421.60,29.20 419.75,30.55Q417.90,31.90 413.90,31.90Z",
  },
  {
    char: "I",
    d: "M485.60,75.00L462.00,75.00L462.00,5.00L485.60,5.00L485.60,75.00Z",
  },
  {
    char: "Z",
    // 100% clean 10-point non-self-intersecting single polygon tanpa tumpang tindih diagonal
    d: "M500.50,5.00L562.20,5.00L562.20,19.50L530.24,56.70L563.80,56.70L563.80,75.00L499.50,75.00L499.50,60.50L531.46,23.30L500.50,23.30Z",
  },
];

export default function ScalebizTypography({ variant, className }: ScalebizTypographyProps) {
  if (variant === "fill") {
    return (
      <svg
        viewBox="0 0 570 80"
        className={`backdrop-name-svg backdrop-name-fill ${className || ""}`}
        fill="#037cfd"
        fillRule="evenodd"
        style={{ overflow: "visible" }}
        aria-hidden="true"
      >
        {SCALEBIZ_GLYPHS.map((glyph) => (
          <path key={`fill-${glyph.char}`} d={glyph.d} />
        ))}
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 570 80"
      className={`backdrop-name-svg backdrop-name-stroke ${className || ""}`}
      fill="none"
      stroke="#037cfd"
      strokeWidth={2.2}
      strokeLinejoin="round"
      strokeLinecap="round"
      style={{ overflow: "visible" }}
      aria-hidden="true"
    >
      <defs>
        {/* Mask Vertikal Lembut Khusus Huruf B:
            - Area Atas (Y: 0% - 22%): Transparan 100% melindungi jari tangan & tablet case
            - Transisi Sangat Halus (Y: 22% - 50%): Gradasi lembut tanpa potongan kasar
            - Area Bawah (Y: 50% - 100%): 100% Opaque menyatu indah di atas pakaian */}
        <linearGradient id="mask-b-hand-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <stop offset="22%" stopColor="#000000" stopOpacity="0" />
          <stop offset="32%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="42%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
        </linearGradient>
        <mask id="letter-b-hand-mask" maskContentUnits="objectBoundingBox">
          <rect x="0" y="0" width="1" height="1" fill="url(#mask-b-hand-gradient)" />
        </mask>

        {/* Filter Glow SVG Unbounded: Menghilangkan clipping horizontal, pendaran warna murni #037cfd identik dengan huruf background */}
        <filter id="scalebiz-neon-glow" x="-30%" y="-50%" width="160%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="1.6" floodColor="#037cfd" floodOpacity="0.85" />
          <feDropShadow dx="0" dy="0" stdDeviation="5.0" floodColor="#037cfd" floodOpacity="0.4" />
        </filter>
      </defs>

      <g filter="url(#scalebiz-neon-glow)">
        {SCALEBIZ_GLYPHS.map((glyph) => {
          if (glyph.char === "B") {
            return (
              <path
                key={`stroke-${glyph.char}`}
                id="stroke-letter-b"
                d={glyph.d}
                mask="url(#letter-b-hand-mask)"
              />
            );
          }
          return (
            <path
              key={`stroke-${glyph.char}`}
              id={`stroke-${glyph.char}`}
              d={glyph.d}
            />
          );
        })}
      </g>
    </svg>
  );
}
