export const ExpandContent = ({ fill = 'currentColor', filled, size, height, width, label, ...props }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={size || width || 24}
		height={size || height || 24}
		viewBox='0 -960 960 960'
		fill={fill}
		{...props}
	>
		<path d='M200-200v-240h80v160h160v80H200Zm480-320v-160H520v-80h240v240h-80Z' />
	</svg>
);
