import { Button } from '@nextui-org/react';
import { Close } from '@styled-icons/material/Close';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

const PositionMap = new Map([
	['top', 'top-0'],
	['center', 'inset-y-0 h-fit mx-2 my-auto'],
	['bottom', 'bottom-0'],
]);

export function Toast({ isOpen, onClose, message, startContent, position = 'bottom', duration = 5000 }) {
	useEffect(() => {
		if (isOpen && duration) {
			const tid = setTimeout(onClose, duration);
			return () => clearTimeout(tid);
		}
	}, [isOpen, duration]);

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ y: '150%' }}
					animate={{ y: 0 }}
					exit={{ y: '150%' }}
					className={twMerge(
						'fixed z-[1000] rounded-medium inset-x-0 bg-default p-3 m-2 text-sm flex flex-row items-center gap-2',
						PositionMap.get(position),
					)}
				>
					{startContent}
					<div className='flex-1'>{message}</div>
					<Button isIconOnly variant='light' onPress={onClose}>
						<Close size={24} />
					</Button>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
