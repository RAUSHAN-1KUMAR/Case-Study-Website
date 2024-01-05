import React from 'react';
import RegisterForm from '~/components/form';
import { Hero } from '~/components/register';

const Register = () => {
	return (
		<div className=''>
			<Hero />
			<div className='mx-auto my-12 max-w-lg px-4'>
				<RegisterForm />
			</div>
		</div>
	);
};

export default Register;
