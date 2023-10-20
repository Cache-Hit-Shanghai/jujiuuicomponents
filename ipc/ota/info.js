'use client';

import { useJuJiuT } from '@/state/translate';
import { Box, Text, Heading } from 'grommet';
import { JJIconUpdate } from '../icons';
import { ButtonLink } from '../../core';

function OtaUpgradeInfo({ device, info, basePath = '' }) {
	const { currentVersion, upgradeVersion, updateLog = '' } = info;
	const { desc, _id, usn } = device;
	const updateLogInLines = updateLog.split(/[\n\r]+/).filter((v) => v);
	const t = useJuJiuT();

	return (
		<>
			<Box margin='large' align='center'>
				<JJIconUpdate size='large' />
			</Box>
			<Box align='center'>
				<Text>
					{t('最新版本')}：{upgradeVersion}
				</Text>
				<Text>
					{t('当前版本')}：{currentVersion}
				</Text>
			</Box>
			<Box>
				<Heading level={2}>{t('更新日志')}：</Heading>
				{updateLogInLines.map((line, i) => (
					<Text key={i}>{line}</Text>
				))}
			</Box>
			<Box direction='row' justify='center'>
				<ButtonLink
					href={{ pathname: basePath + '/ota/upgrade', query: { _id, desc } }}
					primary
					label={t('现在升级')}
				/>
			</Box>
		</>
	);
}

export { OtaUpgradeInfo };
