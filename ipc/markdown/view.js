import { Markdown } from 'grommet';

/**
 *
 * @param {import('grommet').MarkdownExtendedProps} props
 * @returns
 */
function IpcMarkdown({ children, ...props }) {
	return (
		<Markdown
			components={{
				img: {
					props: {
						style: {
							width: '100%',
							objectFit: 'contain',
						},
					},
				},
			}}
			{...props}
		>
			{children}
		</Markdown>
	);
}

export { IpcMarkdown };
