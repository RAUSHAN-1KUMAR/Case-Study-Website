'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	useForm,
	useFieldArray,
	type SubmitHandler,
	type SubmitErrorHandler,
	type FieldErrors,
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
import { AiOutlineLoading } from 'react-icons/ai';
import { toast } from 'sonner';

interface CreateTeamResponse {
	id: string;
	teamName: string;
	createdAt: Date;
	updatedAt: Date;
}
export type Team = z.infer<typeof TeamSchema>;

export type FlattenObjects<T> = T extends object
	? T extends infer O
		? { [K in keyof O]: FlattenObjects<O[K]> }
		: never
	: T;

const RegisterForm = () => {
	const form = useForm<Team>({
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
		if (fields.length >= 4) {
			toast.error(
				'A team can have maximum of 5 members including the team leader'
			);
			return;
		}
		append({
			name: '',
			email: '',
			phoneNumber: '',
		});
	};

	const onSubmit: SubmitHandler<Team> = async (
		values: z.infer<typeof TeamSchema>
	) => {
		try {
			// console.log(values);
			const res = await fetch('/api/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			}).then(
				async (res) => (await res.json()) as CreateTeamResponse | { error: string }
			);
			if ('error' in res) {
				throw new Error(res.error);
			} else if (res.id) {
				toast.success('Team created successfully');
				form.reset({
					teamName: '',
					teamLeader: {
						name: '',
						email: '',
						phoneNumber: '',
						isLeader: true,
					},
					teamMembers: [],
				});
			}
		} catch (error) {
			toast.error(String(error));
		}
	};

	function collectErrors(obj: FieldErrors<Team>): string[] {
		const errors: string[] = [];
		const processObject = (nestedObj: FieldErrors<Team>) => {
			for (const key in nestedObj) {
				if (nestedObj.hasOwnProperty(key)) {
					const value = nestedObj[key as keyof Team];
					if (typeof value === 'object' && value !== null) {
						processObject(value);
					} else if (key === 'message' && typeof value === 'string') {
						errors.push(value);
					}
				}
			}
		};
		processObject(obj);
		return errors;
	}

	const onError: SubmitErrorHandler<Team> = (errors) => {
		const errorMessages = collectErrors(errors);
		errorMessages.forEach((err) => {
			toast.error(err);
		});
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
								<Input
									placeholder='Case Crackers'
									{...field}
									disabled={form.formState.isSubmitting}
								/>
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
								<Input
									placeholder='John Doe'
									{...field}
									disabled={form.formState.isSubmitting}
								/>
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
								<Input
									placeholder='john.doe@gmail.com'
									{...field}
									disabled={form.formState.isSubmitting}
								/>
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
								<Input
									placeholder='8973518316'
									{...field}
									disabled={form.formState.isSubmitting}
								/>
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
								disabled={form.formState.isSubmitting}
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
										<Input
											placeholder={`Team member ${index + 1} name`}
											{...field}
											disabled={form.formState.isSubmitting}
										/>
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
										<Input
											placeholder={`member${index + 1}@gmail.com`}
											{...field}
											disabled={form.formState.isSubmitting}
										/>
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
										<Input
											placeholder={`Team member ${index + 1} Phone`}
											{...field}
											disabled={form.formState.isSubmitting}
										/>
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
					disabled={form.formState.isSubmitting}
				>
					Add Team Member
				</Button>

				<div className='flex justify-center py-12'>
					<Button
						variant='secondary'
						type='submit'
						className='w-full max-w-[6rem]'
						disabled={form.formState.isSubmitting}
					>
						{form.formState.isSubmitting ? (
							<AiOutlineLoading className='animate-spin text-xl' />
						) : (
							'Submit'
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default RegisterForm;
