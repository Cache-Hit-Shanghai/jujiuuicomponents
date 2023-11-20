'use client';

import { Button } from '@nextui-org/react';
import { Camera } from '@styled-icons/heroicons-outline/Camera';
import { Phone } from '@styled-icons/heroicons-outline/Phone';
import { PhoneXMark } from '@styled-icons/heroicons-outline/PhoneXMark';
import { useJuJiuT } from '@/state/translate';

export function ScreenCopyControl({ ...prop }) {
	const t = useJuJiuT();
	const label = t('截图');

	return (
		<Button isIconOnly variant='light' {...prop}>
			<div className='flex flex-col items-center'>
				<Camera size={24} />
				<p>{label}</p>
			</div>
		</Button>
	);
}

export function ChatControl({ speaking, ...prop }) {
	const t = useJuJiuT();
	const label = t(speaking ? '挂断' : '对讲');

	return (
		<Button isIconOnly variant='light' {...prop}>
			<div className='flex flex-col items-center'>
				{speaking ? <PhoneXMark size={24} /> : <Phone size={24} />}
				<p>{label}</p>
			</div>
		</Button>
	);
}
