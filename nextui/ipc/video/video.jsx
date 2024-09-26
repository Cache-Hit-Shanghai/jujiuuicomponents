import { useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { FadeAnimation, NavbarBack } from '../../core/core-ui';
import { DocumentLandscapeStyle } from '@/components';
import { ChevronLeft } from 'styled-icons/material';
import { twMerge } from 'tailwind-merge';
import { Button } from '@nextui-org/react';

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
					<div className='absolute left-0 top-0 text-white z-[10010]'>
						<Button
							onClick={fullscreenToggle}
							variant='light'
							className='text-white'
						>
							<span className='font-semibold text-with-shadow '>
								<ChevronLeft size={24} />
							</span>
							<span className='text-sm'>{fullscreenLabel}</span>
						</Button>
					</div>
				</FadeAnimation>
			)}
			<DocumentLandscapeStyle enabled={fullscreen} />
			{videoPlayer}
		</div>
	);
};
