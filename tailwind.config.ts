import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        c1a: "#151515",
        c1b: "#575757",
        c1c: "#A9A9A9",
        c1d: "#D1D1D1",
        c1e: "#EBEBEB",
        c1f: "#F5F5F5",
        c1h: "#F9F9F9",
        c2a: "#6A983C",
        c2b: "#46760A",
        c2c: "#92C064",
        c2d: "#C8DEB3",
        c2e: "#F4F8EC",
        c4a: "#E5704B",
        c4b: "#C7522D",
        c4c: "#EB8D70",
        c4d: "#F7C6B7",
        c4e: "#FFF1ED",
      },
    },
  },
  plugins: [],
  important: true
};
export default config;
