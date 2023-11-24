'use client';

import { Button, Card, CardBody, Listbox, ListboxItem, Tabs, Tab } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Link, { useJuJiuT, useRouter, usePathname } from '@/state/translate';
import { LightMode } from '@styled-icons/material/LightMode';
import { DarkMode } from '@styled-icons/material/DarkMode';
import { ChevronLeft } from '@styled-icons/material/ChevronLeft';
import { ChevronRight } from '@styled-icons/material/ChevronRight';
import { Info } from '@styled-icons/material/Info';

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
			{theme === 'light' ? <DarkMode size={24} /> : <LightMode size={24} />}
		</Button>
	);
}

export function ButtonBack({ onClick, onPress, ...props }) {
	const router = useRouter();

	return (
		<Button
			isIconOnly
			variant='light'
			onPress={() => {
				onClick && onClick();
				onPress && onPress();
				router.back();
			}}
			{...props}
		>
			<ChevronLeft size={24} />
		</Button>
	);
}

export function NavbarBack({ label, children, className, ...props }) {
	return (
		<div className={`p-2 gap-4 flex items-center top-0 left-0 z-50 ${className || ''}`}>
			<ButtonBack {...props} />
			{label}
			{children}
		</div>
	);
}

export function LinkGroup({ data }) {
	return (
		<Card className='flex-none'>
			<CardBody className='py-0'>
				<Listbox items={data} aria-label='LinkGroup'>
					{(datum) => (
						<ListboxItem
							showDivider={!datum.last}
							as={Link}
							key={datum.label}
							href={datum.href}
							endContent={<ChevronRight size={24} />}
						>
							<div className='flex flex-row items-center gap-4'>
								{datum.icon}
								<p className='text-base'>{datum.label}</p>
							</div>
						</ListboxItem>
					)}
				</Listbox>
			</CardBody>
		</Card>
	);
}

export function TextGroup({ data }) {
	return (
		<Card className='flex-none'>
			<CardBody className='py-0'>
				<Listbox items={data} aria-label='LinkGroup'>
					{(datum) => (
						<ListboxItem
							showDivider={!datum.last}
							key={datum.label}
							endContent={<p className='text-sm text-default-500'>{datum.text}</p>}
						>
							<div className='flex flex-row items-center gap-4'>
								{datum.icon}
								<p className='text-base'>{datum.label}</p>
							</div>
						</ListboxItem>
					)}
				</Listbox>
			</CardBody>
		</Card>
	);
}

export function LinkButton({ href, icon, label, className, ...props }) {
	return (
		<Button isIconOnly={!label} variant='light' as={Link} href={href} className={className} {...props}>
			<div className='flex flex-col items-center'>
				{icon}
				<p>{label}</p>
			</div>
		</Button>
	);
}

const LabelButton = ({ label, children, onClick, ...props }) => {
	return (
		<Button {...props} onClick={onClick} variant='light' endContent={<ChevronRight size={16} />}>
			<div className='flex flex-row items-center grow justify-between py-1'>
				<span>{label}</span>
				{children || <p className='w-10' />}
			</div>
		</Button>
	);
};

const LabelLink = ({ href, ...props }) => {
	return <LabelButton as={Link} href={href} {...props} />;
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
		<div className='flex shrink-0 justify-center items-center gap-2'>
			<div>
				<Info className='text-warning' size={24} />
			</div>
			<span className='text-xs text-warning'>{label}</span>
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
