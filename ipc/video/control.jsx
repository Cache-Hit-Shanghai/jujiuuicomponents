'use client';

import {
	Text,
	Box,
	Card,
	CardBody,
	CardFooter,
	Menu,
	Image,
	Button,
	Layer,
	Stack,
	CheckBox,
	ResponsiveContext,
} from 'grommet';
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
import { useState, useContext } from 'react';
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

function IpcCardRawV2({ label, imgurl, nextPageUrl, children }) {
	return (
		<Card>
			<LinkOrNone url={nextPageUrl}>
				<CardBody as='a' background='background-front'>
					<Stack>
						<Image fill src={imgurl} />
						<Box direction='row' margin='medium' gap='small'>
							<Box gap='small'>
								<Box direction='row'>
									<JuJiuTagDeviceOnline />
								</Box>
								<Box direction='row'>
									<JuJiuTagDeviceOffline />
								</Box>
							</Box>
							<Box gap='small'>
								<Box direction='row'>
									<JuJiuTagCloudStorageExpiring />
								</Box>
								<Box direction='row'>
									<JuJiuTagCloudStorageExpired />
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

function IpcCardRaw({
	label,
	imgurl,
	nextPageUrl,
	onSettings,
	onInformation,
	online = false,
	cloudStorage = 'expiring',
}) {
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
				<IpcCardMenu onSettings={onSettings} onInformation={onInformation} />
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

export function IpcCardSelectable({ onSelect, selected = false, ...passProps }) {
	return (
		<Stack anchor='top-right'>
			<IpcCardRaw {...passProps} />
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

export function ScreenCopyControl({ showTitle = true }) {
	const size = useContext(ResponsiveContext);
	const t = useJuJiuT();
	const title = t('截图');
	return (
		<Button tip={size !== 'small' && title}>
			<Box pad='small' align='center'>
				<Camera />
				{showTitle && <Text size='small'>{title}</Text>}
			</Box>
		</Button>
	);
}

export function ChatControl({ showTitle = true }) {
	const size = useContext(ResponsiveContext);
	const [speaking, setSpeaking] = useState(false);
	const t = useJuJiuT();
	const title = t(speaking ? '挂断' : '对讲');

	return (
		<Button tip={size !== 'small' && title} onClick={() => setSpeaking(!speaking)}>
			<Box pad='small' align='center'>
				{speaking ? <CallDismiss size='24' /> : <Call size='24' />}
				{showTitle && <Text size='small'>{title}</Text>}
			</Box>
		</Button>
	);
}

export function MuteControl({ showTitle = true }) {
	const size = useContext(ResponsiveContext);
	const [mute, setMute] = useState(false);
	const t = useJuJiuT();
	const title = t(mute ? '恢复' : '静音');

	return (
		<Button tip={size !== 'small' && title} onClick={() => setMute(!mute)}>
			<Box pad='small' align='center'>
				{mute ? <Volume /> : <VolumeMute />}
				{showTitle && <Text size='small'>{title}</Text>}
			</Box>
		</Button>
	);
}

export function RecordControl({ showTitle = true }) {
	const size = useContext(ResponsiveContext);
	const [recording, setRecording] = useState(false);
	const t = useJuJiuT();
	const title = t(recording ? '停止' : '录像');

	return (
		<Button tip={size !== 'small' && title} onClick={() => setRecording(!recording)}>
			<Box pad='small' align='center'>
				{recording ? <RecordStop size='24' /> : <Record size='24' />}
				{showTitle && <Text size='small'>{title}</Text>}
			</Box>
		</Button>
	);
}

export function ZoomControl({ showTitle = true }) {
	const size = useContext(ResponsiveContext);
	const t = useJuJiuT();
	const title = t('变焦');

	return (
		<Menu
			plain
			tip={size !== 'small' && title}
			dropAlign={{ top: 'bottom' }}
			items={[
				{ label: '4X', onClick: () => {}, justify: 'end' },
				{ label: '3X', onClick: () => {}, justify: 'end' },
				{
					label: '2X',
					onClick: () => {},
					icon: <Checkmark />,
					justify: 'end',
				},
				{ label: '1X', onClick: () => {}, justify: 'end' },
			]}
		>
			<Box pad='small' align='center'>
				<ZoomIn />
				{showTitle && <Text size='small'>{title}</Text>}
			</Box>
		</Menu>
	);
}

export function ResolutionControl({ showTitle = true }) {
	const size = useContext(ResponsiveContext);
	const t = useJuJiuT();
	const title = t('清晰度');
	return (
		<Menu
			plain
			tip={size !== 'small' && title}
			dropAlign={{ top: 'bottom' }}
			items={[
				{ label: t('极清'), onClick: () => {}, justify: 'end' },
				{
					label: t('超清'),
					onClick: () => {},
					icon: <Checkmark />,
					justify: 'end',
				},
				{ label: t('标清'), onClick: () => {}, justify: 'end' },
			]}
		>
			<Box pad='small' align='center'>
				<ClosedCaption />
				{showTitle && <Text size='small'>{title}</Text>}
			</Box>
		</Menu>
	);
}

function SectorBox({ angle, onClick }) {
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
			background='dark-3'
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
	return (
		<Box flex={false} width={size} height={size} style={{ position: 'relative' }} {...props}>
			<SectorBox angle={45} onClick={() => console.log('up')} />
			<SectorBox angle={135} onClick={() => console.log('right')} />
			<SectorBox angle={225} onClick={() => console.log('down')} />
			<SectorBox angle={315} onClick={() => console.log('left')} />
			<Circle />
		</Box>
	);
}

export function PanLayer({ target }) {
	const t = useJuJiuT();
	const size = useContext(ResponsiveContext);
	const [show, setShow] = useState(false);
	return (
		<>
			<Button plain tip={size !== 'small' && t('云台')} focusIndicator={false} onClick={() => setShow(!show)}>
				<Box pad='small' align='center'>
					<Pan />
				</Box>
			</Button>
			{show && (
				<Layer
					plain
					animation='fadeIn'
					target={target?.current}
					position='right'
					responsive={false}
					margin='small'
					onClickOutside={() => setShow(false)}
				>
					<PanControl />
				</Layer>
			)}
		</>
	);
}
