import { sendRecordVideoUrl } from '@/config/device';
import {
	getCloudStorageUrlByName,
	useCachedCloudStorageUrl,
} from '@/hook/cloudstorage';
import { useCachedGalleryUrl } from '@/hook/gallery';
import { useCannotPlayVideo } from '@/hook/webView';
import { Link } from '@/state/translate';
import { Box, Stack } from 'grommet';
import { useRouter } from 'next/navigation';
import { PlayCircleOutline } from 'styled-icons/material';
import { JJIconCirclePlay } from '../icons';

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
	pathname = './device/record/detail',
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
