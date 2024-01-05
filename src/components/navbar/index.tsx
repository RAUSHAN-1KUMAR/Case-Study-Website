'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import Link from 'next/link';

const Navbar = () => {
	const pathname = usePathname();
	return (
		<div className='absolute top-0 z-[1000] w-full'>
			<div className='flex flex-row justify-end px-8 py-4'>
				<Button className='font-medium' asChild>
					{pathname === '/register' ? (
						<Link href='/'>Home</Link>
					) : (
						<Link href='/register'>Register</Link>
					)}
				</Button>
			</div>
		</div>
	);
};

export default Navbar;
