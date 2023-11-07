'use client';

import { Text, Box, Tag } from 'grommet';
import { Pets } from '@styled-icons/material-outlined/Pets';
import { useJuJiuT } from '@/state/translate';

export function IpcLogo() {
	const t = useJuJiuT();
	return (
		<Box direction='row' align='center' gap='small' focusIndicator={false}>
			<Pets size='48' />
			<Text size='xxlarge' weight='bold' color='text-strong'>
				{t('小皮部落')}
			</Text>
		</Box>
	);
}

export function AppLogo() {
	const t = useJuJiuT();
	return (
		<Box gap='large'>
			<Box direction='row' align='center' justify='center' gap='small'>
				<IpcLogo />
			</Box>
			<Box align='center'>
				<Text>{t('slogan')}</Text>
				<Box direction='row' gap='small' align='center'>
					<Text size='small'>
						Powered by {t('光方云')}
						<sup>&reg;</sup>
					</Text>
					<Tag value='IPv6' border={false} size='xsmall' background='accent-4' />
				</Box>
			</Box>
		</Box>
	);
}

export function AppMark() {
	const t = useJuJiuT();
	return (
		<Box flex={false} align='center' margin='large'>
			<Box direction='row' gap='small' align='center'>
				<Text size='large'>
					{t('小皮部落')}
					<sup>&reg;</sup>
				</Text>
			</Box>
			<Text size='xsmall'>&copy;2021-2023 {t('上海光方迅视科技有限公司版权所有')}</Text>
		</Box>
	);
}
