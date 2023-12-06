'use client';

import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	Divider,
	Button,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
	Listbox,
	ListboxSection,
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
import { Hd } from '@styled-icons/material/Hd';
import { IosShare } from '@styled-icons/material/IosShare';
import { Settings } from '@styled-icons/material/Settings';
import { Cameraswitch } from '@styled-icons/material/Cameraswitch';
import { Battery3Bar } from '@styled-icons/material/Battery3Bar';
import { Download } from '@styled-icons/material/Download';
import { useJuJiuT } from '@/state/translate';
import { LinkButton } from '../../core/core-ui';
import { ActionSheet } from '../../extension/actionsheet';

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
export function ScreenCopyControl({ showLabel, ...prop }) {
	const t = useJuJiuT();
	const label = t('截图');

	return (
		<Button className='p-0 min-w-fit' isIconOnly={!showLabel} variant='light' radius='none' {...prop}>
			<div className='flex flex-col items-center'>
				<PhotoCamera size={24} />
				{showLabel && <p className='text-xs'>{label}</p>}
			</div>
		</Button>
	);
}

export function ChatControl({ showLabel, speaking, ...prop }) {
	const t = useJuJiuT();
	const label = t(speaking ? '挂断' : '对讲');

	return (
		<Button className='p-0 min-w-fit' isIconOnly={!showLabel} variant='light' radius='none' {...prop}>
			<div className='flex flex-col items-center'>
				{speaking ? <CallEnd size={24} /> : <Phone size={24} />}
				{showLabel && <p className='text-xs'>{label}</p>}
			</div>
		</Button>
	);
}

export function MuteControl({ showLabel, mute = true, ...prop }) {
	const t = useJuJiuT();
	const label = t(mute ? '恢复' : '静音');

	return (
		<Button className='p-0 min-w-fit' isIconOnly={!showLabel} variant='light' radius='none' {...prop}>
			<div className='flex flex-col items-center'>
				{mute ? <VolumeUp size={24} /> : <VolumeOff size={24} />}
				{showLabel && <p className='text-xs'>{label}</p>}
			</div>
		</Button>
	);
}

export function RecordControl({ showLabel, recording, ...prop }) {
	const t = useJuJiuT();
	const label = t(recording ? '停止' : '录像');

	return (
		<Button className='p-0 min-w-fit' isIconOnly={!showLabel} variant='light' radius='none' {...prop}>
			<div className='flex flex-col items-center'>
				{recording ? <StopCircle size={24} /> : <FiberManualRecord size={24} />}
				{showLabel && <p className='text-xs'>{label}</p>}
			</div>
		</Button>
	);
}

export function ResolutionControl({ showLabel, items, ...prop }) {
	const t = useJuJiuT();
	const label = t('清晰度');
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [selectedKeys, setSelectedKeys] = useState(new Set(['2.5k']));

	return (
		<>
			<Button
				className='p-0 min-w-fit'
				isIconOnly={!showLabel}
				onPress={onOpen}
				variant='light'
				radius='none'
				{...prop}
			>
				<div className='flex flex-col items-center'>
					<Hd size={24} />
					{showLabel && <p className='text-xs'>{label}</p>}
				</div>
			</Button>
			<Modal hideCloseButton isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-col items-center'>{label}</ModalHeader>
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
									<ListboxItem key='2.5k'>{t('超清')}</ListboxItem>
									<ListboxItem key='1080p'>{t('高清')}</ListboxItem>
									<ListboxItem key='720p'>{t('标清')}</ListboxItem>
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
			<RecordControl showLabel={showLabel} recording={recording} onPress={() => setRecording(!recording)} />
			<ChatControl showLabel={showLabel} speaking={speaking} onPress={() => setSpeaking(!speaking)} />
			<MuteControl showLabel={showLabel} mute={mute} onPress={() => setMute(!mute)} />
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
				className='text-white'
				href='/device/settings/sharing'
				icon={<IosShare size={24} className='text-white' />}
			/>
			<LinkButton
				className='text-white'
				href='/device/settings'
				icon={<Settings size={24} className='text-white' />}
			/>
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
			<RecordControl showLabel={showLabel} recording={recording} onPress={() => setRecording(!recording)} />
			<ChatControl showLabel={showLabel} speaking={speaking} onPress={() => setSpeaking(!speaking)} />
			<MuteControl showLabel={showLabel} mute={mute} onPress={() => setMute(!mute)} />
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
