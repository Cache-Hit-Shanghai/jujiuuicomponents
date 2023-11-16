'use client';

import { Button, Card, CardBody, Listbox, ListboxItem, Tabs, Tab } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Link, { useJuJiuT, useRouter, usePathname } from '@/state/translate';
import { Sun } from '@styled-icons/heroicons-outline/Sun';
import { Moon } from '@styled-icons/heroicons-outline/Moon';
import { ChevronLeft } from '@styled-icons/heroicons-outline/ChevronLeft';
import { ChevronRight } from '@styled-icons/heroicons-outline/ChevronRight';
import { InformationCircle } from '@styled-icons/heroicons-outline/InformationCircle';

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
			{theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
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
			<ChevronLeft size={16} />
		</Button>
	);
}

export function NavbarBack({ label, children }) {
	return (
		<div className={`p-2 gap-4 flex items-center sticky top-0 left-0 z-50 bg-white dark:bg-black`}>
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
							endContent={<ChevronRight size={16} />}
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
			<Button {...props} onClick={onClick} variant='light' endContent={<ChevronRight size={24} />}>
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
			<InformationCircle className='text-warning' size={24} />
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
