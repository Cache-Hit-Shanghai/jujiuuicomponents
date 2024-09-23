import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card, CardBody } from '@nextui-org/react';
import { Close } from '@styled-icons/material/Close';
import { useRef } from 'react';
import { useToast } from '@react-aria/toast';
import { useToastRegion } from '@react-aria/toast';
import { useToastState } from '@react-stately/toast';

function Toast({ state, ...props }) {
	const ref = useRef(null);
	const { toastProps, titleProps, closeButtonProps } = useToast(
		props,
		state,
		ref,
	);

	return (
		<motion.div
			{...toastProps}
			ref={ref}
			layout
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<Card>
				<CardBody className='flex flex-row items-center justify-between'>
					<div className='text-sm' {...titleProps}>
						{props.toast.content}
					</div>
					<Button
						isIconOnly
						variant='light'
						radius='none'
						className="text-[#F6F6F6]"
						{...closeButtonProps}
					>
						<Close size={24} />
					</Button>
				</CardBody>
			</Card>
		</motion.div>
	);
}

function ToastRegion({ state, ...props }) {
	const ref = useRef(null);
	const { regionProps } = useToastRegion(props, state, ref);

	return (
		<motion.div
			{...regionProps}
			ref={ref}
			className='fixed flex flex-col bottom-0 inset-x-0 p-2 gap-2 z-[1000] outline-none'
			layout
		>
			<AnimatePresence>
				{state.visibleToasts.map((toast) => (
					<Toast key={toast.key} toast={toast} state={state} />
				))}
			</AnimatePresence>
		</motion.div>
	);
}

export function ToastProvider({ children, ...props }) {
	const state = useToastState({
		maxVisibleToasts: 5,
	});

	return (
		<>
			{children(state)}
			{state.visibleToasts.length > 0 && (
				<ToastRegion {...props} state={state} />
			)}
		</>
	);
}
