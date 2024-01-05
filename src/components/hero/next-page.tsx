'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

// Icons
import { FaArrowAltCircleDown } from 'react-icons/fa';

const NextPageButton = () => {
	const router = useRouter();
	return (
		<div>
			<FaArrowAltCircleDown
				className='animate-bounce text-4xl text-zinc-300'
				onClick={() => {
					void router.push('/#content');
				}}
			/>
		</div>
	);
};

export default NextPageButton;
