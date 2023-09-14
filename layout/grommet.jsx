'use client';

import { Grommet, grommet } from 'grommet';
import StyledComponentsRegistry from './registry';

export default function GrommetRoot({ children }) {
  return (
    <StyledComponentsRegistry>
      <Grommet
        full
        theme={grommet}
        themeMode='light'
        options={{ box: { cssGap: true } }}
      >
        {children}
      </Grommet>
    </StyledComponentsRegistry>
  );
}
