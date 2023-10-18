'use client';

import { Box, TextInput, Button } from 'grommet';
import { JJIconSearch } from '../icons.js';
import { useJuJiuT } from '@/state/translate';

function HelpFeedbackSearchBox({ value, onChange, onSearch }) {
	const t = useJuJiuT();

	return (
		<Box border flex={false} direction='row' align='center' margin={{ horizontal: 'small' }}>
			<TextInput
				value={value}
				onChange={({ target: { value } }) => onChange(value)}
				plain
				icon={<JJIconSearch />}
				placeholder={t('搜索问题……')}
				focusIndicator={false}
			/>
			<Box flex={false} margin='small'>
				<Button primary onClick={onSearch} size='small' label={t('搜索')} />
			</Box>
		</Box>
	);
}

export { HelpFeedbackSearchBox };
