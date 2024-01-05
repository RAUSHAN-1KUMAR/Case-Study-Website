'use client';

import React from 'react';
import MarkdownRenderer from '../md-renderer';
import WavesCard from '../waves-card';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '~/components/ui/carousel';

import { sections } from '~/data';

const Content = () => {
	const pages = Object.keys(sections);
	return (
		<Carousel
			opts={{
				align: 'start',
				loop: true,
			}}
			className='mx-auto flex min-h-screen max-w-screen-2xl flex-col justify-center gap-8 px-4'
			id='content'
		>
			<div className='flex flex-col justify-between gap-8 py-12 sm:flex-row sm:items-center'>
				<div className='bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 bg-clip-text pb-2 text-6xl font-semibold text-transparent sm:text-7xl'>
					Case Study Template
				</div>
				<div className='flex flex-row items-center gap-4 pr-6'>
					<CarouselPrevious />
					<CarouselNext />
				</div>
			</div>

			<CarouselContent>
				{pages.map((page, index) => (
					<CarouselItem key={index} className='w-full max-w-screen-2xl'>
						<div className='w-full text-white'>
							<WavesCard>
								<MarkdownRenderer content={sections[page]!} />
							</WavesCard>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
};

export default Content;
