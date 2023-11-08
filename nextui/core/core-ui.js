'use client';

import { Button, Card, CardBody, Listbox, ListboxItem, Spacer } from '@nextui-org/react';
import { useRouter } from '@/state/translate';
import { ArrowUturnLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export function ButtonBack({ onClick }) {
	const router = useRouter();

	return (
		<Button
			isIconOnly
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
			<Spacer x={4} />
			<p className='text-base'>{label}</p>
		</div>
	);
}

export function LinkGroup({ data }) {
	return (
		<Card>
			<CardBody>
				<Listbox aria-label='LinkGroup'>
					{data.map((datum) => (
						<ListboxItem
							key={datum.label}
							textValue={datum.label}
							href={datum.url}
							endContent={<ChevronRightIcon className='h-6 w-6' />}
						>
							<p className='text-base'>{datum.label}</p>
						</ListboxItem>
					))}
				</Listbox>
			</CardBody>
		</Card>
	);
}
