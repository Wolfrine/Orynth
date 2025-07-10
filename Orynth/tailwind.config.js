module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        done: '#00A86B',
        inprogress: '#FFA500',
        pending: '#808080',
        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        success: {
          DEFAULT: 'hsl(var(--success))',
          light: 'hsl(var(--success-light))'
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          light: 'hsl(var(--warning-light))'
        },
        info: {
          DEFAULT: 'hsl(var(--info))',
          light: 'hsl(var(--info-light))'
        },
        pending: {
          DEFAULT: 'hsl(var(--pending))',
          light: 'hsl(var(--pending-light))'
        },
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))'
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
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'slide-up': 'slide-up 0.4s ease-out'
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
