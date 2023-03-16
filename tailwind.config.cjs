/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			black: '#000000',
			white: '#FFFFFF',
			transparent: 'transparent',
			gray: {
				900: '#121214',
				800: '#202024',
				700: '#2a2a30',
				600: '#35353c',
				500: '#3f3f47',
				400: '#7C7C8A',
				300: '#b6b6bd',
				200: '#C4C4CC',
				100: '#E1E1E6',
				50: '#f1f1f3'
			},
			green: {
				700: '#288541',
				500: '#32A852',
				300: '#50d072c0'
			},
			red: {
				500: '#E63035'
			},
			blue: {
				google: {
					default: '#4285F4',
					hover: '#357AE8'
				}
			}
		},
		screens: {
			tablet: { max: '900px' },
			mobile: { max: '716px' }
		},
		extend: {
			fontFamily: {
				sans: 'Inter, sans-serif'
			}
		}
	},
	plugins: [],
	darkMode: 'class'
};
