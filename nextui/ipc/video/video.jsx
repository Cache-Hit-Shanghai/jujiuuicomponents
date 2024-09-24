import { useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { FadeAnimation, NavbarBack } from '../../core/core-ui';
import { DocumentLandscapeStyle } from '@/components';
import { twMerge } from 'tailwind-merge';

export const VideoPlayerWrapper = ({
	fullscreen,
	fullscreenToggle,
	fullscreenLabel = '退出全屏',
	videoPlayer,
	wrapperClass,
}) => {
	const [showOverlayUtils, setShowOverlayUtils] = useState(true);
	const [isMouseHover, setIsMouseHover] = useState(true);

	useIdleTimer({
		onIdle: () => setShowOverlayUtils(false),
		onActive: () => setShowOverlayUtils(true),
		timeout: 1000,
		throttle: 500,
	});

	return (
		<div
			className={twMerge(
				`flex flex-col justify-center bg-background w-full h-full ${
					fullscreen ? 'fixed top-0 left-0' : 'relative'
				} `,
				wrapperClass,
			)}
			onMouseLeave={() => {
				fullscreen && isMouseHover && setIsMouseHover(false);
			}}
			onMouseEnter={() => {
				fullscreen && !isMouseHover && setIsMouseHover(true);
			}}
		>
			{fullscreen && isMouseHover && (
				<FadeAnimation show={showOverlayUtils}>
					<div className='absolute left-0 top-0 text-white z-[9999]'>
						<NavbarBack
							className='font-semibold text-with-shadow'
							onClick={fullscreenToggle}
							goBack={false}
							label={
								<span className='text-sm ml-[-24px]'>{fullscreenLabel}</span>
							}
						/>
					</div>
				</FadeAnimation>
			)}
			<DocumentLandscapeStyle enabled={fullscreen} />
			{videoPlayer}
		</div>
	);
};
