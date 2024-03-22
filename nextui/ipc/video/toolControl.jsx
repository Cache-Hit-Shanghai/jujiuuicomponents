'use client';

// FIXME: filename

import {
	Divider,
	Button,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	useDisclosure,
	Listbox,
	ListboxItem,
} from '@nextui-org/react';
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
import { twMerge } from 'tailwind-merge';

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
export function ScreenCopyControl({ showLabel, icon, ...prop }) {
	const t = useJuJiuT();
	const label = t('截图');

	return (
		<Button
			className='p-0 min-w-fit text-inherit'
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
	...prop
}) {
	const t = useJuJiuT();
	const label = t(speaking ? '挂断' : '对讲');

	const callIconApplied = callIcon || <Phone size={24} />;
	const hangupIconApplied = hangupIcon || <CallEnd size={24} />;

	return (
		<Button
			className='p-0 min-w-fit text-inherit'
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
			className='p-0 min-w-fit text-inherit'
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
	...prop
}) {
	const t = useJuJiuT();
	const label = t(recording ? '停止' : '录像');

	const recordIconApplied = recordIcon || <FiberManualRecord size={24} />;
	const recordingIconApplied = recordingIcon || <StopCircle size={24} />;

	return (
		<Button
			className='p-0 min-w-fit text-inherit'
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
	...prop
}) {
	const t = useJuJiuT();
	const label = t('清晰度');
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [selectedKeys, setSelectedKeys] = useConrollableState({
		initValue: new Set([init]),
		value: new Set([current]),
		setValue: onSelect && ((newValue) => onSelect([...newValue][0])),
	});

	const forceLandscapeStyle = isForceLandscape ? 'w-[100max] h-[100vmin]' : '';

	return (
		<>
			<Button
				className='p-0 min-w-fit text-inherit'
				isIconOnly={!showLabel}
				onPress={onOpen}
				variant='light'
				radius='none'
				{...prop}
			>
				<div className='flex flex-col items-center'>
					{icon || <Resolution size={24} />}
					{showLabel && <p className='text-xs'>{label}</p>}
				</div>
			</Button>
			<Modal
				classNames={{
					wrapper: twMerge('z-[500]', forceLandscapeStyle),
					backdrop: twMerge('z-[500]', forceLandscapeStyle),
				}}
				hideCloseButton
				isOpen={isOpen}
				onOpenChange={onOpenChange}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-col items-center'>
								{label}
							</ModalHeader>
							<Divider />
							<ModalBody>
								<Listbox
									aria-label='resolution'
									variant='flat'
									disallowEmptySelection
									selectionMode='single'
									selectedKeys={selectedKeys}
									onSelectionChange={(e) => {
										setSelectedKeys(e);
										onClose();
									}}
								>
									{options.map(({ key, label = key, icon }) => (
										<ListboxItem key={key} startContent={icon}>
											{label}
										</ListboxItem>
									))}
								</Listbox>
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
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
