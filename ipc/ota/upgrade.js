'use client';

import { useJuJiuT } from '@/state/translate';
import { Heading, Box, Avatar, Text, Meter } from 'grommet';
import { JJIconWebcam } from './../icons';
import { JuJiuInformation } from '../../core';

function OtaUpgradeView({ device, progress, maxProgress, children }) {
	const { desc } = device;
	const isUpgradeOver = progress === maxProgress;

	const t = useJuJiuT();

	return (
		<>
			{!isUpgradeOver && (
				<Heading margin='none' level={2}>
					{t('固件升级中……')}
				</Heading>
			)}
			<Box align='center'>
				<Avatar background='background-front'>
					<JJIconWebcam />
				</Avatar>
				<Text>{desc}</Text>
			</Box>
			<JuJiuInformation
				label={t('摄像机正在固件升级中。请保持摄像机的电源开启。摄像机突然断电有可能导致设备无法启动。')}
			/>
			<Meter round values={[{ value: progress }]} max={maxProgress} />
			{isUpgradeOver && (
				<Box align='center' gap='medium'>
					<Text>{t('固件升级成功！设备正在重启中，请耐心等待。设备重启后即可正常使用。')}</Text>
					<Box direction='row'>{children}</Box>
				</Box>
			)}
		</>
	);
}

export { OtaUpgradeView };
