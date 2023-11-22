'use client';

import { Text, Box, Card, CardBody, CardFooter, Menu, Image, Button, Stack, CheckBox } from 'grommet';
import {
	Pan,
	More,
	Camera,
	ZoomIn,
	Volume,
	Calendar,
	Checkmark,
	VolumeMute,
	ContactInfo,
	Transaction,
	ShareRounded,
	ClosedCaption,
	CaretLeftFill,
	CircleInformation,
} from 'grommet-icons';
import { useState } from 'react';
import { SettingsOutline } from '@styled-icons/evaicons-outline/SettingsOutline';
import { Call } from '@styled-icons/fluentui-system-regular/Call';
import { CallDismiss } from '@styled-icons/fluentui-system-regular/CallDismiss';
import { Record } from '@styled-icons/fluentui-system-regular/Record';
import { RecordStop } from '@styled-icons/fluentui-system-regular/RecordStop';
import {
	JuJiuTagDeviceOnline,
	JuJiuTagDeviceOffline,
	JuJiuTagCloudStorageExpiring,
	JuJiuTagCloudStorageExpired,
} from '../../core/core-tag';
import Link, { useJuJiuT } from '@/state/translate';

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

function IpcCardMenuMobile() {
	const t = useJuJiuT();

	return (
		<Menu
			dropProps={{ align: { top: 'bottom', right: 'right' } }}
			icon={<More />}
			items={[
				{
					label: (
						<Link href='/device/settings' passHref legacyBehavior>
							<Text>{t('设备设置')}</Text>
						</Link>
					),
					icon: (
						<Box margin={{ right: 'small' }}>
							<SettingsOutline size='24' />
						</Box>
					),
				},
				{
					label: (
						<Link href='/device/information' passHref legacyBehavior>
							<Text>{t('设备信息')}</Text>
						</Link>
					),
					icon: (
						<Box margin={{ right: 'small' }}>
							<CircleInformation />
						</Box>
					),
				},
				{
					label: (
						<Link href='/device/sharing' passHref legacyBehavior>
							<Text>{t('设备分享')}</Text>
						</Link>
					),
					icon: (
						<Box margin={{ right: 'small' }}>
							<ShareRounded />
						</Box>
					),
				},
				{
					label: (
						<Link href='/device/transfer' passHref legacyBehavior>
							<Text>{t('设备转移')}</Text>
						</Link>
					),
					icon: (
						<Box margin={{ right: 'small' }}>
							<Transaction />
						</Box>
					),
				},
				{
					label: (
						<Link href='/device/contacts' passHref legacyBehavior>
							<Text>{t('通讯录')}</Text>
						</Link>
					),
					icon: (
						<Box margin={{ right: 'small' }}>
							<ContactInfo />
						</Box>
					),
				},
				{
					label: (
						<Link href='/device/calendar' passHref legacyBehavior>
							<Text>{t('日程提醒')}</Text>
						</Link>
					),
					icon: (
						<Box margin={{ right: 'small' }}>
							<Calendar />
						</Box>
					),
				},
			]}
		/>
	);
}

function IpcCardMenu({ onSettings, onInformation }) {
	const t = useJuJiuT();
	const labelDeviceSettings = t('设备设置');
	const labelDeviceInformation = t('设备信息');
	const settingsLabel = onSettings ? (
		<Text>{labelDeviceSettings}</Text>
	) : (
		<Link href='/device/settings' passHref legacyBehavior>
			<Text>{labelDeviceSettings}</Text>
		</Link>
	);
	const informationsLabel = onInformation ? (
		<Text>{labelDeviceInformation}</Text>
	) : (
		<Link href='/device/information' passHref legacyBehavior>
			<Text>{labelDeviceInformation}</Text>
		</Link>
	);

	return (
		<Menu
			dropProps={{ align: { top: 'bottom', right: 'right' } }}
			icon={<More />}
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
							<CircleInformation />
						</Box>
					),
					onClick: onInformation,
				},
			]}
		/>
	);
}

function IpcCardRawV2({ label, imgurl, nextPageUrl, online = false, cloudStorage = 'expiring', children }) {
	return (
		<Card>
			<LinkOrNone url={nextPageUrl}>
				<CardBody as='a' background='background-front'>
					<Stack>
						<Box height={'200px'}>{imgurl && <Image src={imgurl} fit='contain' alt='' />}</Box>
						<Box direction='row' margin='medium' gap='small'>
							<Box gap='small'>
								<Box direction='row'>{online ? <JuJiuTagDeviceOnline /> : <JuJiuTagDeviceOffline />}</Box>
							</Box>
							<Box gap='small'>
								<Box direction='row'>
									{
										{ expiring: <JuJiuTagCloudStorageExpiring />, expired: <JuJiuTagCloudStorageExpired /> }[
											cloudStorage
										]
									}
								</Box>
							</Box>
						</Box>
					</Stack>
				</CardBody>
			</LinkOrNone>
			<CardFooter pad='small' align='center' justify='between' background='background-contrast'>
				<Text>{label}</Text>
				{children}
			</CardFooter>
		</Card>
	);
}

export function IpcCard({ label, imgurl }) {
	return (
		<IpcCardRawV2 label={label} imgurl={imgurl} nextPageUrl='/device/streaming'>
			<IpcCardMenuMobile />
		</IpcCardRawV2>
	);
}

export function IpcCardSelectable({ onSelect, selected = false, onSettings, onInformation, ...passProps }) {
	return (
		<Stack anchor='top-right'>
			<IpcCardRawV2 {...passProps}>
				<IpcCardMenu onSettings={onSettings} onInformation={onInformation} />
			</IpcCardRawV2>
			<Box pad='small'>
				<CheckBox checked={selected} onChange={(e) => onSelect?.(e.target.checked)} />
			</Box>
		</Stack>
	);
}

