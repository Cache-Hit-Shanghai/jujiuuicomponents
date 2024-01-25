'use client';

import {
	Button,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Card,
	CardBody,
	CardFooter,
	Image,
} from '@nextui-org/react';
import Link, { useJuJiuT } from '@/state/translate';
import { Settings } from '@styled-icons/material/Settings';
import { VideoLibrary } from '@styled-icons/material/VideoLibrary';
import { MoreHoriz } from '@styled-icons/material/MoreHoriz';
import { NestCamWiredStand } from '@styled-icons/material/NestCamWiredStand';
import { Pets } from '@styled-icons/material/Pets';
import { BatteryChargingFull } from '@styled-icons/material/BatteryChargingFull';

function DeviceMenu() {
	const t = useJuJiuT();

	return (
		<Dropdown backdrop='blur'>
			<DropdownTrigger>
				<Button isIconOnly variant='light'>
					<MoreHoriz size={24} />
				</Button>
			</DropdownTrigger>
			<DropdownMenu aria-label='Static Actions'>
				<DropdownItem
					key='records'
					as={Link}
					href='./record'
					startContent={<VideoLibrary size={24} />}
				>
					{t('录像查看')}
				</DropdownItem>
				<DropdownItem
					key='deviceSettings'
					as={Link}
					href='./settings'
					startContent={<Settings size={24} />}
				>
					{t('设备设置')}
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
}

export function IpcCard({ label, sources, href, bodyChips, footerChips }) {
	return (
		<Card>
			<CardBody className='relative p-0' as={Link} href={href}>
				<div className='flex flex-col gap-2'>
					{sources.map((src) => (
						<Image key={src} src={src} className='z-0' />
					))}
				</div>
				<div className='absolute left-1 top-1 flex flex-row gap-4'>
					{...bodyChips}
				</div>
			</CardBody>
			<CardFooter className='flex justify-between items-center'>
				<div className='flex items-center gap-2'>
					<NestCamWiredStand size={24} />
					{label}
					{...footerChips}
				</div>
				<DeviceMenu />
			</CardFooter>
		</Card>
	);
}

export function BotCard({ label, src, href, bodyChips, footerChips }) {
	return (
		<Card>
			<CardBody className='relative p-0' as={Link} href={href}>
				<Image src={src} className='z-0' />
				<div className='absolute left-1 top-1 flex flex-row gap-4'>
					{...bodyChips}
				</div>
			</CardBody>
			<CardFooter className='flex justify-between items-center'>
				<div className='flex items-center gap-2'>
					<Pets size={24} />
					{label}
					<BatteryChargingFull size={24} />
					{...footerChips}
				</div>
				<DeviceMenu />
			</CardFooter>
		</Card>
	);
}
