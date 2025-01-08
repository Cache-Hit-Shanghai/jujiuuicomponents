'use client';

// FIXME: filename

import { Button, Listbox, ListboxItem, Spinner } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { PhotoCamera } from '@styled-icons/material/PhotoCamera';
import { Phone } from '@styled-icons/material/Phone';
import { CallEnd } from '@styled-icons/material/CallEnd';
import { VolumeOff } from '@styled-icons/material/VolumeOff';
import { VolumeUp } from '@styled-icons/material/VolumeUp';
import { FiberManualRecord } from '@styled-icons/material/FiberManualRecord';
import { StopCircle } from '@styled-icons/material/StopCircle';
import { Hd as Resolution } from '@styled-icons/material/Hd';
import { Hd } from '@/jujiu-ui-components/icons/hd';
import { FullHd } from '@/jujiu-ui-components/icons/fullhd';
import { R2kPlus } from '@/jujiu-ui-components/icons/2kplus';
import { useJuJiuT } from '@/state/translate';
import Drawer from 'react-modern-drawer';

import 'react-modern-drawer/dist/index.css';
import { SelectorModal } from '@/nextui-components/ui/pet-setting';
import { trackEvent } from 'jujiu_js_common/util/umami';

/**
 * @typedef {import("@nextui-org/react").ButtonProps} ButtonProps
 */

/**
 *
 * @param {ButtonProps & {showLabel: boolean}} props
 * @returns
 */
<<<<<<< HEAD
=======
export function DownloadControl ({ showLabel, ...prop }) {
	const t = useJuJiuT();
	const label = t('下载');

	return (
		<Button isIconOnly={!showLabel} variant='light' {...prop}>
			<div className='flex flex-col items-center'>
				<Download size={24} />
				{showLabel && label}
			</div>
		</Button>
	);
}

>>>>>>> origin/main
/**
 *
 * @param {ButtonProps & {showLabel: boolean}} props
 * @returns
 */
export function ScreenCopyControl ({
	showLabel,
	icon,
	hasBorder,
	className = '',
	...prop
}) {
	const t = useJuJiuT();
	const label = t('拍照');

	return (
		<Button
			className={`p-0 min-w-fit text-inherit flex flex-col items-center justify-center ${
				hasBorder ? 'w-10 h-10 rounded-full bg-[#000000B3]' : ''
			} ${label ? 'w-14 h-14' : ''} ${className}`}
			isIconOnly={!showLabel}
			variant='light'
			radius='none'
			{...prop}
		>
			{icon || <PhotoCamera size={24} />}
			{showLabel && <p>{label}</p>}
		</Button>
	);
}

export function ChatControl ({
	showLabel,
	speaking,
	callIcon,
	hangupIcon,
	hasBorder,
	className = '',
	...prop
}) {
	const t = useJuJiuT();
	const label = t('语音');

	const callIconApplied = callIcon || <Phone size={24} />;
	const hangupIconApplied = hangupIcon || <CallEnd size={24} />;

	return (
		<Button
			className={`p-0 min-w-fit text-inherit flex flex-col items-center justify-center ${
				hasBorder ? 'w-10 h-10 rounded-full bg-[#000000B3]' : ''
			} ${label ? 'w-14 h-14' : ''} ${
				speaking ? 'text-[ text-[#FD9240]' : ''
			}  ${className}`}
			isIconOnly={!showLabel}
			variant='light'
			radius='none'
			{...prop}
		>
			{speaking ? hangupIconApplied : callIconApplied}
			{showLabel && <div className=''>{label}</div>}
		</Button>
	);
}

export function MuteControl ({
	isVideoFullscreen,
	showLabel,
	mute = true,
	muteIcon,
	unmuteIcon,
	...prop
}) {
	const t = useJuJiuT();
	const label = t(mute ? '解除静音' : '静音');

	const muteIconApplied = muteIcon || <VolumeUp size={24} />;
	const unmuteIconApplied = unmuteIcon || <VolumeOff size={24} />;

	return (
		<Button
			className={
				'p-0 min-w-fit text-inherit bg-[#000000]/[0.3] rounded-full w-10 h-10' +
				(isVideoFullscreen ? ' w-14 h-14' : showLabel ? 'w-12 h-12' : '')
			}
			isIconOnly={!showLabel}
			variant='light'
			radius='none'
			{...prop}
		>
			<div className='flex flex-col items-center'>
				{mute ? unmuteIconApplied : muteIconApplied}
				{showLabel && <p style={{ fontSize: '9px', lineHeight: 1 }}>{label}</p>}
			</div>
		</Button>
	);
}

export function RecordControl ({
	showLabel,
	recording,
	recordIcon,
	recordingIcon,
	hasBorder,
	...prop
}) {
	const t = useJuJiuT();
	const label = t(recording ? '停止' : '录像');

	const recordIconApplied = recordIcon || <FiberManualRecord size={24} />;
	const recordingIconApplied = recordingIcon || <StopCircle size={24} />;

	return (
		<Button
			className={`p-0 min-w-fit text-inherit flex flex-col items-center justify-center ${
				hasBorder ? 'w-10 h-10 rounded-full bg-[#000000B3]' : ''
			} ${label ? 'w-14 h-14' : ''}`}
			isIconOnly={!showLabel}
			variant='light'
			radius='none'
			{...prop}
		>
			{recording ? recordingIconApplied : recordIconApplied}
			{showLabel && <p>{label}</p>}
		</Button>
	);
}

