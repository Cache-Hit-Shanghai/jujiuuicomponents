'use client';

import { Battery0Icon } from '@/jujiu-ui-components/icons/Battery0';
import { Battery100Icon } from '@/jujiu-ui-components/icons/Battery100';
import { Battery25Icon } from '@/jujiu-ui-components/icons/Battery25';
import { Battery50Icon } from '@/jujiu-ui-components/icons/Battery50';
import { Battery75Icon } from '@/jujiu-ui-components/icons/Battery75';
import Link, { useJuJiuT, usePathname, useRouter } from '@/state/translate';
import { Button, Card, CardBody, Tab, Tabs } from '@nextui-org/react';
import { ChatBubble } from '@styled-icons/material/ChatBubble';
import { ChevronLeft } from '@styled-icons/material/ChevronLeft';
import { ChevronRight } from '@styled-icons/material/ChevronRight';
import { ContentCopy } from '@styled-icons/material/ContentCopy';
import { ControlCamera } from '@styled-icons/material/ControlCamera';
import { DarkMode } from '@styled-icons/material/DarkMode';
import { DirectionsWalk } from '@styled-icons/material/DirectionsWalk';
import { Info } from '@styled-icons/material/Info';
import { LightMode } from '@styled-icons/material/LightMode';
import { NetworkWifi1Bar } from '@styled-icons/material/NetworkWifi1Bar';
import { NetworkWifi2Bar } from '@styled-icons/material/NetworkWifi2Bar';
import { NetworkWifi3Bar } from '@styled-icons/material/NetworkWifi3Bar';
import { SignalWifi0Bar } from '@styled-icons/material/SignalWifi0Bar';
import { SignalWifi4Bar } from '@styled-icons/material/SignalWifi4Bar';
import { Wifi } from '@styled-icons/material/Wifi';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export function MobileHeader({ children, className, ...props }) {
	return (
		<div
			className={twMerge('flex items-center p-2 justify-between', className)}
			{...props}
		>
			{children}
		</div>
	);
}

export function MobileMain({ children, className, as = 'main', ...props }) {
	const Component = as;

	return (
		<Component
			className={twMerge(
				'px-4 py-px flex flex-col gap-4 flex-1 overflow-auto',
				className,
			)}
			{...props}
		>
			{children}
		</Component>
	);
}

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

export function ButtonBack({ onClick, onPress, goBack = true, ...props }) {
	const router = useRouter();

	return (
		<Button
			isIconOnly
			variant='light'
			onPress={() => {
				onClick && onClick();
				onPress && onPress();
				goBack && router.back();
			}}
			className='text-inherit'
			{...props}
		>
			<ChevronLeft size={24} />
		</Button>
	);
}

export function NavbarBack({ label, className, ...props }) {
	return (
		<div
			className={twMerge(
				'gap-4 flex items-center top-0 left-0 z-50',
				className,
			)}
		>
			<ButtonBack {...props} />
			{label}
		</div>
	);
}

export function LinkGroup({ data }) {
	return (
		<Card className='flex-none'>
			<CardBody className='py-0 divide-y divide-divider'>
				{data.map((datum) => (
					<LinkButton
						key={datum.href}
						href={datum.href}
						label={
							<div className='flex flex-row items-center gap-2'>
								{datum.icon}
								{datum.label}
							</div>
						}
						endContent={<ChevronRight size={24} />}
						radius='none'
						className='justify-between px-0'
					/>
				))}
			</CardBody>
		</Card>
	);
}

export function LabeledControl({ label, children }) {
	return (
		<div className='p-2 flex flex-row justify-between items-center'>
			<p>{label}</p>
			{children}
		</div>
	);
}

export function TextDisplay({ label, text }) {
	return (
		<div className='p-2 flex flex-row justify-between items-center'>
			<p>{label}</p>
			<p className='text-sm text-default-500'>{text}</p>
		</div>
	);
}

export function UsnDisplay({ label, usn, btnProps = {} }) {
	return (
		<div className='p-2 '>
			<div className='flex flex-row justify-between items-center'>
				<p>{label}</p>
				<Button size='sm' isIconOnly {...btnProps}>
					<ContentCopy size={24} />
				</Button>
			</div>
			<p className='text-sm text-default-500'>{usn}</p>
		</div>
	);
}

export function IpDisplay({ label, ips }) {
	return (
		<div className='p-2 flex flex-row justify-between items-center'>
			<p>{label}</p>
			<div className='text-sm text-default-500 flex flex-col'>
				{ips.map((ip) => (
					<p className='text-right' key={ip}>
						{ip}
					</p>
				))}
			</div>
		</div>
	);
}

const WiFiIcons = new Map([
	[0, SignalWifi0Bar],
	[1, NetworkWifi1Bar],
	[2, NetworkWifi2Bar],
	[3, NetworkWifi3Bar],
	[4, SignalWifi4Bar],
]);

