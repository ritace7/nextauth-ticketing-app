import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				nav: "#18222F",
				page: "#2B3441",
				card: "#47566A",
				"card-hover": "#4F5E74",
				"default-text": "#F1F3F5",
				"blue-accent": "#0084D4",
				"blue-accent-hover": "#009FFF",
			},
		},
	},
	plugins: [],
};
export default config;
