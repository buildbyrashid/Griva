/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Palette — Deep Space
        space: {
          black: "#070B14",
          navy: "#0E1628",
          card: "#111827",
          surface: "#151E2E",
          border: "rgba(255,255,255,0.06)",
          "border-glow": "rgba(255,107,0,0.3)",
        },
        // Brand Orange
        brand: {
          DEFAULT: "#FF6B00",
          glow: "#FF8C42",
          dim: "rgba(255,107,0,0.15)",
          border: "rgba(255,107,0,0.25)",
        },
        // Accent
        accent: {
          blue: "#4DA6FF",
          "blue-dim": "rgba(77,166,255,0.15)",
          titanium: "#D9E1EA",
          "titanium-dim": "rgba(217,225,234,0.1)",
        },
        // Text
        text: {
          primary: "#FFFFFF",
          secondary: "#8B9BAE",
          muted: "#4A5568",
          orange: "#FF6B00",
        },
        // Status
        success: "#22C55E",
        danger: "#FF3B30",
      },
      fontFamily: {
        display: ["'Clash Display'", "'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      fontSize: {
        "display-2xl": ["clamp(4rem, 8vw, 9rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-xl": ["clamp(3rem, 6vw, 7rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.5rem, 5vw, 5.5rem)", { lineHeight: "1", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(2rem, 4vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
      },
      backgroundImage: {
        // Space gradients
        "space-radial": "radial-gradient(ellipse at center, #0E1628 0%, #070B14 70%)",
        "space-top": "radial-gradient(ellipse at top, #0E1628 0%, #070B14 60%)",
        "hero-glow": "radial-gradient(ellipse at 60% 40%, rgba(255,107,0,0.12) 0%, rgba(77,166,255,0.04) 40%, transparent 70%)",
        "orange-radial": "radial-gradient(ellipse at center, rgba(255,107,0,0.25) 0%, transparent 70%)",
        "blue-radial": "radial-gradient(ellipse at center, rgba(77,166,255,0.15) 0%, transparent 70%)",
        // Glass gradients
        "glass-card": "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
        "glass-orange": "linear-gradient(135deg, rgba(255,107,0,0.12) 0%, rgba(255,140,66,0.04) 100%)",
        "glass-blue": "linear-gradient(135deg, rgba(77,166,255,0.1) 0%, rgba(77,166,255,0.02) 100%)",
        // Brand
        "brand-gradient": "linear-gradient(135deg, #FF6B00 0%, #FF8C42 100%)",
        "brand-dim": "linear-gradient(135deg, rgba(255,107,0,0.8) 0%, rgba(255,140,66,0.8) 100%)",
        // Cinematic
        "cinematic-vignette": "radial-gradient(ellipse at center, transparent 40%, rgba(7,11,20,0.8) 100%)",
        "section-fade-b": "linear-gradient(to bottom, transparent 0%, #070B14 100%)",
        "section-fade-t": "linear-gradient(to top, transparent 0%, #070B14 100%)",
      },
      animation: {
        // Ambient
        "ambient-float": "ambientFloat 8s ease-in-out infinite",
        "ambient-float-alt": "ambientFloat 10s ease-in-out infinite reverse",
        "orbit": "orbit 20s linear infinite",
        // Glows
        "pulse-brand": "pulseBrand 3s ease-in-out infinite",
        "pulse-blue": "pulseBlue 3s ease-in-out infinite",
        "glow-line": "glowLine 4s ease-in-out infinite",
        // Scrolling
        "scroll-left": "scrollLeft 30s linear infinite",
        "scroll-right": "scrollRight 25s linear infinite",
        // Text
        "gradient-shift": "gradientShift 4s ease-in-out infinite",
        // UI
        "slide-up-fade": "slideUpFade 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        "slide-in-right": "slideInRight 0.5s cubic-bezier(0.16,1,0.3,1) forwards",
        "scale-up": "scaleUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards",
        "ticker": "ticker 25s linear infinite",
        "spin-slow": "spin 15s linear infinite",
        "draw": "draw 2s ease-in-out forwards",
        "flicker": "flicker 0.15s infinite",
        "shimmer-fast": "shimmer 1.5s linear infinite",
      },
      keyframes: {
        ambientFloat: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-18px) rotate(1deg)" },
          "66%": { transform: "translateY(-8px) rotate(-1deg)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(120px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(120px) rotate(-360deg)" },
        },
        pulseBrand: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255,107,0,0.3), 0 0 60px rgba(255,107,0,0.1)" },
          "50%": { boxShadow: "0 0 40px rgba(255,107,0,0.6), 0 0 120px rgba(255,107,0,0.2)" },
        },
        pulseBlue: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(77,166,255,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(77,166,255,0.5), 0 0 80px rgba(77,166,255,0.2)" },
        },
        glowLine: {
          "0%, 100%": { opacity: "0.3", transform: "scaleX(0.5)" },
          "50%": { opacity: "1", transform: "scaleX(1)" },
        },
        scrollLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scrollRight: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        slideUpFade: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(60px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleUp: {
          "0%": { opacity: "0", transform: "scale(0.85)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        draw: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        // Brand glow
        "brand-sm": "0 0 15px rgba(255,107,0,0.25)",
        "brand": "0 0 30px rgba(255,107,0,0.35)",
        "brand-lg": "0 0 60px rgba(255,107,0,0.4), 0 0 120px rgba(255,107,0,0.15)",
        "brand-xl": "0 0 100px rgba(255,107,0,0.5), 0 0 200px rgba(255,107,0,0.2)",
        // Blue glow
        "blue": "0 0 30px rgba(77,166,255,0.3)",
        "blue-lg": "0 0 60px rgba(77,166,255,0.4)",
        // Glass
        "glass": "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
        "glass-lg": "0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
        // Premium card
        "card": "0 4px 20px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.04)",
        "card-hover": "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,107,0,0.2)",
        "card-blue": "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(77,166,255,0.2)",
        // Inner
        "inner-brand": "inset 0 0 30px rgba(255,107,0,0.08)",
        "inner-glass": "inset 0 1px 0 rgba(255,255,255,0.06)",
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.16, 1, 0.3, 1)",
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
        "bounce-out": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      backdropBlur: {
        xs: "4px",
        "2xl": "40px",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
