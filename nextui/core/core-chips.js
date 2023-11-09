'use client';

import { Button, Card, CardBody, Listbox, ListboxItem, Tabs, Chip } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import Link, { useJuJiuT, useRouter, usePathname } from '@/state/translate';
import {
	SunIcon,
	MoonIcon,
	UserCircleIcon,
	HomeModernIcon,
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
