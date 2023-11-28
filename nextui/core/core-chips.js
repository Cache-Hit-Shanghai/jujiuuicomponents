'use client';

import { Chip } from '@nextui-org/react';
import { useJuJiuT } from '@/state/translate';
import { Cloud } from '@styled-icons/material/Cloud';
import { IosShare } from '@styled-icons/material/IosShare';
import { Reply } from '@styled-icons/material/Reply';
import { FiberManualRecord } from '@styled-icons/material/FiberManualRecord';

export function ChipOnline() {
	const t = useJuJiuT();

	return (
		<Chip size='sm' variant='dot' color='success'>
			{t('在线')}
		</Chip>
	);
}

export function ChipOffline() {
	const t = useJuJiuT();

	return (
		<Chip size='sm' variant='dot'>
			{t('离线')}
		</Chip>
	);
}

export function ChipFromFriends() {
	const t = useJuJiuT();

	return (
		<Chip size='sm' color='primary' startContent={<Reply size={20} />}>
			{t('来自分享')}
		</Chip>
	);
}

export function ChipShared() {
	const t = useJuJiuT();

	return (
		<Chip size='sm' color='secondary' startContent={<IosShare size={20} />}>
			{t('分享中')}
		</Chip>
	);
}

export function ChipCloudStorageExpiring() {
	const t = useJuJiuT();

	return (
		<Chip size='sm' color='warning' startContent={<Cloud size={20} />}>
			{t('云存储即将过期')}
		</Chip>
	);
}

export function ChipCloudStorageExpired() {
	const t = useJuJiuT();

	return (
		<Chip size='sm' color='danger' startContent={<Cloud size={20} />}>
			{t('云存储已过期')}
		</Chip>
	);
}

export function ChipRecording({ label, ...props }) {
	return (
		<Chip size='sm' color='danger' startContent={<FiberManualRecord size={18} />} {...props}>
			{label}
		</Chip>
	);
}
