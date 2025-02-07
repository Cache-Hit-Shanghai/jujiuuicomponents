import { twMerge } from 'tailwind-merge';
import { useRef, useState } from 'react';
import ReactNipple from 'react-nipple';
import { PanControlArrow } from '@/jujiu-ui-components/icons/RightArrow';

const VerticalOnlyJoystick = ({ onMove, onPlain, onEnd, config }) => {
	return (
		<ReactNipple
			options={{
				mode: 'static',
				position: { left: '50%', top: '50%' },
				size: 112,
				color: 'transparent',
				restOpacity: 1,
				shape: 'square',
				restJoystick: true,
				...config,
			}}
			onMove={onMove}
			onPlain={onPlain}
			onEnd={onEnd}
			style={{
				opacity: 1,
			}}
		/>
	);
};

const Arrow = ({ icon, onClick, onStart, onStop }) => {
	let pressTimer;
	const [isLongPressStart, setIsLongPressStart] = useState(false);

	const handlePressStart = () => {
		pressTimer = setTimeout(() => {
			onStart();
			setIsLongPressStart(true);
		}, 500);
	};

	const handlePressEnd = () => {
		clearTimeout(pressTimer);
		if (isLongPressStart) {
			onStop();
			setIsLongPressStart(false);
		}
	};

	const handlePress = () => {
		clearTimeout(pressTimer);
		if (!isLongPressStart) {
			onClick?.();
		}
		setIsLongPressStart(false);
	};

	return (
		<div
			onClick={handlePress}
			onTouchStart={handlePressStart}
			onTouchEnd={handlePressEnd}
			role='button'
			className='w-full flex items-center justify-center'
		>
			{icon}
		</div>
	);
};

const makeOnMove = (getWebrtcCaller, speed) => {
	if (!getWebrtcCaller || typeof getWebrtcCaller !== 'function')
		return () => {};
	return ({ x, y, platform }) => {
		const {
			webRtcDataChannelUtil: { send },
		} = getWebrtcCaller();
		const playload = {};
		if (y !== undefined) {
			playload.direction = y > 0 ? 'left' : 'right';
		}
		if (x !== undefined) {
			playload.direction = x > 0 ? 'up' : 'down';
		}

		if (platform) {
			playload.platform = platform;
		}
		send({ subtype: 'platform', speed, ...playload });
	};
};

export const PanControlL1Fullscreen = ({
	speedNum,
	isDisabled,
	getWebrtcCaller,
}) => {
	const speed = speedNum / 100;
	const onMove = makeOnMove(getWebrtcCaller, speed);
	let preUpDown = useRef(null);
	let preLeftRight = useRef(null);

	return (
		<>
			<div className='absolute left-20 bottom-6'>
				<CommonJoystick
					stickClassName={'rotate-[270deg] top-1/2'}
					isDisabled={isDisabled}
					onMove={({ x }) => {
						const curDir = x > 0 ? 'up' : 'down';
						if (curDir === preUpDown.current) return;
						preUpDown.current = curDir;
						onMove({ x });
					}}
					onUp={() => onMove({ x: 1 })}
					onDown={() => onMove({ x: -1 })}
					onStop={() => {
						onMove({ x: 1, platform: 'end' });
						preUpDown.current = null;
					}}
					onClickUp={() => {
						onMove({ x: 1, platform: 'click' });
					}}
					onClickDown={() => {
						onMove({ x: -1, platform: 'click' });
					}}
					config={{
						lockX: true,
					}}
				/>
			</div>
			<div className='absolute right-[15%] bottom-0'>
				<CommonJoystick
					wrapperClassName={'rotate-[270deg]'}
					stickClassName={'left-1/2 top-1/2'}
					isDisabled={isDisabled}
					onMove={({ y }) => {
						const curDir = y > 0 ? 'left' : 'right';
						if (curDir === preLeftRight.current) return;
						preLeftRight.current = curDir;
						onMove({ y });
					}}
					onUp={() => onMove({ y: 1 })}
					onDown={() => onMove({ y: -1 })}
					onStop={() => {
						onMove({ y: 1, platform: 'end' });
						preLeftRight.current = null;
					}}
					onClickUp={() => {
						onMove({ y: 1, platform: 'click' });
					}}
					onClickDown={() => {
						onMove({ y: -1, platform: 'click' });
					}}
					config={{
						lockY: true,
					}}
				/>
			</div>
		</>
	);
};

export const CommonJoystick = ({
	height = 120,
	width = 40,
	onMove,
	onStop,
	onStart,
	onUp,
	onDown,
	wrapperClassName,
	stickClassName,
	onClickUp,
	onClickDown,
	config,
}) => {
	const handleMotion = (__, data) => {
		onMove({
			x: data.vector.x,
			y: data.vector.y,
		});
	};

	return (
		<div
			className={twMerge(
				'bg-[#ffffff]/[0.3] rounded-full flex flex-col justify-between items-center relative px-2 py-1',
				wrapperClassName
			)}
			style={{ height, width }}
		>
			<Arrow
				icon={<PanControlArrow className='rotate-[270deg]' />}
				onStart={onUp}
				onStop={onStop}
				// onClick={onClickUp}
			/>
			<div
				className={twMerge(
					'absolute pixelbot__pan-control__vertical',
					stickClassName
				)}
			>
				<VerticalOnlyJoystick
					onMove={handleMotion}
					onEnd={onStop}
					onPlain={handleMotion}
					config={config}
				/>
			</div>
			<Arrow
				icon={<PanControlArrow className='rotate-[90deg]' />}
				onStart={onDown}
				onStop={onStop}
				// onClick={onClickDown}
			/>
		</div>
	);
};
