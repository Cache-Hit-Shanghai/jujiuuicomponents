import {
	Avatar,
	Text,
	Tag,
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
	Heading,
	DropButton,
	RangeInput,
	ResponsiveContext,
} from 'grommet';
import {
	Pan,
	Home,
	Radial,
	Webcam,
	ZoomIn,
	Scan,
	Info,
	Cycle,
	Volume,
	VolumeLow,
	VolumeMute,
	Checkmark,
	Camera,
	ClosedCaption,
	CaretLeftFill,
	StatusCritical,
} from 'grommet-icons';
import { Settings3 } from '@styled-icons/remix-fill/Settings3';
import { Call } from '@styled-icons/fluentui-system-regular/Call';
import { CallDismiss } from '@styled-icons/fluentui-system-regular/CallDismiss';
import { Record } from '@styled-icons/fluentui-system-regular/Record';
import { RecordStop } from '@styled-icons/fluentui-system-regular/RecordStop';
import { FlashlightOn } from '@styled-icons/material-rounded/FlashlightOn';
import { FlashlightOff } from '@styled-icons/material-rounded/FlashlightOff';
import { SettingsOutline } from '@styled-icons/evaicons-outline/SettingsOutline';
import Link from '@/state/translate';
import { useState, useContext } from 'react';

import {
	JuJiuTagCloudStorageExpired,
	JuJiuTagCloudStorageExpiring,
	JuJiuTagDeviceOnline,
	JuJiuTagDeviceOffline,
} from './jujiu-tags';
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

export function ZoomControl({ showTitle = true }) {
	const size = useContext(ResponsiveContext);
	const title = '变焦';

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

export function ResolutionControl({ showTitle = true }) {
	const size = useContext(ResponsiveContext);
	const title = '清晰度';
	return (
		<Menu
			plain
			tip={size !== 'small' && title}
			dropAlign={{ top: 'bottom' }}
			items={[
				{ label: '极清', onClick: () => {}, justify: 'end' },
				{
					label: '超清',
					onClick: () => {},
					icon: <Checkmark />,
					justify: 'end',
				},
				{ label: '标清', onClick: () => {}, justify: 'end' },
			]}
		>
			<Box pad='small' align='center'>
				<ClosedCaption />
				{showTitle && <Text size='small'>{title}</Text>}
			</Box>
		</Menu>
	);
}

export function PanLayer({ target }) {
	const size = useContext(ResponsiveContext);
	const [show, setShow] = useState(false);
	return (
		<>
			<Button
				plain
				tip={size !== 'small' && '云台'}
				focusIndicator={false}
				onClick={() => setShow(!show)}
			>
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

export function ScreenCopyControl({ showTitle = true }) {
	const size = useContext(ResponsiveContext);
	const title = '截图';
	return (
		<Button tip={size !== 'small' && title}>
			<Box pad='small' align='center'>
				{<Camera />}
				{showTitle && <Text size='small'>{title}</Text>}
			</Box>
		</Button>
	);
}

export function RecordControl({ showTitle = true }) {
	const size = useContext(ResponsiveContext);
	const [recording, setRecording] = useState(false);
	const title = recording ? '停止' : '录像';

	return (
		<Button tip={size !== 'small' && title} onClick={() => setRecording(!recording)}>
			<Box pad='small' align='center'>
				{recording ? <RecordStop size='24' /> : <Record size='24' />}
				{showTitle && <Text size='small'>{title}</Text>}
			</Box>
		</Button>
	);
}

export function MuteControl({ showTitle = true }) {
	const size = useContext(ResponsiveContext);
	const [mute, setMute] = useState(false);
	const title = mute ? '恢复' : '静音';

	return (
		<Button tip={size !== 'small' && title} onClick={() => setMute(!mute)}>
			<Box pad='small' align='center'>
				{mute ? <Volume /> : <VolumeMute />}
				{showTitle && <Text size='small'>{title}</Text>}
			</Box>
		</Button>
	);
}

export function ChatControl({ showTitle = true }) {
	const size = useContext(ResponsiveContext);
	const [speaking, setSpeaking] = useState(false);
	const title = speaking ? '挂断' : '对讲';

	return (
		<Button tip={size !== 'small' && title} onClick={() => setSpeaking(!speaking)}>
			<Box pad='small' align='center'>
				{speaking ? <CallDismiss size='24' /> : <Call size='24' />}
				{showTitle && <Text size='small'>{title}</Text>}
			</Box>
		</Button>
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
					WebkitMaskImage:
						'radial-gradient(circle farthest-side at bottom right, transparent 40%, #000 40%)',
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

export function PanControl({ size = 'small', onPanClick = () => {}, ...props }) {
	return (
		<Box
			flex={false}
			width={size}
			height={size}
			style={{
				position: 'relative',
				borderRadius: '50% 50%',
				overflow: 'hidden',
			}}
			className={styles.PanControl}
			alignSelf='center'
			{...props}
		>
			{[
				{
					direction: 'top',
					angle: 45,
				},
				{
					direction: 'right',
					angle: 135,
				},
				{
					direction: 'bottom',
					angle: 225,
				},
				{
					direction: 'left',
					angle: 315,
				},
			].map(({ direction, angle }) => (
				<SectorBox
					key={direction}
					angle={angle}
					onClick={() => {
						//console.log('onPanClick', direction);
						onPanClick({
							direction,
						});
					}}
				/>
			))}

			<Circle />
		</Box>
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

function IpcCardRaw({ label, imgurl, nextPageUrl }) {
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
				<Menu
					dropProps={{ align: { top: 'bottom', right: 'right' } }}
					icon={<Settings3 size='24' />}
					items={[
						{
							label: (
								<Link href='/device/settings' passHref legacyBehavior>
									<Text>设备设置</Text>
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
									<Text>设备信息</Text>
								</Link>
							),
							icon: (
								<Box margin={{ right: 'small' }}>
									<Info />
								</Box>
							),
						},
					]}
				/>
			</CardFooter>
		</Card>
	);
}

export function IpcCard({ label, imgurl }) {
	return <IpcCardRaw label={label} imgurl={imgurl} nextPageUrl='/device/streaming' />;
}

export function IpcCardSelectable({ label, imgurl }) {
	return (
		<Stack anchor='top-right'>
			<IpcCardRaw label={label} imgurl={imgurl} />
			<Box pad='small'>
				<CheckBox />
			</Box>
		</Stack>
	);
}