export function MoreControl({ onClick }) {
	const t = useJuJiuT();
	return (
		<Button onClick={onClick}>
			<Box pad='small' align='center'>
				<More />
				<Text size='small'>{t('更多')}</Text>
			</Box>
		</Button>
	);
}

export function ScreenCopyControl({ showTip = false, onClick, showTitle = true, disabled = false }) {
	const t = useJuJiuT();
	const title = t('截图');

	return (
		<Button tip={showTip ? title : ''} onClick={onClick} disabled={disabled}>
			<Box pad='small' align='center'>
				<Camera />
				{showTitle && <Text size='small'>{title}</Text>}
			</Box>
		</Button>
	);
}

export function ChatControl({
	showTip = false,
	speaking = false,
	onClick,
	disabled = false,
	showTitle = true,
}) {
	const t = useJuJiuT();
	const title = t(speaking ? '挂断' : '对讲');

	return (
		<Button tip={showTip ? title : ''} {...{ onClick, disabled }}>
			<Box pad='small' align='center'>
				{speaking ? <CallDismiss size='24' /> : <Call size='24' />}
				{showTitle && <Text size='small'>{title}</Text>}
			</Box>
		</Button>
	);
}

export function MuteControl({ showTip = false, mute = true, onClick, showTitle = true, disabled = false }) {
	const t = useJuJiuT();
	const title = t(mute ? '恢复' : '静音');

	return (
		<Button tip={showTip ? title : ''} onClick={onClick} disabled={disabled}>
			<Box pad='small' align='center'>
				{mute ? <Volume /> : <VolumeMute />}
				{showTitle && <Text size='small'>{title}</Text>}
			</Box>
		</Button>
	);
}

export function RecordControl({
	showTip = false,
	recording = false,
	onClick,
	showTitle = true,
	disabled = false,
}) {
	const t = useJuJiuT();
	const title = t(recording ? '停止' : '录像');

	return (
		<Button tip={showTip ? title : ''} {...{ onClick, disabled }}>
			<Box pad='small' align='center'>
				{recording ? <RecordStop size='24' /> : <Record size='24' />}
				{showTitle && <Text size='small'>{title}</Text>}
			</Box>
		</Button>
	);
}

export function ZoomControl({
	showTip = false,
	showTitle = true,
	items = [
		{ label: '4X', onClick: () => {}, justify: 'end' },
		{ label: '3X', onClick: () => {}, justify: 'end' },
		{
			label: '2X',
			onClick: () => {},
			icon: <Checkmark />,
			justify: 'end',
		},
		{ label: '1X', onClick: () => {}, justify: 'end' },
	],
	disabled = false,
}) {
	const t = useJuJiuT();
	const title = t('变焦');

	return (
		<Menu plain tip={showTip ? title : ''} dropAlign={{ bottom: 'top' }} items={items} disabled={disabled}>
			<Box pad='small' align='center'>
				<ZoomIn />
				{showTitle && <Text size='small'>{title}</Text>}
			</Box>
		</Menu>
	);
}

export function ResolutionControl({ showTip = false, showTitle = true, disabled = false, items }) {
	const t = useJuJiuT();
	const title = t('清晰度');

	return (
		<Menu
			plain
			tip={showTip ? title : ''}
			dropAlign={{ bottom: 'top' }}
			items={
				items || [
					{ label: t('超清'), onClick: () => {}, justify: 'end' },
					{
						label: t('高清'),
						onClick: () => {},
						icon: <Checkmark />,
						justify: 'end',
					},
					{ label: t('标清'), onClick: () => {}, justify: 'end' },
				]
			}
			disabled={disabled}
		>
			<Box pad='small' align='center'>
				<ClosedCaption />
				{showTitle && <Text size='small'>{title}</Text>}
			</Box>
		</Menu>
	);
}

function SectorBox({ angle, background, onClick }) {
	return (
		<Box
			focusIndicator={false}
			width='50%'
			height='50%'
			onClick={onClick}
			style={{
				position: 'absolute',
				transform: `rotate(${angle}deg)`,
				transformOrigin: '100% 100%',
			}}
		>
			<Box
				width='calc(100% - 1px)'
				height='calc(100% - 1px)'
				align='center'
				justify='center'
				background={background}
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

function Circle({ background }) {
	return (
		<Box
			background={background}
			round='full'
			width='calc(40% - 3px)'
			height='calc(40% - 3px)'
			margin='auto'
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

export function PanControl({ size = 'small', ...props }) {
	const background = {
		color: 'dark-3',
		opacity: 'strong',
	};

	return (
		<Box flex={false} width={size} height={size} style={{ position: 'relative' }} margin='small' {...props}>
			<SectorBox background={background} angle={45} onClick={() => console.log('up')} />
			<SectorBox background={background} angle={135} onClick={() => console.log('right')} />
			<SectorBox background={background} angle={225} onClick={() => console.log('down')} />
			<SectorBox background={background} angle={315} onClick={() => console.log('left')} />
			<Circle background={background} />
		</Box>
	);
}

export function PanLayer({ showTip = false }) {
	const t = useJuJiuT();
	const [show, setShow] = useState(false);

	return (
		<>
			<Button plain tip={showTip && t('云台')} focusIndicator={false} onClick={() => setShow(!show)}>
				<Box pad='small' align='center'>
					<Pan />
				</Box>
			</Button>
			<Box
				justify='center'
				height='fit-content'
				style={{
					position: 'fixed',
					left: 0,
					top: 0,
					bottom: 0,
					margin: 'auto',
					visibility: show ? 'visible' : 'hidden',
				}}
			>
				<PanControl />
			</Box>
		</>
	);
}
