export const Wifi3 = ({
	fill = 'currentColor',
	filled,
	size,
	height,
	width,
	label,
	needShadow,
	...props
}) => (
	<svg
		width='24'
		height='24'
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		style={needShadow ? { filter: 'url(#shadow)' } : {}}
	>
		{needShadow && (
			<defs>
				<filter id='shadow' x='-50%' y='-50%' width='200%' height='200%'>
					<feDropShadow
						dx='3'
						dy='3'
						stdDeviation='3'
						floodColor='black'
						flood-opacity='0.5'
					/>
				</filter>
			</defs>
		)}
		<g id='Wifi (&#230;&#151;&#160;&#231;&#186;&#191;&#231;&#189;&#145;&#231;&#187;&#156;)'>
			<path
				id='Vector'
				d='M2 9.48265C2.2944 9.20365 2.59761 8.9393 2.9087 8.6896C8.51855 4.18711 16.6911 4.45146 22 9.48265'
				stroke='currentColor'
				strokeOpacity='0.2'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				id='Vector_2'
				d='M19 12.8995C15.134 9.0335 8.866 9.0335 5 12.8995'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				id='Vector_3'
				d='M16 16.1569C13.7908 13.9477 10.2092 13.9477 8 16.1569'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				id='Vector_4'
				fillRule='evenodd'
				clipRule='evenodd'
				d='M12 20C12.6904 20 13.25 19.4404 13.25 18.75C13.25 18.0597 12.6904 17.5 12 17.5C11.3097 17.5 10.75 18.0597 10.75 18.75C10.75 19.4404 11.3097 20 12 20Z'
				fill='currentColor'
			/>
		</g>
	</svg>
);
