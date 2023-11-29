export const Exclamation = ({ fill = 'currentColor', filled, size, height, width, label, ...props }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={size || width || 24}
		height={size || height || 24}
		viewBox='0 -960 960 960'
		fill={fill}
		{...props}
	>
		<path d='M440-400v-360h80v360h-80Zm0 200v-80h80v80h-80Z' />
	</svg>
);
