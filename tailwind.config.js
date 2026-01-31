/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
	theme: {
		extend: {
			fontFamily: {
				display: ['"Outfit"', '"Poppins"', 'ui-sans-serif', 'system-ui'],
				sans: ['"Poppins"', 'ui-sans-serif', 'system-ui', 'sans-serif']
			},
			colors: {
				dark: '#1a1a2e',
				deep: '#16213e',
				primary: '#e94560',
				accent: '#f5a623',
				soft: '#eaeaea'
			},
			boxShadow: {
				glass: '0 8px 32px rgba(0,0,0,0.25)',
				glow: '0 0 20px rgba(233,69,96,0.3)'
			},
			borderRadius: {
				'2xl': '1rem',
				'3xl': '1.5rem'
			}
		}
	},
	plugins: []
}
