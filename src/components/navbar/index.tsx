import React from 'react';

import { Button } from '../ui/button';
import Link from 'next/link';

const Navbar = () => {
	return (
		<div className='absolute top-0 z-10 w-full'>
			<div className='flex flex-row justify-end px-8 py-4'>
				<Button className='font-medium' asChild>
					<Link href='/register'>Register</Link>
				</Button>
			</div>
		</div>
	);
};

export default Navbar;
