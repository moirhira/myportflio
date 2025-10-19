module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8a2be2",
        accent: "#6400e6",
        "dark-bg": "#120b1e",
        "darker-bg": "#0a0612",
        "light-text": "#CCD6F6",
        "accent-text": "#7250ec",
      },
      fontFamily: {
        josefin: ['"Josefin Sans"', "sans-serif"],
      },
      backgroundImage: {
        // utility classes can be used: bg-gradient-primary / bg-gradient-button
        'gradient-primary': 'linear-gradient(135deg, #8a2be2 0%, #6a3093 100%)',
        'gradient-button': 'linear-gradient(135deg, #6400e6 0%, #8a2be2 100%)',
        // if you want gradient-heading via utility:
        'gradient-heading': 'linear-gradient(100deg, #00e6e6, #8a2be2, #ff44cc)'
      },
      boxShadow: {
        'card-md': '0 6px 32px rgba(138, 43, 226, 0.15)',
      },
      maxWidth: {
        '1600': '1600px'
      }
    }
  },
  plugins: [],
}