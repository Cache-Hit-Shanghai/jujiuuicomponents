export const CollapseContent = ({ fill = 'currentColor', filled, size, height, width, label, ...props }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={size || width || 24}
		height={size || height || 24}
		viewBox='0 -960 960 960'
		fill={fill}
		{...props}
	>
		<path d='M440-440v240h-80v-160H200v-80h240Zm160-320v160h160v80H520v-240h80Z' />
	</svg>
);
