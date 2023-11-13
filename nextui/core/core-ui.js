'use client';

import { Button, Card, CardBody, Listbox, ListboxItem, Tabs, Tab } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Link, { useJuJiuT, useRouter, usePathname } from '@/state/translate';
import { SunIcon, MoonIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export function ThemeButton() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

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
			isIconOnly
			isIconOnly
			variant='light'
			onPress={() => {
				onClick && onClick();
				router.back();
			}}
		>
			<ChevronLeftIcon className='h-6 w-6' />
		</Button>
	);
}

export function NavbarBack({ label }) {
	return (
		<div className='p-2 gap-4 flex items-center'>
			<ButtonBack />
			<p className='self-center'>{label}</p>
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
							<p className='text-base'>{datum.label}</p>
						</ListboxItem>
					)}
				</Listbox>
			</CardBody>
		</Card>
	);
}

export function LinkButton({ href, icon, label, className }) {
	return (
		<Button isIconOnly={!label} variant='light' as={Link} href={href} className={className}>
			<div className='flex flex-col items-center'>
				{icon}
				<p>{label}</p>
			</div>
		</Button>
	);
}

export function NavTabs({ data = [] }) {
	const t = useJuJiuT();
	const pathname = usePathname();

	return (
		<Tabs fullWidth color='primary' variant='light' selectedKey={pathname} className='p-2'>
			{data.map((datum) => (
				<Tab
					as={Link}
					key={datum.href}
					href={datum.href}
					title={
						<div className='flex flex-row items-center gap-2'>
							{datum.icon}
							{t(datum.label)}
						</div>
					}
				/>
			))}
		</Tabs>
	);
}