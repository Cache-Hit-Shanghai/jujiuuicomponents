import { Main } from 'grommet';

/**
 *
 * @param {import('grommet').BoxExtendedProps} props
 * @returns
 */
function IpcMain({ children, ...props }) {
	return (
		<Main flex background='background' pad='medium' {...props}>
			{children}
		</Main>
	);
}

export { IpcMain };
