'use client';

import { Button, Card, CardBody, Listbox, ListboxItem, Tabs, Tab } from '@nextui-org/react';
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

export function ThemeButton() {
	const { theme, setTheme } = useTheme();

	return (
		<Button
			isIconOnly
			aria-label='ThemeButton'
			variant='light'
			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
		>
			{theme === 'light' ? <MoonIcon className='h-6 w-6' /> : <SunIcon className='h-6 w-6' />}
		</Button>
	);
}

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

export function NavTabs() {
	const t = useJuJiuT();
	const pathname = usePathname();

	return (
		<Tabs fullWidth color='primary' variant='light' selectedKey={pathname}>
			<Tab
				key='/'
				title={
					<div className='flex flex-row items-center gap-2'>
						<HomeModernIcon className='h-6 w-6' />
						{t('设备')}
					</div>
				}
				as={Link}
				href='/'
			/>
			<Tab
				key='/discovery/'
				title={
					<div className='flex flex-row items-center gap-2'>
						<MagnifyingGlassIcon className='h-6 w-6' />
						{t('发现')}
					</div>
				}
				as={Link}
				href='/my2/'
			/>
			<Tab
				key='/my2/'
				title={
					<div className='flex flex-row items-center gap-2'>
						<UserCircleIcon className='h-6 w-6' />
						{t('我的')}
					</div>
				}
				as={Link}
				href='/my2/'
			/>
		</Tabs>
	);
}
