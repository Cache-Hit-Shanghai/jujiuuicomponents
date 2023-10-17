'use client';

import { useJuJiuT } from '@/state/translate';
import { JuJiuCard, JuJiuItem } from '../../core';
import { Box, Text, CheckBox, Nav, List, Tag } from 'grommet';

function CloudStorageService({ onToggle, checked }) {
	const t = useJuJiuT();

	return (
		<JuJiuItem
			label={
				<Box>
					<Text>{t('云存储服务')}</Text>
					<Text size='small' color='text-xweak'>
						{t('云存储服务暂停后，录像将停止上传，服务有效期不会延长。')}
					</Text>
				</Box>
			}
		>
			<CheckBox onChange={onToggle} checked={checked} toggle />
		</JuJiuItem>
	);
}

function CloudStorageSets({ list }) {
	const t = useJuJiuT();

	return (
		<JuJiuCard>
			<List data={list} margin={{ vertical: 'small' }}>
				{(datum, index) => (
					<Box direction='row' gap='small' align='center' justify='between'>
						<Box direction='row' align='center' gap='small' wrap={true}>
							<Text>{datum.title}</Text>
							{index === 0 && (
								<Tag size='xsmall' background='status-ok' border={false} value={t('当前套餐')} />
							)}
						</Box>
						<Box flex={false}>
							<Text size='small' color='text-xweak'>
								{datum.start}
							</Text>
							<Text size='small' color='text-xweak'>
								{datum.end}
							</Text>
						</Box>
					</Box>
				)}
			</List>
		</JuJiuCard>
	);
}

export { CloudStorageService, CloudStorageSets };
