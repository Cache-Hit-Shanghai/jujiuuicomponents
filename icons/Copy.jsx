const CopyIcon = (props) => {
	return (
		<svg
			width={16}
			height={20}
			viewBox='0 0 16 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<rect
				x={0.75}
				y={3.75}
				width={11.5}
				height={15.5}
				rx={2.25}
				stroke='black'
				strokeWidth={1.5}
			/>
			<path
				d='M4 1H13C14.1046 1 15 1.89543 15 3V15'
				stroke='black'
				strokeWidth={1.5}
				strokeMiterlimit={3.8637}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default CopyIcon;
