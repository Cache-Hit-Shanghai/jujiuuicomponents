'use client';

import { Button, Card, CardBody, Listbox, ListboxItem, Tabs, Chip } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import Link, { useJuJiuT, useRouter, usePathname } from '@/state/translate';
import {
	ArrowTopRightOnSquareIcon,
	CloudIcon,
	ArrowLeftOnRectangleIcon,
	Battery50Icon,
	ArrowUturnLeftIcon,
	ChevronRightIcon,
	MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';

export function ChipOnline() {
	const t = useJuJiuT();

	return (
		<Chip variant='dot' color='success'>
			{t('在线')}
		</Chip>
	);
}

export function ChipOffline() {
	const t = useJuJiuT();

	return <Chip variant='dot'>{t('离线')}</Chip>;
}

export function ChipFromFriends() {
	const t = useJuJiuT();

	return (
		<Chip color='primary' startContent={<ArrowLeftOnRectangleIcon className='h-5 w-5' />}>
			{t('来自分享')}
		</Chip>
	);
}

export function ChipShared() {
	const t = useJuJiuT();

	return (
		<Chip color='secondary' startContent={<ArrowTopRightOnSquareIcon className='h-5 w-5' />}>
			{t('分享中')}
		</Chip>
	);
}

export function ChipCloudStorageExpiring() {
	const t = useJuJiuT();

	return (
		<Chip color='warning' startContent={<CloudIcon className='h-5 w-5' />}>
			{t('云存储即将过期')}
		</Chip>
	);
}

export function ChipCloudStorageExpired() {
	const t = useJuJiuT();

	return (
		<Chip color='danger' startContent={<CloudIcon className='h-5 w-5' />}>
			{t('云存储已过期')}
		</Chip>
	);
}
