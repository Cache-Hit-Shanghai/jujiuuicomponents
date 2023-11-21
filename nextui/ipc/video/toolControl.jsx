'use client';

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';
import { useState } from 'react';
import { PhotoCamera } from '@styled-icons/material/PhotoCamera';
import { Phone } from '@styled-icons/material/Phone';
import { CallEnd } from '@styled-icons/material/CallEnd';
import { VolumeOff } from '@styled-icons/material/VolumeOff';
import { VolumeUp } from '@styled-icons/material/VolumeUp';
import { FiberManualRecord } from '@styled-icons/material/FiberManualRecord';
import { StopCircle } from '@styled-icons/material/StopCircle';
import { Hd } from '@styled-icons/material/Hd';
import { useJuJiuT } from '@/state/translate';

export function ScreenCopyControl({ showLabel, ...prop }) {
	const t = useJuJiuT();
	const label = t('截图');

	return (
		<Button isIconOnly={!showLabel} variant='light' {...prop}>
			<div className='flex flex-col items-center'>
				<PhotoCamera size={24} />
				{showLabel && label}
			</div>
		</Button>
	);
}

export function ChatControl({ showLabel, speaking, ...prop }) {
	const t = useJuJiuT();
	const label = t(speaking ? '挂断' : '对讲');

	return (
		<Button isIconOnly={!showLabel} variant='light' {...prop}>
			<div className='flex flex-col items-center'>
				{speaking ? <CallEnd size={24} /> : <Phone size={24} />}
				{showLabel && label}
			</div>
		</Button>
	);
}

export function MuteControl({ showLabel, mute = true, ...prop }) {
	const t = useJuJiuT();
	const label = t(mute ? '恢复' : '静音');

	return (
		<Button isIconOnly={!showLabel} variant='light' {...prop}>
			<div className='flex flex-col items-center'>
				{mute ? <VolumeUp size={24} /> : <VolumeOff size={24} />}
				{showLabel && label}
			</div>
		</Button>
	);
}

export function RecordControl({ showLabel, recording, ...prop }) {
	const t = useJuJiuT();
	const label = t(recording ? '停止' : '录像');

	return (
		<>
			<Button isIconOnly={!showLabel} variant='light' {...prop}>
				<div className='flex flex-col items-center'>
					{recording ? <StopCircle size={24} /> : <FiberManualRecord size={24} />}
					{showLabel && label}
				</div>
			</Button>
		</>
	);
}

export function ResolutionControl({ showLabel, items, ...prop }) {
	const t = useJuJiuT();
	const label = t('清晰度');

	return (
		<Dropdown>
			<DropdownTrigger>
				<Button isIconOnly={!showLabel} variant='light'>
					<div className='flex flex-col items-center'>
						<Hd size={24} />
						{showLabel && label}
					</div>
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				aria-label='resolution'
				disallowEmptySelection
				selectionMode='single'
				selectedKeys={['1080p']}
			>
				<DropdownItem key='2.5k'>超清</DropdownItem>
				<DropdownItem key='1080p'>高清</DropdownItem>
				<DropdownItem key='720p'>标清</DropdownItem>
			</DropdownMenu>
		</Dropdown>
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
