'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	useForm,
	useFieldArray,
	type SubmitHandler,
	type SubmitErrorHandler,
} from 'react-hook-form';
import type * as z from 'zod';

// Components
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '~/components/ui/form';

import { TeamSchema } from '~/lib/zod';
import { BsFillTrash3Fill } from 'react-icons/bs';

const RegisterForm = () => {
	const form = useForm<z.infer<typeof TeamSchema>>({
		resolver: zodResolver(TeamSchema),
		defaultValues: {
			teamLeader: {
				isLeader: true,
			},
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'teamMembers',
	});

	const onAddMember = () => {
		append({
			name: '',
			email: '',
			phoneNumber: '',
		});
	};

	const onSubmit: SubmitHandler<z.infer<typeof TeamSchema>> = (
		values: z.infer<typeof TeamSchema>
	) => {
		console.log(values);
	};

	const onError: SubmitErrorHandler<z.infer<typeof TeamSchema>> = (
		errors,
		event
	) => {
		console.log(errors, event);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit, onError)} className='space-y-3'>
				<FormField
					control={form.control}
					name='teamName'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-white'>Team Name</FormLabel>
							<FormControl>
								<Input placeholder='Case Crackers' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='pt-6 text-lg text-white'>Team Leader Details</div>
				<FormField
					control={form.control}
					name='teamLeader.name'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-white'>Name</FormLabel>
							<FormControl>
								<Input placeholder='John Doe' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='teamLeader.email'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-white'>E-mail</FormLabel>
							<FormControl>
								<Input placeholder='john.doe@gmail.com' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='teamLeader.phoneNumber'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-white'>Phone</FormLabel>
							<FormControl>
								<Input placeholder='8973518316' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{fields.map((item, index) => (
					<React.Fragment key={index}>
						<div className='flex flex-row items-center gap-2 pt-6'>
							<div className='text-lg text-white'>Team Member {index + 1}</div>
							<Button
								size='icon'
								onClick={() => remove(index)}
								variant='ghost'
								className='hover:bg-[#0A0A0A]'
							>
								<BsFillTrash3Fill className='text-neutral-300' />
							</Button>
						</div>

						<FormField
							control={form.control}
							name={`teamMembers.${index}.name`}
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-white'>Name</FormLabel>
									<FormControl>
										<Input placeholder={`Team member ${index + 1} name`} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name={`teamMembers.${index}.email`}
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-white'>E-mail</FormLabel>
									<FormControl>
										<Input placeholder={`member${index + 1}@gmail.com`} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name={`teamMembers.${index}.phoneNumber`}
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-white'>Phone</FormLabel>
									<FormControl>
										<Input placeholder={`Team member ${index + 1} Phone`} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</React.Fragment>
				))}
				<Button
					variant='outline'
					className='w-full bg-[#0A0A0A] text-white hover:bg-[#0A0A0A] hover:text-white'
					type='button'
					onClick={onAddMember}
				>
					Add Team Member
				</Button>

				<div className='flex justify-center py-12'>
					<Button variant='secondary' type='submit'>
						Submit
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default RegisterForm;
