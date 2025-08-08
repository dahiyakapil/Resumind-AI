/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  
    safelist: [
    'text-muted-foreground',
    'bg-gradient-hero',
    'bg-gradient-primary',
    'text-foreground',
    'bg-background',
  ],
  
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'gradient': 'gradient 3s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
      backdropBlur: {
        xs: '2px',
      },
      colors: {
        'background': '#0B0F19', // or your desired dark color
        'foreground': '#FFFFFF',
        'muted-foreground': '#A1A1AA',
        'primary': '#5A8BFF',
        'success': '#10B981',
        'warning': '#F59E0B',
      },
      backgroundImage: {
        'gradient-hero': 'radial-gradient(circle at top left, #5A8BFF 0%, #1e1e2f 100%)',
        'gradient-primary': 'linear-gradient(to right, #5A8BFF, #8F6FFF)',
      },
    },
  },
  plugins: [],
};

