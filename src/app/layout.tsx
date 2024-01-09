import '~/styles/globals.css';
import { Toaster } from '~/components/ui/sonner';
import Navbar from '~/components/navbar';

import type { Metadata } from 'next';

import { Inter } from 'next/font/google';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-sans',
});

export const metadata: Metadata = {
	title: 'InsightX',
	description:
		'InsightX: Crack the ERP code. Case study challenge for data-driven minds.',
	icons: [{ rel: 'icon', url: '/favicon.png' }],
	keywords: ['insight', 'case study'],
	openGraph: {
		type: 'website',
		url: 'https://insightx.ecellnita.co/',
		title: 'InsightX',
		description:
			'InsightX: Crack the ERP code. Case study challenge for data-driven minds.',
		siteName: 'InsightX',
		images: [
			{
				url: 'https://i.ibb.co/1Z6QFwd/og.png',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		site: '@ecellnita',
		creator: '@Envoy_1084',
		images: 'https://i.ibb.co/1Z6QFwd/og.png',
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={`font-sans ${inter.variable}`}>
				<Navbar />
				{children}
				<Toaster visibleToasts={10} />
			</body>
		</html>
	);
}
