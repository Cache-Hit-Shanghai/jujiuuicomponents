'use client';

import { Grommet, grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { StyledComponentsRegistry } from './registry';

const myTheme = deepMerge(grommet, {
	global: {
		font: {
			family: `-apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif`,
		},
	},
});

function GrommetRoot({ themeMode, children }) {
	return (
		<StyledComponentsRegistry>
			<Grommet full theme={myTheme} themeMode={themeMode} options={{ box: { cssGap: true } }}>
				{children}
			</Grommet>
		</StyledComponentsRegistry>
	);
}

export default GrommetRoot;
export { GrommetRoot };
