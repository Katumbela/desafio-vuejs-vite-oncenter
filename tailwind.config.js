/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,vue}", "./index.html"],
  theme: {
    
    extend: {
      fontFamily: {
        'sans': ['ui-sans-serif', 'system-ui', ...],
        'serif': ['ui-serif', 'Georgia', ...],
        'mono': ['ui-monospace', 'SFMono-Regular', ...],
        'display': ['Oswald', ...],
        'body': ['"Open Sans"', ...],
      },
      
      colors: {
        customP: {
          light: '#3EAA64',
          DEFAULT: '#35b462',
          dark: '#DBFFE8',
        },
        covid: '#35b462',
        customRed: {
          light: '#ff9999',
          DEFAULT: '#ff0000',
          dark: '#990000',
        },
      },
      fontWeight: {
        thin: '100',
        hairline: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        'extra-bold': '800',
        black: '900',
      },
      backgroundImage: {
        'hero': "url('./src/assets/img1.png')",
        'hero1': "url('./src/assets/img2.jpeg')",
        'hero2': "url('./src/assets/img4.webp')",
      }
    }
  },
  plugins: [],
};
