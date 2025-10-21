module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",        // vibrant blue
        accent: "#06b6d4",         // cyan accent
        "dark-bg": "#0a192f",      // deep navy background
        "darker-bg": "#020c1b",    // almost black
        "light-text": "#E6F1FF",   // soft white-blue text
        "accent-text": "#64ffda",  // neon cyan text
      }
      ,
      fontFamily: {
        josefin: ['"Josefin Sans"', "sans-serif"],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #8a2be2 0%, #6a3093 100%)',
        'gradient-button': 'linear-gradient(135deg, #6400e6 0%, #8a2be2 100%)',
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