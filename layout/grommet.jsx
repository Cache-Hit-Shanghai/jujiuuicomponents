'use client';

import { Grommet, grommet } from 'grommet';
import { StyledComponentsRegistry } from './registry';

function GrommetRoot({ themeMode, children }) {
	return (
		<StyledComponentsRegistry>
			<Grommet full theme={grommet} themeMode={themeMode} options={{ box: { cssGap: true } }}>
				{children}
			</Grommet>
		</StyledComponentsRegistry>
	);
}

export default GrommetRoot;
export { GrommetRoot };
