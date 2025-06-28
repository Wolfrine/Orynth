module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        done: '#00A86B',
        inprogress: '#FFA500',
        pending: '#808080'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        rounded: ['Poppins', 'sans-serif']
      },
      fontSize: {
        sm: '0.875rem',
        md: '1rem',
        lg: '1.25rem'
      },
      spacing: {
        4: '1rem',
        8: '2rem',
        12: '3rem'
      },
      borderRadius: {
        md: '0.375rem',
        lg: '0.5rem',
        full: '9999px'
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.05)',
        'card-lg': '0 4px 6px rgba(0,0,0,0.1)'
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding'
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px'
      }
    }
  },
  plugins: [],
};
