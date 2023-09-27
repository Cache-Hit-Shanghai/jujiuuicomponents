import { Text, Box } from 'grommet';
import { CreativeCommons } from 'grommet-icons';
import { useJuJiuT } from '@/state/translate';

export function IpcLogo({ size = 'medium' }) {
	const t = useJuJiuT();
	return (
		<Box direction='row' align='center' gap='small' focusIndicator={false}>
			<CreativeCommons size='large' color='text-strong' />
			<Text size='xxlarge' weight='bold' color='text-strong'>
				{t('雎鸠云视觉')}
			</Text>
		</Box>
	);
}
