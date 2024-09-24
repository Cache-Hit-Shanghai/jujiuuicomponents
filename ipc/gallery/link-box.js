import { Box, Stack } from 'grommet';
import React from 'react';
import { JJIconCirclePlay } from '../icons';
import { Link } from '@/state/translate';
import { PlayCircleOutline } from 'styled-icons/material';
import { useCachedCloudStorageUrl } from '@/hook/cloudstorage';
import { useCachedGalleryUrl } from '@/hook/gallery';

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

export const LinkBoxImageV2 = ({
	obj,
	width = MEDIA_ELEMENT_WIDTH_PX,
	height = 70,
}) => {
	const { name } = obj;

	const url = useCachedGalleryUrl({
		name,
		signOpts: { process: `image/resize,w_${width * 2}` },
	});

	return (
		<Link
			href={{
				pathname: '/pixelbot/my/gallery/detail',
				query: { name, type: 'image' },
			}}
			passHref
			legacyBehavior
		>
			<div
				style={{
					backgroundImage: `url(${url})`,
					height,
					width,
				}}
				className='w-full h-full bg-no-repeat bg-center bg-cover rounded cursor-pointer'
			/>
		</Link>
	);
};

const LinkBoxVideoV2 = ({
	obj,
	width = MEDIA_ELEMENT_WIDTH_PX,
	height = 70,
	pathname = 'pixelbot/device/record/detail',
}) => {
	const { name } = obj;

	const url = useCachedCloudStorageUrl({
		name,
		signOpts: {
			process: `video/snapshot,t_1000,f_jpg,m_fast,w_${width * 2},h_0`,
		},
	});

	return (
		<Link
			href={{
				pathname,
				query: { type: 'video', name },
			}}
			passHref
			legacyBehavior
		>
			<div
				style={{
					backgroundImage: `url(${url ?? ''})`,
					height,
					width,
				}}
				className='relative w-full h-full flex flex-col justify-center items-center bg-cover rounded cursor-pointer'
			>
				<PlayCircleOutline className='absolute' size={24} />
			</div>
		</Link>
	);
};

export { LinkBoxImage, LinkBoxVideo, LinkBoxVideoV2 };
