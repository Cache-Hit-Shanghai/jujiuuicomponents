'use client';

import { useJuJiuT } from '@/state/translate';
import { Box, Stack, Spinner, Text, Image } from 'grommet';
import { JJIconCircleInformation, JJIconShareRounded, JJIconTrash } from '../icons';
import { IconButton } from '../../core';

/**
 *
 * @param {{
 * isLoading: boolean,
 * media: import('react').ReactNode,
 * onShare: function,
 * onDelete: function
 * }} props
 * @returns
 */
function MediaView({ isLoading, media, onShare, onDelete }) {
	const t = useJuJiuT();

	return (
		<>
			<Box flex={{ grow: 10, shrink: 1 }}>
				<Stack fill anchor='center'>
					<Box width='100%' height='100%' align='center' justify='center'>
						{media}
					</Box>
					{isLoading && <Spinner size='large' />}
				</Stack>
			</Box>
			<Box direction='row' align='center' gap='small' margin='medium' alignSelf='center'>
				<JJIconCircleInformation color='brand' />
				<Text size='small' color='text-xweak'>
					{t('长按后选择“下载”可以下载图片或者视频。')}
				</Text>
			</Box>
			<Box direction='row' justify='evenly' background='background-contrast' flex={false}>
				<IconButton icon={<JJIconShareRounded />} label={t('分享')} onClick={onShare} disabled={!onShare} />
				<IconButton icon={<JJIconTrash />} label={t('删除')} onClick={onDelete} disabled={!onDelete} />
			</Box>
		</>
	);
}

function VideoView({ url, ...passProps }) {
	return (
		<MediaView
			isLoading={!url}
			media={
				url && (
					<video
						src={url}
						autoPlay={false}
						controls
						style={{ maxHeight: '100%', maxWidth: '100%' }}
						playsInline={true}
					/>
				)
			}
			{...passProps}
		/>
	);
}

/**
 *
 * @param {Parameters<typeof MediaView>[0] & {url: string}} props
 * @returns
 */
function ImageView({ url, ...passProps }) {
	return <MediaView isLoading={!url} media={url && <Image src={url} fill fit='contain' />} {...passProps} />;
}

export { VideoView, ImageView };
