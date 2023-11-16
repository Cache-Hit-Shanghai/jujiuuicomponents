'use client';

import { Button, Card, CardBody, Listbox, ListboxItem, Tabs, Tab } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Link, { useJuJiuT, useRouter, usePathname } from '@/state/translate';
import {
	SunIcon,
	MoonIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	InformationCircleIcon,
} from '@heroicons/react/24/outline';

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

export function NavbarBack({ label, children }) {
	return (
		<div className={`p-2 gap-4 flex items-center sticky top-0 left-0 z-50 bg-background`}>
			<ButtonBack />
			<p className='self-center'>{label}</p>
			{children}
		</div>
	);
}

export function LinkGroup({ data }) {
	return (
		<Card>
			<CardBody className='py-0'>
				<Listbox items={data} aria-label='LinkGroup'>
					{(datum) => (
						<ListboxItem
							showDivider={!datum.last}
							as={Link}
							key={datum.label}
							href={datum.href}
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

const LabelButton = ({ label, children, onClick, ...props }) => {
	return (
		<div className='flex grow justify-between border-b py-1' onClick={onClick}>
			<span>{label}</span>
			<Button
				{...props}
				onClick={onClick}
				variant='light'
				endContent={<ChevronRightIcon width={'24px'} height={'24px'}></ChevronRightIcon>}
			>
				{children || <p className='w-10'></p>}
			</Button>
		</div>
	);
};

const LabelLink = ({ href, ...props }) => {
	return (
		<Link href={href} color='foreground'>
			<LabelButton {...props}></LabelButton>
		</Link>
	);
};

export function IconButton({ icon, label, className, onClick = () => {}, ...props }) {
	return (
		<Button {...props} isIconOnly={!label} variant='light' onClick={onClick} className={className}>
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

const Information = ({ label = '' }) => {
	return (
		<div className='flex shrink-0 justify-center items-center gap-1'>
			<InformationCircleIcon
				className='stroke-amber-300 shrink-0'
				width={'24px'}
				height={'24px'}
			></InformationCircleIcon>
			<span className='text-xs text-amber-300'>{label}</span>
		</div>
	);
};

function InfoGroup({ data }) {
	return (
		<Card>
			<CardBody>
				<Listbox items={data} aria-label='InfoGroup'>
					{(datum) => (
						<ListboxItem
							key={datum.key}
							startContent={<p className='text-base'>{datum.key}</p>}
							endContent={<p className='text-base'>{datum.value}</p>}
						></ListboxItem>
					)}
				</Listbox>
			</CardBody>
		</Card>
	);
}

export { Information, LabelButton, LabelLink, InfoGroup };
