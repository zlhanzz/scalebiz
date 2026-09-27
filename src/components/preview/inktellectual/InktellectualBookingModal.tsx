"use client";

import React, { useState, useEffect } from "react";
import { INKTELLECTUAL_DATA } from "@/data/inktellectualData";
import {
  IconCalendar,
  IconClose,
  IconCheck,
  IconSparkles,
  IconPhone,
  IconMapPin,
  IconGraduationCap,
  IconArrowRight,
  IconUpload,
  IconImage,
  IconTrash
} from "./InktellectualIcons";

export interface ReferencePhoto {
  id: string;
  name: string;
  url: string;
  size: string;
}

interface InktellectualBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedArtistId?: string;
  preselectedStyle?: string;
  preselectedSize?: string;
}

export const InktellectualBookingModal: React.FC<InktellectualBookingModalProps> = ({
  isOpen,
  onClose,
  preselectedArtistId,
  preselectedStyle,
  preselectedSize
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedArtist, setSelectedArtist] = useState<string>("any");
  const [tattooStyle, setTattooStyle] = useState<string>("");
  const [approxSize, setApproxSize] = useState<string>("Medium (4-6 in)");
  const [placement, setPlacement] = useState<string>("Forearm");
  const [description, setDescription] = useState<string>("");
  const [prefDate, setPrefDate] = useState<string>("");
  const [timeSlot, setTimeSlot] = useState<string>("Afternoon (12 PM – 4 PM)");
  const [isStudent, setIsStudent] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [ticketId, setTicketId] = useState<string>("");

  // Tattoo Reference Photos state
  const [referencePhotos, setReferencePhotos] = useState<ReferencePhoto[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const sizeKb = (file.size / 1024).toFixed(0);
          const sizeStr = file.size > 1024 * 1024 ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : `${sizeKb} KB`;
          setReferencePhotos((prev) => [
            ...prev,
            {
              id: `${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
              name: file.name,
              url: e.target!.result as string,
              size: sizeStr
            }
          ]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (id: string) => {
    setReferencePhotos((prev) => prev.filter((p) => p.id !== id));
  };

  useEffect(() => {
    if (preselectedArtistId) {
      setSelectedArtist(preselectedArtistId);
    }
    if (preselectedStyle) {
      setTattooStyle(preselectedStyle);
    }
    if (preselectedSize) {
      setApproxSize(preselectedSize);
    }
  }, [preselectedArtistId, preselectedStyle, preselectedSize, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setTicketId(`INK-BUF-${randomNum}`);
    setStep(3); // success view
  };

  const handleReset = () => {
    setStep(1);
    onClose();
  };

  const activeArtistObj = INKTELLECTUAL_DATA.artists.find((a) => a.id === selectedArtist);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        backgroundColor: "rgba(5, 5, 7, 0.88)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        overflowY: "auto"
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "640px",
          backgroundColor: "#111114",
          border: "1px solid rgba(212, 175, 55, 0.4)",
          borderRadius: "16px",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.95), 0 0 40px rgba(212, 175, 55, 0.15)",
          color: "#E6E6E8",
          overflow: "hidden",
          position: "relative",
          animation: "fadeInUp 0.25s ease-out"
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(180deg, rgba(212, 175, 55, 0.15) 0%, rgba(17, 17, 20, 0.95) 100%)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                backgroundColor: "rgba(212, 175, 55, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#D4AF37",
                border: "1px solid rgba(212, 175, 55, 0.3)"
              }}
            >
              <IconCalendar size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: "1.15rem", fontFamily: "var(--font-serif, Georgia, serif)", color: "#FFFFFF", letterSpacing: "0.02em" }}>
                {step === 3 ? "Consultation Requested" : "Book Custom Tattoo Consultation"}
              </h3>
              <p style={{ margin: 0, fontSize: "0.8rem", color: "#A0A0AA" }}>
                Inktellectual Tattoo Atelier • 408 Amherst St, Buffalo NY
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: "#A0A0AA",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s"
            }}
          >
            <IconClose size={18} />
          </button>
        </div>

        {/* Step Progress Bar (when step 1 or 2) */}
        {step < 3 && (
          <div style={{ display: "flex", backgroundColor: "rgba(255, 255, 255, 0.04)", borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
            <div
              onClick={() => setStep(1)}
              style={{
                flex: 1,
                padding: "10px 16px",
                textAlign: "center",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: step === 1 ? "#D4AF37" : "#8E8E98",
                borderBottom: step === 1 ? "2px solid #D4AF37" : "none",
                cursor: "pointer",
                background: step === 1 ? "rgba(212, 175, 55, 0.05)" : "transparent"
              }}
            >
              1. Concept & Artist
            </div>
            <div
              onClick={() => setStep(2)}
              style={{
                flex: 1,
                padding: "10px 16px",
                textAlign: "center",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: step === 2 ? "#D4AF37" : "#8E8E98",
                borderBottom: step === 2 ? "2px solid #D4AF37" : "none",
                cursor: "pointer",
                background: step === 2 ? "rgba(212, 175, 55, 0.05)" : "transparent"
              }}
            >
              2. Timing & Contact
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div style={{ padding: "24px", maxHeight: "78vh", overflowY: "auto" }}>
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {/* Select Artist */}
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#D4AF37", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>
                  Select Resident Artist
                </label>
                <select
                  value={selectedArtist}
                  onChange={(e) => setSelectedArtist(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#FFFFFF",
                    fontSize: "0.95rem",
                    outline: "none"
                  }}
                >
                  <option value="any" style={{ background: "#111114", color: "#FFF" }}>
                    ⭐ Any Available Specialist (Best Match)
                  </option>
                  {INKTELLECTUAL_DATA.artists.map((artist) => (
                    <option key={artist.id} value={artist.id} style={{ background: "#111114", color: "#FFF" }}>
                      {artist.name} ({artist.badge || artist.title})
                    </option>
                  ))}
                </select>
                {activeArtistObj && (
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "10px", padding: "10px", borderRadius: "8px", backgroundColor: "rgba(212, 175, 55, 0.08)", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
                    <img
                      src={activeArtistObj.portraitImage}
                      alt={activeArtistObj.name}
                      style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }}
                    />
                    <div style={{ fontSize: "0.82rem" }}>
                      <span style={{ fontWeight: 600, color: "#FFFFFF" }}>{activeArtistObj.name}</span>
                      <span style={{ color: "#D4AF37", marginLeft: "6px" }}>• {activeArtistObj.startingRate}</span>
                      <div style={{ color: "#A0A0AA", fontSize: "0.76rem" }}>{activeArtistObj.styles.slice(0, 2).join(", ")}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Placement & Size Row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#D4AF37", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>
                    Placement
                  </label>
                  <select
                    value={placement}
                    onChange={(e) => setPlacement(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "11px 12px",
                      borderRadius: "8px",
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      color: "#FFFFFF",
                      fontSize: "0.9rem",
                      outline: "none"
                    }}
                  >
                    <option value="Forearm" style={{ background: "#111114" }}>Forearm / Inner Arm</option>
                    <option value="Bicep / Shoulder" style={{ background: "#111114" }}>Bicep / Shoulder</option>
                    <option value="Thigh / Leg" style={{ background: "#111114" }}>Thigh / Calf</option>
                    <option value="Ribs / Sternum" style={{ background: "#111114" }}>Ribs / Sternum</option>
                    <option value="Spine / Back" style={{ background: "#111114" }}>Spine / Back</option>
                    <option value="Chest" style={{ background: "#111114" }}>Chest</option>
                    <option value="Body Piercing" style={{ background: "#111114" }}>Body Piercing Service</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#D4AF37", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>
                    Approximate Size
                  </label>
                  <select
                    value={approxSize}
                    onChange={(e) => setApproxSize(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "11px 12px",
                      borderRadius: "8px",
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      color: "#FFFFFF",
                      fontSize: "0.9rem",
                      outline: "none"
                    }}
                  >
                    <option value="Small / Flash (1-3 in)" style={{ background: "#111114" }}>Small / Flash (1-3 in)</option>
                    <option value="Medium (4-6 in)" style={{ background: "#111114" }}>Medium (4-6 in)</option>
                    <option value="Large (7-10 in)" style={{ background: "#111114" }}>Large (7-10 in)</option>
                    <option value="Half / Full Sleeve or Back" style={{ background: "#111114" }}>Half / Full Sleeve / Back</option>
                  </select>
                </div>
              </div>

              {/* Tattoo Concept / Idea */}
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#D4AF37", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>
                  Describe Your Concept / Story
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Fine-line floral bouquet with Roman numerals, or realistic blue-eyed wolf on outer forearm..."
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#FFFFFF",
                    fontSize: "0.9rem",
                    resize: "none",
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              {/* Tattoo Reference Photos Upload Section */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "#D4AF37", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Attach Reference Photos / Inspiration
                  </label>
                  <span style={{ fontSize: "0.72rem", color: "#8E8E98" }}>Optional • JPG, PNG, HEIC</span>
                </div>

                {/* Dropzone Card */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    handleFileSelect(e.dataTransfer.files);
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: isDragging ? "2px solid #D4AF37" : "1.5px dashed rgba(212, 175, 55, 0.4)",
                    backgroundColor: isDragging ? "rgba(212, 175, 55, 0.12)" : "rgba(255, 255, 255, 0.02)",
                    borderRadius: "12px",
                    padding: "18px 16px",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e.target.files)}
                    style={{ display: "none" }}
                    aria-label="Upload reference photos"
                  />
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(212, 175, 55, 0.15)",
                      color: "#D4AF37",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 10px"
                    }}
                  >
                    <IconUpload size={22} />
                  </div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#FFFFFF", marginBottom: "4px" }}>
                    Click to Browse or Drag Tattoo References Here
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#A0A0AA", lineHeight: 1.4 }}>
                    Sketches, screenshots, body placement photos, or existing flash you'd like your artist to reference
                  </div>
                </div>

                {/* Uploaded Photos Gallery Preview */}
                {referencePhotos.length > 0 && (
                  <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div style={{ fontSize: "0.76rem", color: "#4ADE80", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                      <IconCheck size={14} />
                      <span>{referencePhotos.length} Reference Photo(s) Attached for Artist</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "10px" }}>
                      {referencePhotos.map((photo) => (
                        <div
                          key={photo.id}
                          style={{
                            position: "relative",
                            borderRadius: "8px",
                            overflow: "hidden",
                            border: "1px solid rgba(212, 175, 55, 0.4)",
                            backgroundColor: "#16161C"
                          }}
                        >
                          <img
                            src={photo.url}
                            alt={photo.name}
                            style={{ width: "100%", height: "85px", objectFit: "cover", display: "block" }}
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removePhoto(photo.id);
                            }}
                            aria-label="Remove photo"
                            style={{
                              position: "absolute",
                              top: "4px",
                              right: "4px",
                              width: "22px",
                              height: "22px",
                              borderRadius: "50%",
                              backgroundColor: "rgba(0, 0, 0, 0.8)",
                              border: "1px solid rgba(255, 255, 255, 0.3)",
                              color: "#FF5555",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              padding: 0
                            }}
                          >
                            <IconClose size={12} />
                          </button>
                          <div style={{ padding: "4px 6px", fontSize: "0.68rem", color: "#BBB", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {photo.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Next Step Button */}
              <button
                type="button"
                onClick={() => setStep(2)}
                style={{
                  padding: "14px",
                  borderRadius: "10px",
                  backgroundColor: "#D4AF37",
                  color: "#0B0B0E",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  marginTop: "6px"
                }}
              >
                <span>Continue to Date & Contact</span>
                <IconArrowRight size={18} />
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Date & Time Slot */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#D4AF37", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={prefDate}
                    onChange={(e) => setPrefDate(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "11px 12px",
                      borderRadius: "8px",
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      color: "#FFFFFF",
                      fontSize: "0.9rem",
                      outline: "none",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#D4AF37", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>
                    Time Window
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "11px 12px",
                      borderRadius: "8px",
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      color: "#FFFFFF",
                      fontSize: "0.9rem",
                      outline: "none",
                      boxSizing: "border-box"
                    }}
                  >
                    <option value="Afternoon (12 PM – 4 PM)" style={{ background: "#111114" }}>Afternoon (12 PM – 4 PM)</option>
                    <option value="Evening (4 PM – 8 PM)" style={{ background: "#111114" }}>Evening (4 PM – 8 PM)</option>
                    <option value="Flexible Walk-In Check" style={{ background: "#111114" }}>Flexible Walk-In Window</option>
                  </select>
                </div>
              </div>

              {/* Student Discount Toggle */}
              <div
                style={{
                  padding: "12px 14px",
                  borderRadius: "10px",
                  backgroundColor: isStudent ? "rgba(212, 175, 55, 0.15)" : "rgba(255, 255, 255, 0.03)",
                  border: isStudent ? "1px solid #D4AF37" : "1px dashed rgba(212, 175, 55, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer"
                }}
                onClick={() => setIsStudent(!isStudent)}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <IconGraduationCap size={18} style={{ color: "#D4AF37" }} />
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#FFFFFF" }}>
                      Buffalo State / College Student (-$20 OFF)
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#A0A0AA" }}>
                      Show valid ID at our 408 Amherst St desk
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "5px",
                    border: isStudent ? "2px solid #D4AF37" : "1.5px solid rgba(255, 255, 255, 0.3)",
                    backgroundColor: isStudent ? "#D4AF37" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#0B0B0E"
                  }}
                >
                  {isStudent && <IconCheck size={14} />}
                </div>
              </div>

              {/* Name & Phone */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#D4AF37", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="First & Last Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "11px 12px",
                      borderRadius: "8px",
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      color: "#FFFFFF",
                      fontSize: "0.9rem",
                      outline: "none",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#D4AF37", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(716) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "11px 12px",
                      borderRadius: "8px",
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      color: "#FFFFFF",
                      fontSize: "0.9rem",
                      outline: "none",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#D4AF37", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "11px 12px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#FFFFFF",
                    fontSize: "0.9rem",
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              {/* Submit / Back row */}
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{
                    padding: "13px 18px",
                    borderRadius: "10px",
                    backgroundColor: "transparent",
                    color: "#A0A0AA",
                    fontSize: "0.9rem",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    cursor: "pointer"
                  }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: "13px 20px",
                    borderRadius: "10px",
                    backgroundColor: "#D4AF37",
                    color: "#0B0B0E",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(212, 175, 55, 0.35)"
                  }}
                >
                  Confirm Free Consultation Request
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div style={{ textAlign: "center", padding: "10px 0 20px" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(212, 175, 55, 0.18)",
                  border: "2px solid #D4AF37",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#D4AF37",
                  margin: "0 auto 16px"
                }}
              >
                <IconCheck size={32} />
              </div>
              <h4 style={{ margin: "0 0 6px", fontSize: "1.3rem", color: "#FFFFFF", fontFamily: "var(--font-serif, Georgia, serif)" }}>
                Consultation Request Logged!
              </h4>
              <p style={{ margin: "0 0 16px", fontSize: "0.85rem", color: "#A0A0AA" }}>
                Our studio director or resident artist will review your concept notes and text/call you to finalize artwork specs.
              </p>

              {/* Ticket Card */}
              <div
                style={{
                  padding: "16px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  border: "1px dashed rgba(212, 175, 55, 0.5)",
                  textAlign: "left",
                  marginBottom: "20px"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "8px" }}>
                  <span style={{ fontSize: "0.75rem", color: "#8E8E98", textTransform: "uppercase" }}>Pass Ticket</span>
                  <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#D4AF37", letterSpacing: "0.08em" }}>{ticketId}</span>
                </div>
                <div style={{ fontSize: "0.85rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  <div>
                    <span style={{ color: "#777782", fontSize: "0.75rem" }}>Client:</span>
                    <div style={{ color: "#FFF", fontWeight: 600 }}>{fullName}</div>
                  </div>
                  <div>
                    <span style={{ color: "#777782", fontSize: "0.75rem" }}>Artist:</span>
                    <div style={{ color: "#FFF", fontWeight: 600 }}>{activeArtistObj?.name || "Best Matched"}</div>
                  </div>
                  <div>
                    <span style={{ color: "#777782", fontSize: "0.75rem" }}>Placement / Size:</span>
                    <div style={{ color: "#FFF" }}>{placement} • {approxSize.split(" ")[0]}</div>
                  </div>
                  <div>
                    <span style={{ color: "#777782", fontSize: "0.75rem" }}>Buff State Perk:</span>
                    <div style={{ color: isStudent ? "#4ADE80" : "#999", fontWeight: 600 }}>
                      {isStudent ? "$20 OFF Claimed" : "Standard"}
                    </div>
                  </div>

                  {/* Attached References in Ticket */}
                  <div style={{ gridColumn: "span 2", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "10px", marginTop: "4px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <span style={{ color: "#D4AF37", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Attached Tattoo References:
                      </span>
                      <span style={{ fontSize: "0.74rem", color: referencePhotos.length > 0 ? "#4ADE80" : "#8E8E98" }}>
                        {referencePhotos.length > 0 ? `${referencePhotos.length} photo(s) staged` : "None (Bringing in-person)"}
                      </span>
                    </div>

                    {referencePhotos.length > 0 && (
                      <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px" }}>
                        {referencePhotos.map((photo) => (
                          <div
                            key={photo.id}
                            style={{
                              flexShrink: 0,
                              borderRadius: "6px",
                              overflow: "hidden",
                              border: "1px solid #D4AF37",
                              width: "48px",
                              height: "48px",
                              backgroundColor: "#000"
                            }}
                          >
                            <img
                              src={photo.url}
                              alt={photo.name}
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Direct Call Link */}
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
                <a
                  href={`tel:${INKTELLECTUAL_DATA.cleanPhone}`}
                  style={{
                    padding: "12px 20px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(212, 175, 55, 0.15)",
                    border: "1px solid #D4AF37",
                    color: "#D4AF37",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <IconPhone size={16} />
                  <span>Call Studio Directly: {INKTELLECTUAL_DATA.phone}</span>
                </a>
                <button
                  type="button"
                  onClick={handleReset}
                  style={{
                    padding: "12px 24px",
                    borderRadius: "10px",
                    backgroundColor: "#D4AF37",
                    color: "#0B0B0E",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
