import { Avatar, Text, Tag, Box, Button, DropButton, RangeInput } from 'grommet';
import { Volume, VolumeLow, VolumeMute, CaretLeftFill } from 'grommet-icons';
import { FlashlightOn } from '@styled-icons/material-rounded/FlashlightOn';
import { FlashlightOff } from '@styled-icons/material-rounded/FlashlightOff';
import { useState } from 'react';
import { ButtonLink } from './core/core-ui';
import { IpcLogo } from './ipc/about/brand';
import { useJuJiuT } from '@/state/translate';
import styles from './components.module.css';

export function AppLogo() {
	const t = useJuJiuT();
	return (
		<Box gap='large'>
			<Box direction='row' align='center' justify='center' gap='small'>
				<IpcLogo />
			</Box>
			<Box align='center'>
				<Text>{t('全球领先的Web视觉系统')}</Text>
				<Box direction='row' gap='small' align='center'>
					<Text size='small'>
						Powered by {t('雎鸠云')}
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
					{t('雎鸠云视觉')}
					<sup>&reg;</sup>
				</Text>
			</Box>
			<Text size='xsmall'>&copy;2021-2023 {t('上海光方迅视科技有限公司版权所有')}</Text>
		</Box>
	);
}

export function FlashLight() {
	const [on, setOn] = useState(false);
	return (
		<Button primary onClick={() => setOn(!on)}>
			<Avatar border>{on ? <FlashlightOff size='24' /> : <FlashlightOn size='24' />}</Avatar>
		</Button>
	);
}

export function VolumeControl({ showTitle = true }) {
	const [volume, setVolume] = useState(10);

	function selectIcon(volume) {
		if (volume === 0) return <VolumeMute />;
		else if (volume < 20) return <VolumeLow />;
		else return <Volume />;
	}

	return (
		<DropButton
			dropContent={
				<Box pad='small'>
					<RangeInput
						min={0}
						max={100}
						value={volume}
						onChange={(e) => setVolume(parseInt(e.target.value))}
					/>
				</Box>
			}
			dropProps={{ align: { bottom: 'top' } }}
		>
			<Box align='center'>
				{selectIcon(volume)}
				{showTitle && <Text size='small'>音量</Text>}
			</Box>
		</DropButton>
	);
}
