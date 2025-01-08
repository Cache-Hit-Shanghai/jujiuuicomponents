// FIXME: filename
import { ArrowDropUp } from '@styled-icons/material/ArrowDropUp';
import { useCallback, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import './panControl2.scss';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
const ReactNipple = dynamic(() => import('react-nipple'), { ssr: false });
import { useThrottle } from '@/hook/common';

function Sector ({
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
			className={`absolute w-1/2 h-1/2 rounded-tl-full origin-bottom-right flex items-center justify-center ${rotateClass}`}
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

export function PanControl2 ({
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
					'rounded-full w-full h-full relative rotate-[45deg] transform-gpu bg-[#000000CC] text-[#C0C0C0]',
					className
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

export function PanControlL1 ({
	fullscreen,
	onLongPressUpEnd,
	onMove,
	className,
	arrowClass,
	isDisabled,
	needReload,
	speedNum,
	isSelected,
}) {
	const mastStyle =
		'radial-gradient(circle farthest-side at bottom right, transparent 40%, #000 40%)';
	const [nippleKey, setNippleKey] = useState(0);

	useEffect(() => {
		setTimeout(() => {
			setNippleKey((pre) => pre + 1);
		}, 100);
	}, [needReload, isSelected]);

	let previousDegree = null;
	const onMoveHandler = (event, data, speedParams) => {
		if (data.distance <= 30) return;
		let degree;
		if (fullscreen) {
			degree = (360 - data.angle.degree) % 360;
		} else {
			degree = (450 - data.angle.degree) % 360;
		}
		const speed = Number((speedParams / 100).toFixed(3));
		degree = Number(degree.toFixed(1));
		if (previousDegree === null || Math.abs(previousDegree - degree) >= 5) {
			onMove?.(speed, degree, 2);
			previousDegree = degree;
		}
	};

	const { throttleFn: onMoveThrottle, handleReset } = useThrottle(
		onMoveHandler,
		100,
		{trailing:false}
	);

	const onEndHandler = () => {
		previousDegree = null;
		handleReset();
	};

	return (
		<>
			<div
				className={twMerge(
					'rounded-full w-full h-full relative rotate-[45deg] transform-gpu bg-[#000000CC] text-[#C0C0C0]',
					className
				)}
			>
				<Sector maskStyle={mastStyle} rotateClass='' arrowClass={arrowClass} />
				<Sector
					maskStyle={mastStyle}
					rotateClass='rotate-[90deg] transform-gpu'
					arrowClass={arrowClass}
				/>
				<Sector
					maskStyle={mastStyle}
					rotateClass='rotate-[180deg] transform-gpu'
					arrowClass={arrowClass}
				/>
				<Sector
					maskStyle={mastStyle}
					rotateClass='rotate-[270deg] transform-gpu'
					arrowClass={arrowClass}
				/>
			</div>
			<div className={isDisabled ? 'disabled_pan-control' : ''}>
				<ReactNipple
					key={`react-nipple_${nippleKey}`}
					options={{
						mode: 'static',
						size: fullscreen ? 115 : 140,
						position: { top: '50%', left: '50%' },
						lockY: false,
					}}
					onMove={(__, data) => onMoveThrottle(__, data, speedNum)}
					onEnd={() => {
						onEndHandler();
						if (!isDisabled) {
							onLongPressUpEnd();
						}
					}}
					style={{
						zIndex: 0,
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: fullscreen ? 'rotate(-90deg)' : '',
					}}
				/>
			</div>
		</>
	);
}

export function PanControlL1Version1 ({
	fullscreen,
	onLongPressUpEnd,
	onMove,
	className,
	arrowClass,
	isDisabled,
	needReload,
	isSelected,
	speedNum,
}) {
	const mastStyle =
		'radial-gradient(circle farthest-side at bottom right, transparent 40%, #000 40%)';
	const [nippleKey, setNippleKey] = useState(0);

	useEffect(() => {
		setTimeout(() => {
			setNippleKey((pre) => pre + 1);
		}, 100);
	}, [needReload, isSelected]);

	//let previousDistance = null;
	let previousDegree = null;

	const onMoveHandler = (event, data) => {
		let degree;
		if (fullscreen) {
			degree = (360 - data.angle.degree) % 360;
		} else {
			degree = (450 - data.angle.degree) % 360;
		}
		//const distance = Number((data?.distance / 70).toFixed(3));
		degree = Number(degree.toFixed(1));
		if (
			//previousDistance === null ||
			previousDegree === null ||
			Math.abs(previousDegree - degree) >= 5 
			//|| Math.abs(previousDistance - distance) >= 0.1
		) {
			console.log("(speedNum/100):",Number((speedNum/100).toFixed(3)));
			onMove?.(Number((speedNum/100).toFixed(3)), degree, 1);
			//previousDistance = distance;
			previousDegree = degree;
		}
	};
	const { throttleFn: onMoveThrottle, handleReset } = useThrottle(
		onMoveHandler,
		100,
		{trailing:false}
	);

	const onEndHandler = () => {
		//previousDistance = null;
		previousDegree = null;
		handleReset();
	};

	return (
		<>
			<div
				className={twMerge(
					'rounded-full w-full h-full relative rotate-[45deg] transform-gpu bg-[#000000CC] text-[#C0C0C0]',
					className
				)}
			>
				<Sector maskStyle={mastStyle} rotateClass='' arrowClass={arrowClass} />
				<Sector
					maskStyle={mastStyle}
					rotateClass='rotate-[90deg] transform-gpu'
					arrowClass={arrowClass}
				/>
				<Sector
					maskStyle={mastStyle}
					rotateClass='rotate-[180deg] transform-gpu'
					arrowClass={arrowClass}
				/>
				<Sector
					maskStyle={mastStyle}
					rotateClass='rotate-[270deg] transform-gpu'
					arrowClass={arrowClass}
				/>
			</div>
			<div className={isDisabled ? 'disabled_pan-control' : ''}>
				<ReactNipple
					key={`react-nipple_${nippleKey}`}
					options={{
						mode: 'static',
						threshold: 0.6,
						size: fullscreen ? 115 : 140,
						position: { top: '50%', left: '50%' },
						lockY: false,
					}}
					onMove={onMoveThrottle}
					onEnd={() => {
						onEndHandler();
						if (!isDisabled) {
							onLongPressUpEnd();
						}
					}}
					style={{
						zIndex: 0,
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: fullscreen ? 'rotate(-90deg)' : '',
					}}
				/>
			</div>
		</>
	);
}

export function PanControl3 ({
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
	onMove,
	className,
	arrowClass,
	isDisabled,
}) {
	const mastStyle =
		'radial-gradient(circle farthest-side at bottom right, transparent 40%, #000 40%)';
	return (
		<>
			<div
				className={twMerge(
					'rounded-full w-full h-full relative rotate-[45deg] transform-gpu bg-[#000000CC] text-[#C0C0C0]',
					className
				)}
			>
				<Sector
					onClick={() => {
						if (!isDisabled) {
							onClickUp();
						}
					}}
					maskStyle={mastStyle}
					rotateClass=''
					arrowClass={arrowClass}
				/>
				<Sector
					onClick={() => {
						if (!isDisabled) {
							onClickRight();
						}
					}}
					maskStyle={mastStyle}
					rotateClass='rotate-[90deg] transform-gpu'
					arrowClass={arrowClass}
				/>
				<Sector
					onClick={() => {
						if (!isDisabled) {
							onClickDown();
						}
					}}
					maskStyle={mastStyle}
					rotateClass='rotate-[180deg] transform-gpu'
					arrowClass={arrowClass}
				/>
				<Sector
					onClick={() => {
						if (!isDisabled) {
							onClickLeft();
						}
					}}
					maskStyle={mastStyle}
					rotateClass='rotate-[270deg] transform-gpu'
					arrowClass={arrowClass}
				/>
			</div>
			<div className={isDisabled ? 'disabled_pan-control' : ''}>
				<ReactNipple
					options={{
						mode: 'static',
						threshold: 0.7,
						size: 140,
						position: { top: '50%', left: '50%' },
					}}
					onMove={(event, data) => {
						if (fullscreen) {
							const degree = (360 - data.angle.degree) % 360;
							onMove?.(data.force, degree);
						} else {
							const degree = (450 - data.angle.degree) % 360;
							onMove?.(data.force, degree);
						}
					}}
					onDir={(event, data) => {
						if (isDisabled) {
							return;
						}
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
					onEnd={() => {
						if (!isDisabled) {
							onLongPressUpEnd();
						}
					}}
					style={{
						zIndex: 0,
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: fullscreen ? 'rotate(-90deg)' : '',
					}}
				/>
			</div>
		</>
	);
}
