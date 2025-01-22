import { FaAngleUp, FaAngleDown } from 'react-icons/fa6';
import { Joystick, JoystickShape } from 'react-joystick-component';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';

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
			onClick();
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
			<span className='w-full flex justify-center'>{icon}</span>
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
	let preUpDown;
	let preLeftRight;
	return (
		<>
			<div className='absolute left-14 bottom-2'>
				<CommonJoystick
					controlPlaneShape={JoystickShape.AxisX}
					stickClassName={'rotate-[270deg]'}
					isDisabled={isDisabled}
					onMove={({ x }) => {
						const curDir = x > 0 ? 'up' : 'down';
						if (curDir === preUpDown) return;
						preUpDown = curDir;
						onMove({ x });
					}}
					onUp={() => onMove({ x: 1 })}
					onDown={() => onMove({ x: -1 })}
					onStop={() => onMove({ x: 1, platform: 'end' })}
					onClickUp={() => {
						onMove({ x: 1, platform: 'click' });
					}}
					onClickDown={() => {
						onMove({ x: -1, platform: 'click' });
					}}
				/>
			</div>
			<div className='absolute right-[12%] bottom-[-24px]'>
				<CommonJoystick
					wrapperClassName={'rotate-[270deg]'}
					controlPlaneShape={JoystickShape.AxisY}
					isDisabled={isDisabled}
					onMove={({ y }) => {
						const curDir = y > 0 ? 'left' : 'right';
						if (curDir === preLeftRight) return;
						preLeftRight = curDir;
						onMove({ y });
					}}
					onUp={() => onMove({ y: 1 })}
					onDown={() => onMove({ y: -1 })}
					onStop={() => onMove({ y: 1, platform: 'end' })}
					onClickUp={() => {
						onMove({ y: 1, platform: 'click' });
					}}
					onClickDown={() => {
						onMove({ y: -1, platform: 'click' });
					}}
				/>
			</div>
		</>
	);
};

export const CommonJoystick = ({
	height = 160,
	width = 56,
	onMove,
	onStop,
	onStart,
	onUp,
	onDown,
	controlPlaneShape,
	wrapperClassName,
	stickClassName,
	onClickUp,
	onClickDown,
}) => {
	return (
		<div
			className={twMerge(
				'bg-[#000000]/[0.3] rounded-full flex flex-col justify-between items-center relative px-4 py-2',
				wrapperClassName
			)}
			style={{ height, width }}
		>
			<Arrow
				icon={<FaAngleUp color='white' />}
				onStart={onUp}
				onStop={onStop}
				onClick={onClickUp}
			/>
			<div className={twMerge('absolute top-6', stickClassName)}>
				<Joystick
					controlPlaneShape={controlPlaneShape}
					size={height - 48}
					stickSize={width - 32}
					baseColor='transparent'
					stickColor='white'
					start={onStart}
					throttle={50}
					move={onMove}
					stop={onStop}
				/>
			</div>
			<Arrow
				icon={<FaAngleDown color='white' />}
				onStart={onDown}
				onStop={onStop}
				onClick={onClickDown}
			/>
		</div>
	);
};
