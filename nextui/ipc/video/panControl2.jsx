// FIXME: filename
import { twMerge } from 'tailwind-merge';
import { ArrowDropUp } from '@styled-icons/material/ArrowDropUp';

function Circle() {
	return (
		<div className='w-2/5 aspect-square rounded-full bg-default opacity-90 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' />
	);
}

function Sectors({ onClickUp, onClickDown, onClickLeft, onClickRight }) {
	return (
		<>
			<div
				className='absolute w-1/2 aspect-square rounded-tl-full origin-bottom-right flex items-center justify-center'
				style={{
					WebkitMaskImage:
						'radial-gradient(circle farthest-side at bottom right, transparent 40%, #000 40%)',
					mask: 'radial-gradient(circle farthest-side at bottom right, transparent 40%, #000 40%)',
				}}
				onClick={onClickUp}
			>
				<ArrowDropUp size={24} className='-rotate-45 transform-gpu' />
			</div>
			<div
				className='absolute w-1/2 aspect-square rounded-tl-full origin-bottom-right rotate-[90deg] transform-gpu flex items-center justify-center'
				style={{
					WebkitMaskImage:
						'radial-gradient(circle farthest-side at bottom right, transparent 40%, #000 40%)',
					mask: 'radial-gradient(circle farthest-side at bottom right, transparent 40%, #000 40%)',
				}}
				onClick={onClickRight}
			>
				<ArrowDropUp size={24} className='-rotate-45 transform-gpu' />
			</div>
			<div
				className='absolute w-1/2 aspect-square rounded-tl-full origin-bottom-right rotate-[180deg] transform-gpu flex items-center justify-center'
				style={{
					WebkitMaskImage:
						'radial-gradient(circle farthest-side at bottom right, transparent 40%, #000 40%)',
					mask: 'radial-gradient(circle farthest-side at bottom right, transparent 40%, #000 40%)',
				}}
				onClick={onClickDown}
			>
				<ArrowDropUp size={24} className='-rotate-45 transform-gpu' />
			</div>
			<div
				className='absolute w-1/2 aspect-square rounded-tl-full origin-bottom-right rotate-[270deg] transform-gpu flex items-center justify-center'
				style={{
					WebkitMaskImage:
						'radial-gradient(circle farthest-side at bottom right, transparent 40%, #000 40%)',
					mask: 'radial-gradient(circle farthest-side at bottom right, transparent 40%, #000 40%)',
				}}
				onClick={onClickLeft}
			>
				<ArrowDropUp size={24} className='-rotate-45 transform-gpu' />
			</div>
		</>
	);
}
export function PanControl2({
	onClickUp,
	onClickDown,
	onClickLeft,
	onClickRight,
	className,
}) {
	return (
		<div
			className={twMerge(
				'rounded-full w-full h-full aspect-square relative rotate-[45deg] transform-gpu bg-[#000000CC] text-[#C0C0C0]',
				className,
			)}
		>
			<Sectors
				onClickUp={onClickUp}
				onClickDown={onClickDown}
				onClickLeft={onClickLeft}
				onClickRight={onClickRight}
			/>
		</div>
	);
}
