'use client';

import { Grommet, grommet } from 'grommet';
import StyledComponentsRegistry from './registry';

export default function GrommetRoot({ themeMode, children }) {
	console.log(themeMode);
	return (
		<StyledComponentsRegistry>
			<Grommet full theme={grommet} themeMode={themeMode} options={{ box: { cssGap: true } }}>
				{children}
			</Grommet>
		</StyledComponentsRegistry>
	);
}
