import React from "react";

interface IconProps {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
}

export const IconGinkgo: React.FC<IconProps> = ({ size = 20, color = "currentColor", style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle", ...style }} className={className}>
    <path d="M12 21c-1-5-1-9 0-14" />
    <path d="M12 7c-2-3-6-4-9-2 0 4 2 8 9 9" />
    <path d="M12 7c2-3 6-4 9-2 0 4-2 8-9 9" />
    <path d="M12 7v5" />
    <path d="M8 8.5c1 1.5 2.5 3 4 3.5" />
    <path d="M16 8.5c-1 1.5-2.5 3-4 3.5" />
  </svg>
);

export const IconCrane: React.FC<IconProps> = ({ size = 20, color = "currentColor", style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle", ...style }} className={className}>
    <path d="M3 13l7-8 4 6 7-3-6 9-5-1-4 3z" />
    <path d="M10 5l2 11" />
    <path d="M14 11l-4 5" />
  </svg>
);

export const IconNeedle: React.FC<IconProps> = ({ size = 20, color = "currentColor", style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle", ...style }} className={className}>
    <path d="M4 20l7-7" />
    <path d="M14 6l4 4-2.5 2.5-4-4L14 6z" />
    <path d="M17 3l4 4" />
    <circle cx="19" cy="5" r="0.8" fill={color} />
  </svg>
);

export const IconShieldCheck: React.FC<IconProps> = ({ size = 20, color = "currentColor", style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle", ...style }} className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export const IconCalendar: React.FC<IconProps> = ({ size = 20, color = "currentColor", style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle", ...style }} className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export const IconClock: React.FC<IconProps> = ({ size = 20, color = "currentColor", style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle", ...style }} className={className}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export const IconRuler: React.FC<IconProps> = ({ size = 20, color = "currentColor", style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle", ...style }} className={className}>
    <path d="M2 17l15-15 5 5-15 15-5-5z" />
    <path d="M8 8l2 2" />
    <path d="M11 5l2 2" />
    <path d="M14 2l2 2" />
    <path d="M5 11l2 2" />
  </svg>
);

export const IconSparkles: React.FC<IconProps> = ({ size = 20, color = "currentColor", style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle", ...style }} className={className}>
    <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3z" />
    <path d="M19 16l0.9 2.1L22 19l-2.1 0.9L19 22l-0.9-2.1L16 19l2.1-0.9L19 16z" />
  </svg>
);

export const IconUpload: React.FC<IconProps> = ({ size = 20, color = "currentColor", style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle", ...style }} className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

export const IconImage: React.FC<IconProps> = ({ size = 20, color = "currentColor", style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle", ...style }} className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

export const IconTrash: React.FC<IconProps> = ({ size = 20, color = "currentColor", style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle", ...style }} className={className}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

export const IconCheck: React.FC<IconProps> = ({ size = 20, color = "currentColor", style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle", ...style }} className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const IconStar: React.FC<IconProps> = ({ size = 20, color = "#EAB308", style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle", ...style }} className={className}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const IconClose: React.FC<IconProps> = ({ size = 20, color = "currentColor", style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle", ...style }} className={className}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const IconHeart: React.FC<IconProps> = ({ size = 20, color = "currentColor", style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle", ...style }} className={className}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export const IconMenu: React.FC<IconProps> = ({ size = 20, color = "currentColor", style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle", ...style }} className={className}>
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export const IconArrowRight: React.FC<IconProps> = ({ size = 20, color = "currentColor", style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle", ...style }} className={className}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export const IconMapPin: React.FC<IconProps> = ({ size = 20, color = "currentColor", style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle", ...style }} className={className}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const IconTag: React.FC<IconProps> = ({ size = 20, color = "currentColor", style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle", ...style }} className={className}>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

export const IconInfo: React.FC<IconProps> = ({ size = 20, color = "currentColor", style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: "inline-block", verticalAlign: "middle", ...style }} className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);
