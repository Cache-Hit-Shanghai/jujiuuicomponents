'use client';

import { Button, Card, CardBody, Listbox, ListboxItem } from '@nextui-org/react';
import Link, { useRouter } from '@/state/translate';
import { ArrowUturnLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export function ButtonBack({ onClick }) {
	const router = useRouter();

	return (
		<Button
			variant='light'
			onPress={() => {
				onClick && onClick();
				router.back();
			}}
		>
			<ArrowUturnLeftIcon className='h-6 w-6' />
		</Button>
	);
}

export function NavbarBack({ label }) {
	return (
		<div className='flex items-center'>
			<ButtonBack />
			<p className='text-base'>{label}</p>
		</div>
	);
}

export function LinkGroup({ data }) {
	return (
		<Card>
			<CardBody>
				<Listbox items={data} aria-label='LinkGroup'>
					{(datum) => (
						<ListboxItem
							as={Link}
							key={datum.label}
							href={datum.url}
							endContent={<ChevronRightIcon className='h-6 w-6' />}
						>
							{datum.label}
						</ListboxItem>
					)}
				</Listbox>
			</CardBody>
		</Card>
	);
}

export function LinkButton({ href, icon, label }) {
	return (
		<Button variant='light' as={Link} href={href}>
			<div className='flex flex-col items-center'>
				{icon}
				<p>{label}</p>
			</div>
		</Button>
	);
}
