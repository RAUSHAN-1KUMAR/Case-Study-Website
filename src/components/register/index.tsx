'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { cn } from '~/utils';

export const Hero = () => {
	return (
		<div className='relative flex h-[20rem] justify-center overflow-hidden border-b-[1px] border-neutral-900'>
			<BackgroundCellCore />
			<div className='pointer-events-none relative z-50 mt-20 select-none'>
				<h1 className='pointer-events-none bg-gradient-to-b from-neutral-100 to-neutral-400 bg-clip-text py-2 text-center text-5xl font-medium text-transparent md:text-6xl lg:text-7xl'>
					Register for <br />
					InsightX
				</h1>
			</div>
		</div>
	);
};

const BackgroundCellCore = () => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	const ref = useRef<HTMLDivElement | null>(null);

	const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
		const rect = ref.current?.getBoundingClientRect();
		if (!rect) return;
		setMousePosition({
			x: event.clientX - rect.left,
			y: event.clientY - rect.top,
		});
	};

	const size = 500;
	return (
		<div
			ref={ref}
			onMouseMove={handleMouseMove}
			className='absolute inset-0 h-full'
		>
			<div className='from-[#0A0A0A]opacity-100 absolute inset-y-0 h-[24rem] overflow-hidden  bg-gradient-to-b  to-[#0A0A0A] opacity-50'>
				<div className='pointer-events-none absolute -bottom-2 z-40 h-full w-full [mask-image:linear-gradient(to_bottom,transparent,#0A0A0A)]'></div>
				<div
					className='absolute inset-0 z-20 bg-transparent'
					style={{
						maskImage: `radial-gradient(
            ${size / 4}px circle at center,
           white, transparent
          )`,
						WebkitMaskImage: `radial-gradient(
          ${size / 4}px circle at center,
          white, transparent
        )`,
						WebkitMaskPosition: `${mousePosition.x - size / 2}px ${
							mousePosition.y - size / 2
						}px`,
						WebkitMaskSize: `${size}px`,
						maskSize: `${size}px`,
						pointerEvents: 'none',
						maskRepeat: 'no-repeat',
						WebkitMaskRepeat: 'no-repeat',
					}}
				>
					<Pattern cellClassName='border-gray-600 relative z-[100]' />
				</div>
				<Pattern className='opacity-[0.5]' cellClassName='border-neutral-700' />
			</div>
		</div>
	);
};

const Pattern = ({
	className,
	cellClassName,
}: {
	className?: string;
	cellClassName?: string;
}) => {
	const x = new Array(47).fill(0);
	const y = new Array(30).fill(0);
	const matrix = x.map((_, i) => y.map((_, j) => [i, j]));
	const [clickedCell, setClickedCell] = useState<number[] | null>(null);

	return (
		<div className={cn('relative z-30 flex flex-row', className)}>
			{matrix.map((row, rowIdx) => (
				<div
					key={`matrix-row-${rowIdx}`}
					className='relative z-20  flex flex-col border-b'
				>
					{row.map((column, colIdx) => {
						// eslint-disable-next-line react-hooks/rules-of-hooks
						const controls = useAnimation();

						// eslint-disable-next-line react-hooks/rules-of-hooks
						useEffect(() => {
							if (clickedCell) {
								const distance = Math.sqrt(
									Math.pow(clickedCell[0]! - rowIdx, 2) +
										Math.pow(clickedCell[1]! - colIdx, 2)
								);
								void controls.start({
									opacity: [0, 1 - distance * 0.1, 0],
									transition: { duration: distance * 0.2 },
								});
							}
						}, [clickedCell]);

						return (
							<div
								key={`matrix-col-${colIdx}`}
								className={cn(
									'border-b border-l border-neutral-600 bg-transparent',
									cellClassName
								)}
								onClick={() => setClickedCell([rowIdx, colIdx])}
							>
								<motion.div
									initial={{
										opacity: 0,
									}}
									whileHover={{
										opacity: [0, 1, 0.5],
									}}
									transition={{
										duration: 0.5,
										ease: 'backOut',
									}}
									animate={controls}
									className='h-12 w-12 bg-[rgba(57,77,86,0.3)]' //  rgba(14, 165, 233, 0.15) for a more subtle effect
								></motion.div>
							</div>
						);
					})}
				</div>
			))}
		</div>
	);
};
