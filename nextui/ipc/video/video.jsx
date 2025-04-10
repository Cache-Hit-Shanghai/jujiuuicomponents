import { DocumentLandscapeStyle } from '@/components';
import { videoFullForNative } from '@/jujiu_react_common/helper/wkWebView';
import { documentFullscreen } from '@/util/document';
import { Button } from '@nextui-org/react';
import { useRef } from 'react';
import { ChevronLeft } from 'styled-icons/material';
import { twMerge } from 'tailwind-merge';

export const VideoPlayerWrapper = ({
	fullscreen,
	setFullscreen,
	fullscreenLabel = '退出全屏',
	renderVideo,
	wrapperClass,
}) => {
	const toggleScreenRef = useRef(null);
	const onReady = (player) => {
		const customFullscreenToggle = player
			.getChild('ControlBar')
			.addChild('button', {
				clickHandler() {
					setFullscreen((pre) => !pre);
					const target = !document.fullscreenElement;
					documentFullscreen(target);
					customFullscreenToggle.setIcon(
						target ? 'fullscreen-exit' : 'fullscreen-enter'
					);
					videoFullForNative();
				},
			});
		customFullscreenToggle.setIcon('fullscreen-enter');
		toggleScreenRef.current = customFullscreenToggle;
	};

	const fullscreenToggle = () => {
		toggleScreenRef.current?.handleClick?.();
	};

	return (
		<div
			className={twMerge(
				`flex flex-col justify-center bg-background w-full h-full  ${
					fullscreen ? 'fixed top-0 left-0 z-[1111]' : 'relative'
				} `,
				wrapperClass
			)}
		>
			{fullscreen && (
				<div
					className={`absolute left-0 top-0 text-white z-[1010] w-full h-10`}
				>
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
			)}
			<DocumentLandscapeStyle enabled={fullscreen} />
			{renderVideo(onReady)}
		</div>
	);
};
