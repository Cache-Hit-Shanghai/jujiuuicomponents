import { twMerge } from 'tailwind-merge';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@nextui-org/react';
import { Close } from '@styled-icons/material/Close';

const PositionMap = new Map([
	['top', 'top-0'],
	['center', 'inset-y-0 h-fit mx-2 my-auto'],
	['bottom', 'bottom-0'],
]);

export function Toast({ isOpen, onClose, message, startContent, position = 'bottom', duration = 5000 }) {
	let timerId;
	useEffect(() => {
		timerId = isOpen && setTimeout(onClose, duration);
	}, [isOpen]);

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ y: '200%' }}
					animate={{ y: 0 }}
					exit={{ y: '200%' }}
					className={twMerge(
						'absolute z-50 rounded-full inset-x-0 bg-default p-3 m-2 text-sm flex flex-row items-center gap-2',
						PositionMap.get(position)
					)}
				>
					{startContent}
					<div className='flex-1'>{message}</div>
					{
						<Button
							isIconOnly
							variant='light'
							onPress={() => {
								clearTimeout(timerId);
								onClose();
							}}
						>
							<Close size={24} />
						</Button>
					}
				</motion.div>
			)}
		</AnimatePresence>
	);
}
