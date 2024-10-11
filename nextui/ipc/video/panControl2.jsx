// FIXME: filename
import { ArrowDropUp } from '@styled-icons/material/ArrowDropUp';
import { useCallback, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import './panControl2.scss';
import dynamic from 'next/dynamic';
const ReactNipple = dynamic(() => import('react-nipple'), { ssr: false });

function Circle() {
	return (
		<div className='w-2/5 aspect-square rounded-full bg-default opacity-90 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' />
	);
}

function Sector({
	onClick,
	onLongPressStart,
	onLongPressEnd,
	maskStyle,
	rotateClass,
	arrowClass,
}) {
	let pressTimer;
	const [isLongPressStart, setIsLongPressStart] = useState(false);

	const handlePressStart = useCallback(() => {
		pressTimer = setTimeout(() => {
			console.log('long press start');
			onLongPressStart();
			setIsLongPressStart(true);
		}, 500);
	});

	const handlePressEnd = useCallback(() => {
		clearTimeout(pressTimer);
		if (isLongPressStart) {
			console.log('long press end');
			onLongPressEnd();
			setIsLongPressStart(false);
		}
	});

	const handlePress = useCallback(() => {
		clearTimeout(pressTimer);
		if (!isLongPressStart) {
			console.log('short press');
			onClick();
		}
		setIsLongPressStart(false);
	});

	return (
		<div
			className={`absolute w-1/2 aspect-square rounded-tl-full origin-bottom-right flex items-center justify-center ${rotateClass}`}
			style={{
				WebkitMaskImage: maskStyle,
				mask: maskStyle,
			}}
			onClick={handlePress}
			onTouchStart={handlePressStart}
			onTouchEnd={handlePressEnd}
		>
			<ArrowDropUp
				size={24}
				className={twMerge('-rotate-45 transform-gpu', arrowClass)}
			/>
		</div>
	);
}

export function PanControl2({
	onClickUp,
	onLongPressUpStart,
	onLongPressUpEnd,
	onClickDown,
	onLongPressDownStart,
	onLongPressDownEnd,
	onClickLeft,
	onLongPressLeftStart,
	onLongPressLeftEnd,
	onClickRight,
	onLongPressRightStart,
	onLongPressRightEnd,
	className,
	pointStyle,
	arrowClass,
}) {
	const mastStyle =
		'radial-gradient(circle farthest-side at bottom right, transparent 40%, #000 40%)';
	return (
		<>
			<div
				className={twMerge(
					'rounded-full w-full h-full aspect-square relative rotate-[45deg] transform-gpu bg-[#000000CC] text-[#C0C0C0]',
					className,
				)}
			>
				<Sector
					onClick={onClickUp}
					onLongPressStart={onLongPressUpStart}
					onLongPressEnd={onLongPressUpEnd}
					maskStyle={mastStyle}
					rotateClass=''
					arrowClass={arrowClass}
				/>
				<Sector
					onClick={onClickRight}
					onLongPressStart={onLongPressRightStart}
					onLongPressEnd={onLongPressRightEnd}
					maskStyle={mastStyle}
					rotateClass='rotate-[90deg] transform-gpu'
					arrowClass={arrowClass}
				/>
				<Sector
					onClick={onClickDown}
					onLongPressStart={onLongPressDownStart}
					onLongPressEnd={onLongPressDownEnd}
					maskStyle={mastStyle}
					rotateClass='rotate-[180deg] transform-gpu'
					arrowClass={arrowClass}
				/>
				<Sector
					onClick={onClickLeft}
					onLongPressStart={onLongPressLeftStart}
					onLongPressEnd={onLongPressLeftEnd}
					maskStyle={mastStyle}
					rotateClass='rotate-[270deg] transform-gpu'
					arrowClass={arrowClass}
				/>
			</div>
			<div className='bg-[#C0C0C0] rounded-full absolute' style={pointStyle} />
		</>
	);
}

export function PanControl3({
	fullscreen,
	onLongPressUpStart,
	onClickUp,
	onLongPressUpEnd,
	onLongPressDownStart,
	onClickDown,
	onLongPressLeftStart,
	onClickLeft,
	onLongPressRightStart,
	onClickRight,
	className,
	arrowClass,
}) {
	const mastStyle =
		'radial-gradient(circle farthest-side at bottom right, transparent 40%, #000 40%)';
	return (
		<>
			<div
				className={twMerge(
					'rounded-full w-full h-full aspect-square relative rotate-[45deg] transform-gpu bg-[#000000CC] text-[#C0C0C0]',
					className,
				)}
			>
				<Sector
					onClick={onClickUp}
					maskStyle={mastStyle}
					rotateClass=''
					arrowClass={arrowClass}
				/>
				<Sector
					onClick={onClickRight}
					maskStyle={mastStyle}
					rotateClass='rotate-[90deg] transform-gpu'
					arrowClass={arrowClass}
				/>
				<Sector
					onClick={onClickDown}
					maskStyle={mastStyle}
					rotateClass='rotate-[180deg] transform-gpu'
					arrowClass={arrowClass}
				/>
				<Sector
					onClick={onClickLeft}
					maskStyle={mastStyle}
					rotateClass='rotate-[270deg] transform-gpu'
					arrowClass={arrowClass}
				/>
			</div>
			<ReactNipple
				options={{
					mode: 'static',
					threshold: 0.7,
					size: 120,
					position: { top: '50%', left: '50%' },
				}}
				onDir={(event, data) => {
					if (fullscreen) {
						// process rotation 90deg
						switch (data?.direction?.angle) {
							case 'up':
								onLongPressLeftStart();
								break;
							case 'down':
								onLongPressRightStart();
								break;
							case 'left':
								onLongPressDownStart();
								break;
							case 'right':
								onLongPressUpStart();
								break;
							default:
								return;
						}
					} else {
						switch (data?.direction?.angle) {
							case 'up':
								onLongPressUpStart();
								break;
							case 'down':
								onLongPressDownStart();
								break;
							case 'left':
								onLongPressLeftStart();
								break;
							case 'right':
								onLongPressRightStart();
								break;
							default:
								return;
						}
					}
				}}
				onEnd={onLongPressUpEnd}
				style={{
					zIndex: 0,
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: fullscreen ? 'rotate(-90deg)' : '',
				}}
			/>
		</>
	);
}
