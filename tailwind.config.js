module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}"
  ],
  theme: {
    extend: {
      colors: {
        primary:      "#8a2be2",
        "primary-light": "#a855f7",
        accent:       "#6d28d9",
        cyan:         "#22d3ee",
        pink:         "#ec4899",
        "dark-bg":    "#0f0a1a",
        "darker-bg":  "#080510",
        "light-text": "#e2e0f0",
        "muted-text": "#a09bb8",
        "accent-text":"#a78bfa",
      },
      fontFamily: {
        josefin: ['"Josefin Sans"', "sans-serif"],
        inter:   ['"Inter"', "sans-serif"],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)',
        'gradient-button':  'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
      },
      boxShadow: {
        'card-md':  '0 6px 32px rgba(124, 58, 237, 0.15)',
        'card-lg':  '0 16px 48px rgba(124, 58, 237, 0.2)',
        'glow':     '0 0 40px rgba(124, 58, 237, 0.3)',
      },
      maxWidth: {
        '1600': '1600px'
      },
      animation: {
        'float':      'float 5s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-14px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.15' },
          '50%':      { opacity: '0.25' },
        },
      },
    }
  },
  plugins: [],
}