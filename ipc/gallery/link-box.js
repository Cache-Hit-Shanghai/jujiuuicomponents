import { Box, Stack } from 'grommet';
import React from 'react';
import { JJIconCirclePlay } from '../icons';
import { Link } from '@/state/translate';
import { PlayCircleOutline } from 'styled-icons/material';
import {
	getCloudStorageUrlByName,
	useCachedCloudStorageUrl,
} from '@/hook/cloudstorage';
import { useCachedGalleryUrl } from '@/hook/gallery';
import { isVersionBelowTarget, sendRecordVideoUrl } from '@/config/device';
import { useCannotPlayVideo } from '@/hook/webView';
import { useRouter } from 'next/navigation';
import { getShellVersion } from '@/util/shell';

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
	const router = useRouter();

	const cannotPlayVideo = useCannotPlayVideo();
	const handleClick = () => {
		if (cannotPlayVideo) {
			const version = getShellVersion();

			const isBelow = isVersionBelowTarget({
				version,
				targetVersion: '1.0.9',
			});
			if (isBelow) return;
			getCloudStorageUrlByName({
				name,
			}).then(({ url }) => {
				sendRecordVideoUrl(url);
			});
			return;
		}
		router.push(`${pathname}?type=video&name=${name}`);
	};
	return (
		<div
			href={{
				pathname,
				query: { type: 'video', name },
			}}
			passHref
			legacyBehavior
			onClick={handleClick}
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
		</div>
	);
};

export { LinkBoxImage, LinkBoxVideo, LinkBoxVideoV2 };
