export const FrameInspect = ({ fill = 'currentColor', filled, size, height, width, label, ...props }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={size || width || 24}
		height={size || height || 24}
		viewBox='0 -960 960 960'
		fill={fill}
		{...props}
	>
		<path d='M450-420q38 0 64-26t26-64q0-38-26-64t-64-26q-38 0-64 26t-26 64q0 38 26 64t64 26Zm193 160L538-365q-20 13-42.5 19t-45.5 6q-71 0-120.5-49.5T280-510q0-71 49.5-120.5T450-680q71 0 120.5 49.5T620-510q0 23-6.5 45.5T594-422l106 106-57 56ZM200-120q-33 0-56.5-23.5T120-200v-160h80v160h160v80H200Zm400 0v-80h160v-160h80v160q0 33-23.5 56.5T760-120H600ZM120-600v-160q0-33 23.5-56.5T200-840h160v80H200v160h-80Zm640 0v-160H600v-80h160q33 0 56.5 23.5T840-760v160h-80Z' />
	</svg>
);
