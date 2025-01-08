import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import './index.scss';

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
