'use client';

import { ButtonLink } from '../../core';
import { useJuJiuT } from '@/state/translate';
import { List, Box, Text } from 'grommet';
import { JJIconWebcam } from '../icons';

function emptyFn() {}

function ListElement({ title, content, href }) {
	const inside = (
		<Box direction='row' gap='small' align='center' justify='between' focusIndicator={false}>
			<Box direction='row' gap='small' align='center'>
				<JJIconWebcam size='large' />
				<Box>
					<Text>{title}</Text>
					<Text size='small'>{content}</Text>
				</Box>
			</Box>
		</Box>
	);

	if (!href) return inside;
	return <ButtonLink href={href}>{inside}</ButtonLink>;
}

function SharingDeviceList({ data = [], makeHref = emptyFn }) {
	const t = useJuJiuT();

	return (
		<List data={data}>
			{({ desc, shareCount, _id }) => (
				<ListElement
					title={desc}
					content={t('已分享{count}人', undefined, { values: { count: shareCount } })}
					href={makeHref({ _id })}
				/>
			)}
		</List>
	);
}

function SharedDeviceList({ data = [], makeHref = emptyFn }) {
	const t = useJuJiuT();

	return (
		<List data={data}>
			{({ desc, sharedBy, usn }) => (
				<ListElement
					title={desc}
					content={t('来自 {name}', undefined, { values: { name: sharedBy } })}
					href={makeHref({ usn })}
				/>
			)}
		</List>
	);
}

export { SharingDeviceList, SharedDeviceList };
