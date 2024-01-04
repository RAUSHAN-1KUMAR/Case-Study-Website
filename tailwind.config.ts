import { type Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
	content: ['./src/**/*.tsx'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-sans)', ...fontFamily.sans],
			},
			animation: {
				spotlight: 'spotlight 2s ease .75s 1 forwards',
			},
			keyframes: {
				spotlight: {
					'0%': {
						opacity: '0',
						transform: 'translate(-72%, -62%) scale(0.5)',
					},
					'100%': {
						opacity: '1',
						transform: 'translate(-50%,-40%) scale(1)',
					},
				},
			},
		},
	},
	plugins: [],
} satisfies Config;
