import { Layer, Box } from 'grommet';

export function JuJiuLayer({ onClickOutside, children, ...props }) {
  return (
    <Layer position='bottom' full='horizontal' responsive={false} onClickOutside={onClickOutside}>
      <Box fill round pad='medium' gap='medium' background='background-front' {...props}>
        {children}
      </Box>
    </Layer>
  );
}