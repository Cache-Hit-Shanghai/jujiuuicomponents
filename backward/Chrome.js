import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Modal from 'react-modal';

import './index.scss';
import { Button } from '@nextui-org/react';

export const CheckboxBackward = ({
	isSelected,
	onValueChange,
	children,
	className,
}) => {
	const handleChange = (event) => {
		onValueChange(event.target.checked);
	};

	return (
		<label className={twMerge('checkbox-container', className)}>
			<input
				type='checkbox'
				checked={isSelected}
				onChange={handleChange}
				className='checkbox-input'
			/>
			<span className='checkbox-checkmark'></span>
			{children}
		</label>
	);
};

export const SelectorModalBackward = ({
	isOpen,
	title,
	onCheck,
	onClose,
	children,
	headerClass = '',
	displayHeader = true,
	overlayStyle = {},
	contentStyle = {},
}) => {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onClose}
			style={{
				overlay: {
					minWidth: '100vw',
					height: '100vh',
					width: '100vw',
					position: 'fixed',
					padding: 20,
					backgroundColor: 'rgba(0, 0, 0, 0.4)',
					display: 'flex',
					zIndex: 999,
					...overlayStyle,
				},
				content: {
					width: '100%',
					left: 0,
					top: '30%',
					flex: 1,
					borderRadius: 24,
					border: 'none',
					bottom: 'auto',
					height: 'auto',
					...contentStyle,
				},
			}}
			shouldCloseOnOverlayClick
		>
			<div className='h-auto flex flex-col px-4'>
				{displayHeader ? (
					<div
						className={twMerge(
							'flex items-center justify-between h-11 py-2',
							headerClass
						)}
					>
						<Button
							size='sm'
							variant='light'
							className='text-[#FD9240]'
							onPress={onClose}
						>
							取消
						</Button>
						<div className='font-semibold text-[#333333]'>{title}</div>
						<Button
							size='sm'
							className={`bg-[#FD9240] text-white h-7 ${
								!onCheck ? 'bg-white' : ''
							}`}
							radius='full'
							onPress={() => onCheck?.()}
						>
							{onCheck ? '确认' : ''}
						</Button>
					</div>
				) : title ? (
					<div className='font-semibold text-[#333333] text-center h-11 p-2'>
						{title}
					</div>
				) : (
					<></>
				)}
				<div className='flex-1 my-4'>{children}</div>
			</div>
		</Modal>
	);
};

export const CommonModal = ({ children, ...props }) => {
	return (
		<SelectorModalBackward {...props} displayHeader={false}>
			{children}
		</SelectorModalBackward>
	);
};
