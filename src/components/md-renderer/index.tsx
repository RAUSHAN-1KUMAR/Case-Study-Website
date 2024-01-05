import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface Props {
	content: string;
}

const MarkdownRenderer = ({ content }: Props) => {
	return (
		<ReactMarkdown
			components={{
				h2({ children }) {
					return (
						<h2 className='my-12 bg-gradient-to-b from-neutral-100 to-neutral-400 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl'>
							{children}
						</h2>
					);
				},
				p({ children }) {
					return (
						<p className='whitespace-pre-line break-words text-sm text-neutral-200 md:text-xl'>
							{children}
						</p>
					);
				},
				li({ children }) {
					return (
						<p className='break-words py-2 text-xl text-neutral-200'>{children}</p>
					);
				},
			}}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			rehypePlugins={[rehypeRaw as any]}
		>
			{content}
		</ReactMarkdown>
	);
};

export default MarkdownRenderer;
