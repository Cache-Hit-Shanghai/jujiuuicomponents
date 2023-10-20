'use client';

import { ButtonLink } from '../../core';
import { JJIconWebcam } from '../icons';
import { useJuJiuT } from '@/state/translate';
import { Card, CardBody, Box, Text } from 'grommet';

function OtaDeviceCard({ device, otaInfo, parseSize = (v) => v, basePath = '' }) {
	const { _id, desc } = device;
	const { currentVersion, upgradeVersion, upgradeSize = 0, updateLog } = otaInfo;

	const t = useJuJiuT();

	return (
		<Card pad='medium' gap='medium' background='background-contrast' flex={false}>
			<CardBody direction='row' align='center' justify='evenly' gap='small'>
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
				<Box width={'100px'}>
					{upgradeVersion && (
						<ButtonLink
							href={{
								pathname: basePath + '/ota/upgrade-info',
								query: { _id, desc, currentVersion, upgradeVersion, updateLog },
							}}
							primary
							size='small'
							label={t('现在升级')}
						/>
					)}
				</Box>
			</CardBody>
		</Card>
	);
}

export { OtaDeviceCard };
