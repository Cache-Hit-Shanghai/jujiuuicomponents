'use client';

import { Button, Card, CardBody, Listbox, ListboxItem  } from '@nextui-org/react';
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

export function LinkGroup({ data }) {
	return (
		<Card>
			<CardBody>
				<Listbox aria-label='LinkGroup'>
          {data.map(datum => (
            <ListboxItem key={datum.label} textValue={datum.label} href={datum.url} endContent={<ChevronRightIcon className='h-6 w-6' />}>
              {datum.label}
            </ListboxItem>
          ))}
        </Listbox>
			</CardBody>
		</Card>
	);
}