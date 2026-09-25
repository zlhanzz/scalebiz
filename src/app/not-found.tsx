import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "24px",
        textAlign: "center",
        backgroundColor: "#090d16",
        color: "#f8fafc",
      }}
    >
      <h1
        style={{
          fontSize: "4rem",
          fontWeight: 800,
          color: "#e11d48",
          marginBottom: "16px",
        }}
      >
        404
      </h1>
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: 600,
          marginBottom: "12px",
        }}
      >
        Halaman Tidak Ditemukan
      </h2>
      <p
        style={{
          color: "#94a3b8",
          maxWidth: "480px",
          marginBottom: "32px",
          lineHeight: 1.6,
        }}
      >
        Halaman yang Anda tuju tidak tersedia atau telah dipindahkan.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "12px 24px",
          backgroundColor: "#e11d48",
          color: "#ffffff",
          borderRadius: "9999px",
          textDecoration: "none",
          fontWeight: 600,
          transition: "opacity 0.2s",
        }}
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
