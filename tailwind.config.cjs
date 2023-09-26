/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	plugins: [require('daisyui')],
	theme: {
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
	daisyui: {
		themes: true
	}
};
