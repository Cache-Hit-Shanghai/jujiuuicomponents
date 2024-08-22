'use client';

// FIXME: filename

import { Button, Listbox, ListboxItem } from '@nextui-org/react';
import { useState } from 'react';
import { PhotoCamera } from '@styled-icons/material/PhotoCamera';
import { Phone } from '@styled-icons/material/Phone';
import { CallEnd } from '@styled-icons/material/CallEnd';
import { VolumeOff } from '@styled-icons/material/VolumeOff';
import { VolumeUp } from '@styled-icons/material/VolumeUp';
import { FiberManualRecord } from '@styled-icons/material/FiberManualRecord';
import { StopCircle } from '@styled-icons/material/StopCircle';
import { Hd as Resolution } from '@styled-icons/material/Hd';
import { IosShare } from '@styled-icons/material/IosShare';
import { Settings } from '@styled-icons/material/Settings';
import { Cameraswitch } from '@styled-icons/material/Cameraswitch';
import { Battery3Bar } from '@styled-icons/material/Battery3Bar';
import { Download } from '@styled-icons/material/Download';
import { Hd } from '@/jujiu-ui-components/icons/hd';
import { FullHd } from '@/jujiu-ui-components/icons/fullhd';
import { R2kPlus } from '@/jujiu-ui-components/icons/2kplus';
import { useJuJiuT } from '@/state/translate';
import { LinkButton } from '../../core/core-ui';
import Drawer from 'react-modern-drawer';

import 'react-modern-drawer/dist/index.css';

/**
 * @typedef {import("@nextui-org/react").ButtonProps} ButtonProps
 */

/**
 *
 * @param {ButtonProps & {showLabel: boolean}} props
 * @returns
 */
export function DownloadControl({ showLabel, ...prop }) {
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

/**
 *
 * @param {ButtonProps & {showLabel: boolean}} props
 * @returns
 */
export function ScreenCopyControl({ showLabel, icon, hasBorder, ...prop }) {
	const t = useJuJiuT();
	const label = t('截图');

	return (
		<Button
			className={
				hasBorder
					? 'p-0 min-w-fit text-inherit w-10 h-10 rounded-full flex items-center justify-center bg-[#000000B3]'
					: 'p-0 min-w-fit text-inherit'
			}
			isIconOnly={!showLabel}
			variant='light'
			radius='none'
			{...prop}
		>
			<div className='flex flex-col items-center'>
				{icon || <PhotoCamera size={24} />}
				{showLabel && <p className='text-xs'>{label}</p>}
			</div>
		</Button>
	);
}

export function ChatControl({
	showLabel,
	speaking,
	callIcon,
	hangupIcon,
	hasBorder,
	...prop
}) {
	const t = useJuJiuT();
	const label = t(speaking ? '挂断' : '对讲');

	const callIconApplied = callIcon || <Phone size={24} />;
	const hangupIconApplied = hangupIcon || <CallEnd size={24} />;

	return (
		<Button
			className={
				hasBorder
					? 'p-0 min-w-fit text-inherit w-10 h-10 rounded-full flex items-center justify-center bg-[#000000B3]'
					: 'p-0 min-w-fit text-inherit'
			}
			isIconOnly={!showLabel}
			variant='light'
			radius='none'
			{...prop}
		>
			<div className='flex flex-col items-center'>
				{speaking ? hangupIconApplied : callIconApplied}
				{showLabel && <p className='text-xs'>{label}</p>}
			</div>
		</Button>
	);
}

export function MuteControl({
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
			className='p-0 min-w-fit text-inherit bg-[#000000]/[0.3] rounded-full w-10 h-10'
			isIconOnly={!showLabel}
			variant='light'
			radius='none'
			{...prop}
		>
			<div className='flex flex-col items-center'>
				{mute ? unmuteIconApplied : muteIconApplied}
				{showLabel && <p className='text-xs'>{label}</p>}
			</div>
		</Button>
	);
}

export function RecordControl({
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
			className={
				hasBorder
					? 'p-0 min-w-fit text-inherit w-10 h-10 rounded-full flex items-center justify-center bg-[#000000B3]'
					: 'p-0 min-w-fit text-inherit'
			}
			isIconOnly={!showLabel}
			variant='light'
			radius='none'
			{...prop}
		>
			<div className='flex flex-col items-center'>
				{recording ? recordingIconApplied : recordIconApplied}
				{showLabel && <p className='text-xs'>{label}</p>}
			</div>
		</Button>
	);
}

function useConrollableState({ value, setValue, initValue }) {
	const [state, setState] = useState(initValue);
	if (setValue) return [value, setValue];
	return [state, setState];
}

export function ResolutionControl({
	showLabel,
	items,
	options = [
		{ key: '2.5k', label: '超清', icon: <R2kPlus size={24} /> },
		{ key: '1080p', label: '高清', icon: <FullHd size={24} /> },
		{ key: '720p', label: '标清', icon: <Hd size={24} /> },
	],
	current,
	init = '2.5k',
	onSelect,
	isForceLandscape = false,
	icon,
	direction,
	...prop
}) {
	const [isOpen, setIsOpen] = useState(false);
	const toggleIsOpen = () => {
		setIsOpen(!isOpen);
	};

	const [selectedKeys, setSelectedKeys] = useConrollableState({
		initValue: new Set([init]),
		value: new Set([current ?? init]),
		setValue: onSelect && ((newValue) => onSelect([...newValue][0])),
	});

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

	return (
		<>
			<Button
				className='p-0 min-w-fit text-inherit bg-[#000000]/[0.3] rounded-full w-10 h-10'
				isIconOnly={!showLabel}
				onClick={toggleIsOpen}
				variant='light'
				radius='none'
				{...prop}
			>
				<div className='flex flex-col items-center'>
					{icon || <Resolution size={24} />}
					{showLabel && <p className='text-xs'>{label}</p>}
				</div>
			</Button>
			<Drawer
				open={isOpen}
				onClose={toggleIsOpen}
				direction={direction}
				className={`z-[999] ${getBorderStyle()}`}
			>
				<div className='w-full'>
					<div className='text-[#000000] w-full text-lg text-center h-16 py-5 font-semibold'>
						画质选择
					</div>
					<Listbox
						aria-label='resolution'
						variant='light'
						selectionMode='single'
						se1lectedKeys={selectedKeys}
						onSelectionChange={(e) => {
							setSelectedKeys(e);
							toggleIsOpen();
						}}
						color='primary'
						shouldHighlightOnFocus
						defaultSelectedKeys={Array.from(selectedKeys)}
					>
						{options.map(({ key, label = key, icon }) => (
							<ListboxItem
								key={key}
								startContent={icon}
								className={`ps-5 h-14 text-[#000000] text-base ${selectedKeys.has(key) ? 'bg-[#FD9240]/[0.1] text-[#FD9240]' : ''}`}
								shouldHighlightOnFocus
								hideSelectedIcon={false}
							>
								{label}
							</ListboxItem>
						))}
					</Listbox>
				</div>
			</Drawer>
		</>
	);
}

export function StreamingControlBar({ showLabel }) {
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

export function StreamingControlBar2() {
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

export function StreamingControlBar3({ showLabel }) {
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

export function StreamingControlBar4() {
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