export function ResolutionControl ({
	isVideoFullscreen,
	showLabel,
	items,
	options = [
		{ key: '2.5k', label: '超清', icon: <R2kPlus size={24} /> },
		{ key: '1080p', label: '高清', icon: <FullHd size={24} /> },
		{ key: '720p', label: '标清', icon: <Hd size={24} /> },
	],
	current,
	onSelect,
	isForceLandscape = false,
	icon,
	direction,
	className,
	...prop
}) {
	const label = '分辨率';
	const [isOpen, setIsOpen] = useState(false);
	const toggleIsOpen = () => {
		setIsOpen(!isOpen);
	};

	const [selectedKeys, setSelectedKeys] = useState(new Set([current]));

	useEffect(() => {
		if (!current) return;
		setSelectedKeys(new Set([current]));
	}, [current]);

	const onChangeSelected = (newValue) => {
		const curSelectedKey = [...newValue][0];
		setSelectedKeys(new Set([curSelectedKey]));
		onSelect?.(curSelectedKey);
	};

	const getBorderStyle = () => {
		switch (direction) {
			case 'right':
				return 'rounded-l-3xl';
			case 'bottom':
				return 'rounded-t-3xl';
			default:
				return '';
		}
	};

	const content = (
		<div className='w-full'>
			<div className='text-[#000000] w-full text-lg text-center h-16 py-5 font-semibold'>
				画质选择
			</div>
			{current ? (
				<Listbox
					aria-label='resolution'
					variant='light'
					selectionMode='single'
					selectedKeys={selectedKeys}
					onSelectionChange={(e) => {
						onChangeSelected(e);
						toggleIsOpen();
						trackEvent('change-resolution', { newValue: e[0] });
					}}
					color='primary'
					shouldHighlightOnFocus
					defaultSelectedKeys={Array.from(selectedKeys)}
					disallowEmptySelection
				>
					{options.map(({ key, label = key, icon }) => (
						<ListboxItem
							key={key}
							startContent={icon}
							className={`ps-5 h-14 text-[#000000] text-base ${
								selectedKeys.has(key) ? 'bg-[#FD9240]/[0.1] text-[#FD9240]' : ''
							}`}
							shouldHighlightOnFocus
						>
							{label}
						</ListboxItem>
					))}
				</Listbox>
			) : (
				<div className='w-full mt-10 flex justify-center'>
					<Spinner size='large' />
				</div>
			)}
		</div>
	);

	return (
		<>
			<Button
				className={`p-0 min-w-fit text-inherit bg-[#000000]/[0.3] rounded-full w-10 h-10 ${className}
					${isVideoFullscreen ? ' w-14 h-14' : ''}`}
				isIconOnly={!showLabel}
				onClick={toggleIsOpen}
				variant='light'
				radius='none'
				{...prop}
			>
				<div className='flex flex-col items-center'>
					{icon || <Resolution size={24} />}
					{showLabel && (
						<p style={{ fontSize: '9px', lineHeight: 1 }} className='m-0 p-0'>
							{label}
						</p>
					)}
				</div>
			</Button>
			{!isVideoFullscreen ? (
				<SelectorModal
					isOpen={isOpen}
					onOpenChange={toggleIsOpen}
					displayHeader={false}
				>
					{content}
				</SelectorModal>
			) : (
				<Drawer
					open={isOpen}
					onClose={toggleIsOpen}
					direction={direction}
					className={`z-[99999] ${getBorderStyle()}`}
					zIndex={99999}
					duration='0'
				>
					{content}
				</Drawer>
			)}
		</>
	);
}
<<<<<<< HEAD
=======

export function StreamingControlBar ({ showLabel }) {
	const [speaking, setSpeaking] = useState(false);
	const [mute, setMute] = useState(true);
	const [recording, setRecording] = useState(false);

	return (
		<>
			<ScreenCopyControl showLabel={showLabel} />
			<RecordControl
				showLabel={showLabel}
				recording={recording}
				onPress={() => setRecording(!recording)}
			/>
			<ChatControl
				showLabel={showLabel}
				speaking={speaking}
				onPress={() => setSpeaking(!speaking)}
			/>
			<MuteControl
				showLabel={showLabel}
				mute={mute}
				onPress={() => setMute(!mute)}
			/>
			<ResolutionControl showLabel={showLabel} />
		</>
	);
}

export function StreamingControlBar2 () {
	return (
		<>
			<Button isIconOnly variant='light'>
				<Cameraswitch size={24} />
			</Button>
			<LinkButton
				href='/device/settings/sharing'
				icon={<IosShare size={24} />}
			/>
			<LinkButton href='/device/settings' icon={<Settings size={24} />} />
		</>
	);
}

export function StreamingControlBar3 ({ showLabel }) {
	const [speaking, setSpeaking] = useState(false);
	const [mute, setMute] = useState(true);
	const [recording, setRecording] = useState(false);

	return (
		<>
			<ScreenCopyControl showLabel={showLabel} />
			<RecordControl
				showLabel={showLabel}
				recording={recording}
				onPress={() => setRecording(!recording)}
			/>
			<ChatControl
				showLabel={showLabel}
				speaking={speaking}
				onPress={() => setSpeaking(!speaking)}
			/>
			<MuteControl
				showLabel={showLabel}
				mute={mute}
				onPress={() => setMute(!mute)}
			/>
		</>
	);
}

export function StreamingControlBar4 () {
	return (
		<>
			<ResolutionControl />
			<Button isIconOnly variant='light'>
				<Cameraswitch size={24} />
			</Button>
			<Button isIconOnly variant='light'>
				<Battery3Bar size={24} />
			</Button>
		</>
	);
}
>>>>>>> origin/main
