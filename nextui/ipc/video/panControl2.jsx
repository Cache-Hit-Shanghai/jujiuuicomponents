// FIXME: filename
import { ArrowDropUp } from '@styled-icons/material/ArrowDropUp';
import { useCallback, useState } from 'react';
import { twMerge } from 'tailwind-merge';

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
			<ArrowDropUp size={24} className='-rotate-45 transform-gpu' />
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
}) {
	const mastStyle =
		'radial-gradient(circle farthest-side at bottom right, transparent 40%, #000 40%)';
	return (
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
			/>
			<Sector
				onClick={onClickRight}
				onLongPressStart={onLongPressRightStart}
				onLongPressEnd={onLongPressRightEnd}
				maskStyle={mastStyle}
				rotateClass='rotate-[90deg] transform-gpu'
			/>
			<Sector
				onClick={onClickDown}
				onLongPressStart={onLongPressDownStart}
				onLongPressEnd={onLongPressDownEnd}
				maskStyle={mastStyle}
				rotateClass='rotate-[180deg] transform-gpu'
			/>
			<Sector
				onClick={onClickLeft}
				onLongPressStart={onLongPressLeftStart}
				onLongPressEnd={onLongPressLeftEnd}
				maskStyle={mastStyle}
				rotateClass='rotate-[270deg] transform-gpu'
			/>
		</div>
	);
}
