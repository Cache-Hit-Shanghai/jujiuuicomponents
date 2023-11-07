'use client';

import { Button } from '@nextui-org/react';
import { useRouter } from '@/state/translate';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';

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
