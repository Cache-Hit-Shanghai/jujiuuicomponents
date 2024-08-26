import { Box, Stack } from 'grommet';
import React from 'react';
import { JJIconCirclePlay } from '../icons';
import { Link } from '@/state/translate';
import { PlayCircleOutline } from 'styled-icons/material';
import { useCachedCloudStorageUrl } from '@/hook/cloudstorage';

const DEFAULT_IMAGE = '';
const MEDIA_ELEMENT_WIDTH_PX = 108;

function LinkBox({ url, onClick, defaultImage = DEFAULT_IMAGE, ...passProps }) {
	return (
		<Box
			as='a'
			fill
			background={url ? `url(${url})` : DEFAULT_IMAGE}
			round='xsmall'
			focusIndicator={false}
			onClick={onClick}
			{...passProps}
		/>
	);
}

function LinkBoxImage({ url, onClick }) {
	return <LinkBox {...{ url, onClick }} />;
}

function LinkBoxVideo({ url, onClick }) {
	return (
		<Stack fill anchor='center' interactiveChild='first'>
			<LinkBox {...{ url, onClick }} />
			<Box>
				<JJIconCirclePlay />
			</Box>
		</Stack>
	);
}

const LinkBoxVideoV2 = ({ obj }) => {
	const { name } = obj;

	const url = useCachedCloudStorageUrl({
		name,
		signOpts: {
			process: `video/snapshot,t_1000,f_jpg,m_fast,w_${MEDIA_ELEMENT_WIDTH_PX * 2},h_0`,
		},
	});

	return (
		<Link
			href={{ pathname: './streaming/record', query: { type: 'video', name } }}
			passHref
			legacyBehavior
		>
			<div
				style={{
					backgroundImage: `url(${url})`,
					height: '70px',
				}}
				className={`relative w-full h-full flex flex-col justify-center items-center  rounded cursor-pointer`}
			>
				<PlayCircleOutline className='absolute' size={24} />
			</div>
		</Link>
	);
};

export { LinkBoxImage, LinkBoxVideo, LinkBoxVideoV2 };