export function WiFiIcon({ signal, ...passProps }) {
	const Icon = WiFiIcons.get(signal) || SignalWifi4Bar;
	return <Icon {...passProps} />;
}

export function WiFiDisplay({ label, text, signal }) {
	return (
		<div className='p-2 flex flex-row justify-between items-center'>
			<p>{label}</p>
			<div className='text-sm text-default-500 flex flex-row items-center'>
				<WiFiIcon size={24} signal={signal} />
				{text}
			</div>
		</div>
	);
}

const BatteryIcons = new Map([
	[0, Battery0Icon],
	[1, Battery25Icon],
	[2, Battery50Icon],
	[3, Battery75Icon],
	[4, Battery100Icon],
]);

const ChargingBatteryIcons = new Map([
	// [0, ChargingBattery0Icon],
	// [1, ChargingBattery25Icon],
	// [2, ChargingBattery50Icon],
	// [3, ChargingBattery75Icon],
	// [4, ChargingBattery100Icon],
]);

export function BatteryIcon({ batteryLevel, isCharging, ...props }) {
	const boolIsCharging = isCharging === 1;
	const Icon = boolIsCharging
		? ChargingBatteryIcons.get(parseInt(batteryLevel))
		: BatteryIcons.get(parseInt(batteryLevel)) || Battery0Icon;
	return <Icon {...props} />;
}

export function BatteryDisplay({ label, level, isCharging }) {
	return (
		<div className='p-2 flex flex-row justify-between items-center'>
			{label && <p>{label}</p>}
			<div className='text-sm text-default-500 flex flex-row items-center'>
				<BatteryIcon size={24} batteryLevel={level} isCharging={isCharging} />
			</div>
		</div>
	);
}

export function FeaturesDisplay({ label }) {
	const t = useJuJiuT();

	return (
		<div className='p-2 flex flex-row justify-between items-center'>
			<p>{label}</p>
			<div className='text-sm text-default-500 gap-2 flex flex-row items-center flex-wrap justify-end'>
				<div className='text-sm flex flex-col items-center'>
					<ChatBubble size={24} />
					<p>{t('双向语音')}</p>
				</div>
				<div className='text-sm flex flex-col items-center'>
					<Wifi size={24} />
					<p>WiFi</p>
				</div>
				<div className='text-sm flex flex-col items-center'>
					<DirectionsWalk size={24} />
					<p>{t('移动侦测')}</p>
				</div>
				<div className='text-sm flex flex-col items-center'>
					<ControlCamera size={24} />
					<p>{t('云台')}</p>
				</div>
			</div>
		</div>
	);
}

export function LinkButton({
	href,
	icon,
	label,
	className,
	variant,
	...props
}) {
	return (
		<Button
			isIconOnly={!label}
			variant={variant || 'light'}
			as={Link}
			href={href}
			className={className}
			{...props}
		>
			<div className='flex flex-col items-center'>
				{icon}
				{typeof label === 'string' ? <p className='text-xs'>{label}</p> : label}
			</div>
		</Button>
	);
}

export function LabelButton({ label, children, onClick, ...props }) {
	return (
		<Button
			{...props}
			onClick={onClick}
			variant='light'
			radius='none'
			endContent={<ChevronRight size={24} />}
			className='px-0'
		>
			<div className='flex flex-row items-center grow justify-between py-1'>
				<span>{label}</span>
				{children || <p className='w-10' />}
			</div>
		</Button>
	);
}

export function LabelLink({ href, ...props }) {
	return <LabelButton as={Link} href={href} {...props} />;
}

export function IconButton({
	icon,
	label,
	className,
	onClick = () => {},
	isDisabled,
	...props
}) {
	return (
		<Button
			{...props}
			isIconOnly={!label}
			isDisabled={isDisabled}
			variant='light'
			onClick={onClick}
			className={className}
		>
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
		<Tabs
			fullWidth
			size='sm'
			color='primary'
			variant='light'
			selectedKey={pathname}
			classNames={{
				tab: 'h-fit',
			}}
		>
			{data.map((datum) => (
				<Tab
					as={Link}
					key={datum.href}
					href={datum.href}
					title={
						<div className='flex flex-col items-center'>
							{datum.icon}
							{t(datum.label)}
						</div>
					}
				/>
			))}
		</Tabs>
	);
}

export function Information({ label = '' }) {
	return (
		<div className='flex shrink-0 justify-center items-center gap-2'>
			<div>
				<Info className='text-warning' size={24} />
			</div>
			<span className='text-xs text-warning'>{label}</span>
		</div>
	);
}

export function InfoGroup({ data }) {
	return (
		<Card>
			<CardBody className='py-0 divide-y divide-divider'>
				{data.map(({ key, value }) => (
					<div key={key} className='py-2 flex flex-row justify-between gap-4'>
						<p className='text-sm whitespace-nowrap'>{key}</p>
						<p className='text-xs text-default-500'>{value}</p>
					</div>
				))}
			</CardBody>
		</Card>
	);
}
