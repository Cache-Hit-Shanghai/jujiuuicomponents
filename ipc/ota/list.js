'use client';

import { List, Box, Text } from 'grommet';
import { JJIconWebcam } from './../icons';
import { ButtonLink } from '../../core/core-ui';
import { useJuJiuT } from '@/state/translate';

function OtaDeviceList({ parseSize = (v) => v, data = [], basePath = '' }) {
	const t = useJuJiuT();

	return (
		<List data={data}>
			{({ _id, desc, usn, currentVersion, upgradeVersion, upgradeSize, updateLog }) => (
				<Box direction='row' gap='small' align='center' justify='between'>
					<Box direction='row' gap='small' align='center'>
						<JJIconWebcam size='large' />
						<Box>
							<Text>{desc}</Text>
							<Text size='small' color='text-xweak'>
								{parseSize(upgradeSize)}
							</Text>
							<Text size='small' color='text-xweak'>
								{currentVersion} ~ {upgradeVersion}
							</Text>
						</Box>
					</Box>
					<Box>
						<ButtonLink
							href={{
								pathname: basePath + '/ota/upgrade-info',
								query: { _id, currentVersion, upgradeVersion, updateLog },
							}}
							primary
							size='small'
							label={t('现在升级')}
						/>
					</Box>
				</Box>
			)}
		</List>
	);
}

export { OtaDeviceList };
