'use client';

import { Chip } from '@nextui-org/react';
import { useJuJiuT } from '@/state/translate';
import { Cloud } from '@styled-icons/heroicons-outline/Cloud';
import { ArrowTopRightOnSquare } from '@styled-icons/heroicons-outline/ArrowTopRightOnSquare';
import { ArrowLeftOnRectangle } from '@styled-icons/heroicons-outline/ArrowLeftOnRectangle';
import { RecordCircle } from '@styled-icons/remix-line/RecordCircle';

export function ChipOnline() {
	const t = useJuJiuT();

	return (
		<Chip variant='dot' color='success'>
			{t('在线')}
		</Chip>
	);
}

export function ChipOffline() {
	const t = useJuJiuT();

	return <Chip variant='dot'>{t('离线')}</Chip>;
}

export function ChipFromFriends() {
	const t = useJuJiuT();

	return (
		<Chip color='primary' startContent={<ArrowLeftOnRectangle size={20} />}>
			{t('来自分享')}
		</Chip>
	);
}

export function ChipShared() {
	const t = useJuJiuT();

	return (
		<Chip color='secondary' startContent={<ArrowTopRightOnSquare size={20} />}>
			{t('分享中')}
		</Chip>
	);
}

export function ChipCloudStorageExpiring() {
	const t = useJuJiuT();

	return (
		<Chip color='warning' startContent={<Cloud size={20} />}>
			{t('云存储即将过期')}
		</Chip>
	);
}

export function ChipCloudStorageExpired() {
	const t = useJuJiuT();

	return (
		<Chip color='danger' startContent={<Cloud size={20} />}>
			{t('云存储已过期')}
		</Chip>
	);
}

export function ChipRecording({ label, ...props }) {
	return (
		<Chip color='danger' startContent={<RecordCircle size={18} />} {...props}>
			{label}
		</Chip>
	);
}
