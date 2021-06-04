module.exports = {
	purge: [],
	purge: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.js",
		"./components/**/*.jsx",
	],

	darkMode: "class", // or 'media' or 'class'
	theme: {
		extend: {
			padding: ["hover"],
		},
	},
	variants: {},
	plugins: [],
};
