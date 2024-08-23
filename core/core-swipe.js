import React, { useState } from 'react';

function SwipeComponent({ children, handleLeftSwipe , handleRightSwipe}) {
	const [startX, setStartX] = useState(0);
	const [startY, setStartY] = useState(0);
	const [currentX, setCurrentX] = useState(0);

	const handleTouchStart = (e) => {
		setStartX(e.touches[0].clientX);
		setStartY(e.touches[0].clientY);
	};

	const handleTouchMove = (e) => {
		e.preventDefault();

		const moveX = e.touches[0].clientX - startX;
		const moveY = e.touches[0].clientY - startY;

		if (Math.abs(moveX) > Math.abs(moveY) * 2) {
			setCurrentX(moveX);
		} else {
			setCurrentX(0);
		}
	};

	const handleTouchEnd = (e) => {
		if (Math.abs(currentX) > 50) {
			if (currentX < 0) {
				handleLeftSwipe()
			} else {
				handleRightSwipe()
			}
		}

		setStartX(0);
		setStartY(0);
		setCurrentX(0);
	};

	return (
		<div
			className='swipe-container'
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
		>
			<div className='swipe-content'>{children}</div>
		</div>
	);
}

export default SwipeComponent;
