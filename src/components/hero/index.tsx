import React from 'react';
import Spotlight from './Spotlight';

// Icons
import { FaArrowAltCircleDown } from 'react-icons/fa';

const Hero = () => {
	return (
		<div className='bg-grid-white/[0.02] relative flex h-screen w-full select-none justify-center overflow-hidden rounded-md antialiased'>
			<Spotlight className='left-0 top-20 md:-top-20 md:left-60' fill='white' />
			<div className='relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center p-4 pt-20 md:pt-0'>
				<div className='bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-5xl font-bold text-transparent md:text-8xl'>
					<h1>InsightX</h1>
					<h1 className='text-4xl md:text-7xl'> by Entrepreneurship Cell</h1>
				</div>
				<p className='mx-auto mt-4 max-w-3xl py-4 text-center text-base font-normal text-neutral-300'>
					Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
					ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
					parturient montes, nascetur ridiculus mus.
				</p>
			</div>
			<div className='absolute bottom-20 z-10 cursor-pointer'>
				<FaArrowAltCircleDown className='animate-bounce text-4xl text-zinc-300' />
			</div>
		</div>
	);
};

export default Hero;
