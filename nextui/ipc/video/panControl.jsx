import { ChevronUpIcon } from '@heroicons/react/24/outline';

function Circle() {
	return (
		<div className='w-[calc(40%-1px)] aspect-square rounded-full bg-default opacity-50 absolute inset-0 m-auto' />
	);
}

function Sectors({ onClickUp, onClickDown, onClickLeft, onClickRight }) {
	return (
		<>
			<div
				className='absolute w-1/2 aspect-square rounded-tl-full origin-bottom-right bg-default opacity-50 flex items-center justify-center'
				style={{
					WebkitMaskImage: 'radial-gradient(circle farthest-side at bottom right, transparent 40%, #000 40%)',
					mask: 'radial-gradient(circle farthest-side at bottom right, transparent 40%, #000 40%)',
				}}
				onClick={onClickUp}
			>
				<ChevronUpIcon className='h-6 w-6 -rotate-45 transform-gpu' />
			</div>
			<div
				className='absolute w-1/2 aspect-square rounded-tl-full origin-bottom-right rotate-[90deg] transform-gpu bg-default opacity-50 flex items-center justify-center'
				style={{
					WebkitMaskImage: 'radial-gradient(circle farthest-side at bottom right, transparent 40%, #000 40%)',
					mask: 'radial-gradient(circle farthest-side at bottom right, transparent 40%, #000 40%)',
				}}
				onClick={onClickRight}
			>
				<ChevronUpIcon className='h-6 w-6 -rotate-45 transform-gpu' />
			</div>
			<div
				className='absolute w-1/2 aspect-square rounded-tl-full origin-bottom-right rotate-[180deg] transform-gpu bg-default opacity-50 flex items-center justify-center'
				style={{
					WebkitMaskImage: 'radial-gradient(circle farthest-side at bottom right, transparent 40%, #000 40%)',
					mask: 'radial-gradient(circle farthest-side at bottom right, transparent 40%, #000 40%)',
				}}
				onClick={onClickDown}
			>
				<ChevronUpIcon className='h-6 w-6 -rotate-45 transform-gpu' />
			</div>
			<div
				className='absolute w-1/2 aspect-square rounded-tl-full origin-bottom-right rotate-[270deg] transform-gpu bg-default opacity-50 flex items-center justify-center'
				style={{
					WebkitMaskImage: 'radial-gradient(circle farthest-side at bottom right, transparent 40%, #000 40%)',
					mask: 'radial-gradient(circle farthest-side at bottom right, transparent 40%, #000 40%)',
				}}
				onClick={onClickLeft}
			>
				<ChevronUpIcon className='h-6 w-6 -rotate-45 transform-gpu' />
			</div>
		</>
	);
}
export function PanControl({ onClickUp, onClickDown, onClickLeft, onClickRight }) {
	return (
		<div className='w-44 aspect-square relative rotate-[45deg] transform-gpu'>
			<Sectors
				onClickUp={onClickUp}
				onClickDown={onClickDown}
				onClickLeft={onClickLeft}
				onClickRight={onClickRight}
			/>
			<Circle />
		</div>
	);
}
