import { Avatar, Text, Tag, Box, Menu, Button, Heading, DropButton, RangeInput } from 'grommet';
import {
	Home,
	Radial,
	Webcam,
	Scan,
	Info,
	Cycle,
	Volume,
	VolumeLow,
	VolumeMute,
	CaretLeftFill,
	StatusCritical,
} from 'grommet-icons';
import { Settings3 } from '@styled-icons/remix-fill/Settings3';
import { FlashlightOn } from '@styled-icons/material-rounded/FlashlightOn';
import { FlashlightOff } from '@styled-icons/material-rounded/FlashlightOff';
import { SettingsOutline } from '@styled-icons/evaicons-outline/SettingsOutline';
import Link from '@/state/translate';
import { useState } from 'react';

import { ButtonLink, IconLink } from './core/core-ui';
import styles from './components.module.css';

// console.log('styles', styles);

export function AppLogo() {
	return (
		<Box gap='large'>
			<Box direction='row' align='center' justify='center' gap='small'>
				<Webcam color='brand' size='xlarge' />
				<Box align='center' gap='medium'>
					<Heading margin='none' level={1} size='large'>
						云探
					</Heading>
					<Box direction='row'>
						<Tag value='IPv6' border={false} size='xsmall' background='accent-4' />
					</Box>
				</Box>
			</Box>
			<Box align='center'>
				<Text size='large'>全球领先的Web视觉系统</Text>
				<Text size='small'>
					Powered by 雎鸠云<sup>&reg;</sup>
				</Text>
			</Box>
		</Box>
	);
}

export function AppMark() {
	return (
		<Box flex={false} align='center' margin='large'>
			<Box direction='row' gap='small' align='center'>
				<Text size='large'>
					云探智能视觉系统<sup>&reg;</sup>
				</Text>
			</Box>
			<Text size='xsmall'>&copy;2021-2023 上海光方迅视科技有限公司 版权所有</Text>
		</Box>
	);
}

export function ButtonBackToMain() {
	return <ButtonLink primary href='/' label='回到主页' />;
}

export function FlashLight() {
	const [on, setOn] = useState(false);
	return (
		<Button primary onClick={() => setOn(!on)}>
			<Avatar border>{on ? <FlashlightOff size='24' /> : <FlashlightOn size='24' />}</Avatar>
		</Button>
	);
}

export function VolumeControl({ showTitle = true }) {
	const [volume, setVolume] = useState(10);

	function selectIcon(volume) {
		if (volume === 0) return <VolumeMute />;
		else if (volume < 20) return <VolumeLow />;
		else return <Volume />;
	}

	return (
		<DropButton
			dropContent={
				<Box pad='small'>
					<RangeInput
						min={0}
						max={100}
						value={volume}
						onChange={(e) => setVolume(parseInt(e.target.value))}
					/>
				</Box>
			}
			dropProps={{ align: { bottom: 'top' } }}
		>
			<Box align='center'>
				{selectIcon(volume)}
				{showTitle && <Text size='small'>音量</Text>}
			</Box>
		</DropButton>
	);
}

// export function PanControl({ onPanClick = () => {} }) {
// 	return (
// 		<Box responsive={false} className={styles.sector}>
// 			{[
// 				{
// 					direction: 'top',
// 					Icon: CaretUpFill,
// 				},
// 				{
// 					direction: 'right',
// 					Icon: CaretRightFill,
// 				},
// 				{
// 					direction: 'bottom',
// 					Icon: CaretDownFill,
// 				},
// 				{
// 					direction: 'left',
// 					Icon: CaretLeftFill,
// 				},
// 				{
// 					direction: 'center',
// 					isCenter: true,
// 				},
// 			].map(({ className, direction, isCenter = false, Icon }) => (
// 				<Box
// 					className={`${isCenter ? '' : styles.box} ${
// 						styles[direction]
// 					}`}
// 					key={className}
// 					justify='center'
// 					align='center'
// 					onClick={() => {
// 						onPanClick({
// 							direction,
// 						});
// 					}}
// 				>
// 					{Icon && (
// 						<Icon
// 							className={`${styles.icon} ${
// 								styles[direction + 'Icon']
// 							}`}
// 						></Icon>
// 					)}
// 				</Box>
// 			))}
// 		</Box>
// 	);
// }

function SectorBox({ angle, onClick }) {
	return (
		<Box
			className={styles.SectorContent}
			width='50%'
			height='50%'
			onClick={onClick}
			focusIndicator={false}
			flex={false}
			style={{
				position: 'absolute',
				transform: `rotate(${angle}deg)`,
				transformOrigin: '100% 100%',
			}}
		>
			<Box
				className={styles.SectorBox}
				width='calc(100% - 1px)'
				height='calc(100% - 1px)'
				align='center'
				justify='center'
				background='dark-3'
				round={{ size: 'full', corner: 'top-left' }}
				style={{
					WebkitMaskImage: 'radial-gradient(circle farthest-side at bottom right, transparent 40%, #000 40%)',
					mask: 'radial-gradient(circle farthest-side at bottom right, transparent 40%, #000 40%)',
				}}
			>
				<CaretLeftFill style={{ transform: 'rotate(45deg)' }} />
			</Box>
		</Box>
	);
}

function Circle() {
	return (
		<Box
			round='full'
			width='calc(40% - 3px)'
			height='calc(40% - 3px)'
			margin='auto'
			background={'dark-3'}
			style={{
				position: 'absolute',
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
			}}
		/>
	);
}

export function AppFooter() {
	return (
		<Box direction='row' background='background-contrast' justify='evenly' flex={false}>
			<IconLink icon={<Webcam />} label='设备' url='/' />
			<IconLink icon={<Radial />} label='我的' url='/my' />
			<IconLink icon={<Home />} label='主页' url='/splash' />
			<IconLink icon={<Scan />} label='扫一扫' url='/scan' />
			<IconLink icon={<StatusCritical />} label='错误页' url='/errorpage' />
			<IconLink icon={<Cycle />} label='其它页' url='/other' />
		</Box>
	);
}

function LinkOrNone({ url, children }) {
	if (url) {
		return (
			<Link href={url} passHref legacyBehavior>
				{children}
			</Link>
		);
	} else {
		return <>{children}</>;
	}
}

function IpcCardMenu({ onSettings, onInformation }) {
	const settingsLabel = onSettings ? (
		<Text>设备设置</Text>
	) : (
		<Link href='/device/settings' passHref legacyBehavior>
			<Text>设备设置</Text>
		</Link>
	);
	const informationsLabel = onInformation ? (
		<Text>设备信息</Text>
	) : (
		<Link href='/device/information' passHref legacyBehavior>
			<Text>设备信息</Text>
		</Link>
	);

	return (
		<Menu
			dropProps={{ align: { top: 'bottom', right: 'right' } }}
			icon={<Settings3 size='24' />}
			items={[
				{
					label: settingsLabel,
					icon: (
						<Box margin={{ right: 'small' }}>
							<SettingsOutline size='24' />
						</Box>
					),
					onClick: onSettings,
				},
				{
					label: informationsLabel,
					icon: (
						<Box margin={{ right: 'small' }}>
							<Info />
						</Box>
					),
					onClick: onInformation,
				},
			]}
		/>
	);
}
