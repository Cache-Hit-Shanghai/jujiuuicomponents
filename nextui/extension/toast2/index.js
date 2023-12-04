import { Button, Card, CardBody } from '@nextui-org/react';
import { Close } from '@styled-icons/material/Close';
import { useRef } from 'react';
import { useToast } from '@react-aria/toast';
import { useToastRegion } from '@react-aria/toast';
import { useToastState } from '@react-stately/toast';
import './index.css';

function Toast({ state, ...props }) {
	const ref = useRef(null);
	const { toastProps, titleProps, closeButtonProps } = useToast(props, state, ref);

	return (
		<div
			{...toastProps}
			ref={ref}
			className='toast'
			data-animation={props.toast.animation}
			onAnimationEnd={() => {
				if (props.toast.animation === 'exiting') {
					state.remove(props.toast.key);
				}
			}}
		>
			<Card>
				<CardBody className='flex flex-row items-center'>
					<div className='text-sm' {...titleProps}>
						{props.toast.content}
					</div>
					<Button isIconOnly variant='light' radius='none' {...closeButtonProps}>
						<Close size={24} />
					</Button>
				</CardBody>
			</Card>
		</div>
	);
}

function ToastRegion({ state, ...props }) {
	const ref = useRef(null);
	const { regionProps } = useToastRegion(props, state, ref);

	return (
		<div {...regionProps} ref={ref} className='fixed flex flex-col bottom-0 inset-x-0 p-2 gap-2 z-50'>
			{state.visibleToasts.map((toast) => (
				<Toast key={toast.key} toast={toast} state={state} />
			))}
		</div>
	);
}

export function ToastProvider({ children, ...props }) {
	const state = useToastState({
		maxVisibleToasts: 5,
		// hasExitAnimation: true,
	});

	return (
		<>
			{children(state)}
			{state.visibleToasts.length > 0 && <ToastRegion {...props} state={state} />}
		</>
	);
}
