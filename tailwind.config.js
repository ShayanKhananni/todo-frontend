/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      color:
      {
        grayCustom: '#ABABAB',   // Renaming mygrey
        softRed: '#FF5E5E',      // Renaming pink
        oceanBlue: '#3498DB',    // Renaming blue
        limeGreen: '#0DC657',    // Renaming lightGreen
        dangerRed: '#FF3737',    // Renaming red
        amberYellow: '#F39C12',  // Renaming yellow
        forestGreen: '#0D7F56',  // Renaming darkGreen
        lightGrayBg: '#F2F3F7',  // Renaming bgGray
      },

      boxShadow: {
        customPositive: '6px 6px 20px  rgba(0, 0, 0, 0.25)', 
      },

      colors: {
        grayCustom: '#757575',   // Renaming mygrey
        softRed: '#FF5E5E',      // Renaming pink
        oceanBlue: '#3498DB',    // Renaming blue
        limeGreen: '#0DC657',    // Renaming lightGreen
        dangerRed: '#FF3737',    // Renaming red
        amberYellow: '#F39C12',  // Renaming yellow
        forestGreen: '#0D7F56',  // Renaming darkGreen
        lightGrayBg: '#F2F3F7',  // Renaming bgGray
        
      },

      fontFamily:
      {
        primary:['Inter','sans-serif'],
        logo: ['"Lilita One"', 'cursive'],
      }
    },
  },
  plugins: [],
}

