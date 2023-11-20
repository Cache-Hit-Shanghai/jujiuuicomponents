'use client';

import { Button } from '@nextui-org/react';
import { useState } from 'react';
import { Camera } from '@styled-icons/heroicons-outline/Camera';
import { Phone } from '@styled-icons/heroicons-outline/Phone';
import { PhoneXMark } from '@styled-icons/heroicons-outline/PhoneXMark';
import { SpeakerWave } from '@styled-icons/heroicons-outline/SpeakerWave';
import { SpeakerXMark } from '@styled-icons/heroicons-outline/SpeakerXMark';
import { RecordCircle } from '@styled-icons/remix-line/RecordCircle';
import { StopCircle } from '@styled-icons/remix-line/StopCircle';
import { useJuJiuT } from '@/state/translate';

export function ScreenCopyControl({ showLabel, ...prop }) {
	const t = useJuJiuT();
	const label = t('截图');

	return (
		<Button isIconOnly={!showLabel} variant='light' {...prop}>
			<div className='flex flex-col items-center'>
				<Camera size={24} />
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
				{speaking ? <PhoneXMark size={24} /> : <Phone size={24} />}
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
				{mute ? <SpeakerWave size={24} /> : <SpeakerXMark size={24} />}
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
					{recording ? <StopCircle size={24} /> : <RecordCircle size={24} />}
					{showLabel && label}
				</div>
			</Button>
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
		</>
	);
}
