import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        backGroundColorRoot: "#020617",
        backGroundColor1: '#252836',
        softCyan: '#4af3f3',
        darkBlue: '#275daf',
              'royalBlue': {
        400: '#6486f6',
        500: '#4461f2',
      },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: (() => {
        const mapValue = (value: number, fromLow: number, fromHigh: number, toLow: number, toHigh: number) => {
          return ((((value - fromLow) * (toHigh - toLow)) / (fromHigh - fromLow)) + toLow).toFixed(0)
        };
        let keyframes: { [key: string]: any } = {};
        for (let i = 0; i <= 100; i += 10) {
          const value = mapValue(i, 0, 100, 500, 0)

          keyframes[`animate${i}`] = {
            '0%': { 'background-position': `0 ${value}px` },
            '100%': { 'background-position': `427px ${value}px` },
          }
        }
        return Object.assign(keyframes,{
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        },);
      })(),
          
      animation: (() => {
        let animations: { [key: string]: string } = {};
        ['1', '2'].forEach((level) => {
          for (let i = 0; i <= 100; i += 10) {
            animations[`water-level${level}-${i}`] = `animate${i} ${level === '1' ? '7' : '5'}s linear infinite`;
          }
        });
        return Object.assign(animations,{
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        });
      })(),
            
      rotate: (() => {
        let rotates: { [key: string]: string } = {};
          for (let i = -360; i <= 360; i += 0.5) {
            rotates[`[${i}]`] = `${i}deg`;
          }
        return rotates;
      }),
            backgroundImage: {
        "gauge-g-body": "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc1JyBoZWlnaHQ9JzUnPgogIDxyZWN0IHdpZHRoPSc1JyBoZWlnaHQ9JzUnIGZpbGw9J3doaXRlJy8+CiAgPHBhdGggZD0nTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVonIHN0cm9rZT0nIzg4OCcgc3Ryb2tlLXdpZHRoPScxJy8+Cjwvc3ZnPg==')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      dropShadow: {
        "Gauge-ticks-ds" : '2px 4px 6px rgb(0, 0, 0, 1)'
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config