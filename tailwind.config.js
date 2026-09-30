/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
      screens: {
        '2xl': '1312px',
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        
        /* Direct Semantic Defense & Maritime Tokens */
        brand: {
          navy: "var(--brand-navy)",
          deep: "var(--brand-navy-deep)",
          dark: "var(--brand-navy-dark)",
          light: "var(--brand-navy-light)",
          red: "var(--brand-red)",
          crimson: "var(--brand-red-crimson)",
          hover: "var(--brand-red-hover)",
        },
        navy: {
          950: "var(--bg-abyss)",
          900: "var(--bg-deep-navy)",
          850: "var(--bg-bridge)",
          800: "var(--bg-surface-elevated)",
          700: "var(--bg-surface-highlight)",
        },
        amber: {
          signal: "var(--accent-amber)",
          hover: "var(--accent-amber-hover)",
        },
        marine: {
          DEFAULT: "var(--accent-marine)",
          hover: "var(--accent-marine-hover)",
        },
        sonar: {
          DEFAULT: "var(--status-sonar-green)",
          hover: "var(--status-sonar-hover)",
        },
        tactical: {
          red: "var(--status-tactical-red)",
        },
        metal: "var(--text-muted)",
        ink: "var(--text-primary)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      boxShadow: {
        subtle: "var(--shadow-subtle)",
        card: "var(--shadow-card)",
        elevated: "var(--shadow-elevated)",
        crimson: "var(--brand-red-glow)",
        red: "var(--brand-red-glow)",
        amber: "var(--glow-amber)",
        marine: "var(--glow-marine)",
        sonar: "var(--glow-sonar)",
      },
    },
  },
  plugins: [],
};
