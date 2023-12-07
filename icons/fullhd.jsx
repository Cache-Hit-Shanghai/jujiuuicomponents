export const FullHd = ({ fill = 'currentColor', filled, size, height, width, label, ...props }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={size || width || 24}
		height={size || height || 24}
		viewBox='0 -960 960 960'
		fill={fill}
		{...props}
	>
		<path d='M380-360h60v-80h60v80h60v-240h-60v100h-60v-100h-60v240Zm220 0h140q17 0 28.5-11.5T780-400v-160q0-17-11.5-28.5T740-600H600v240Zm60-60v-120h60v120h-60Zm-480 60h60v-80h80v-60h-80v-40h100v-60H180v240Zm-60 200q-33 0-56.5-23.5T40-240v-480q0-33 23.5-56.5T120-800h720q33 0 56.5 23.5T920-720v480q0 33-23.5 56.5T840-160H120Zm0-80h720v-480H120v480Zm0 0v-480 480Z' />
	</svg>
);
