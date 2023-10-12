'use client';

import { Box, Form, FormField, TextInput, Avatar, Button } from 'grommet';
import { Qr } from 'grommet-icons';
import { FlashlightOn } from '@styled-icons/material-rounded/FlashlightOn';
import { FlashlightOff } from '@styled-icons/material-rounded/FlashlightOff';
import { JuJiuInformation } from '../../core/core-ui';
import { useJuJiuT } from '@/state/translate';
import { useState } from 'react';

function useFlexibleControlState(value, setValue, init) {
	const localState = useState(init);
	if (value === undefined && setValue === undefined) return localState;
	return [value, setValue];
}

export function WiFiBinding({ value, setValue }) {
	const t = useJuJiuT();
	const [_value, _setValue] = useFlexibleControlState(value, setValue, {});

	return (
		<>
			<Box flex={false} fill='horizontal'>
				<Form value={_value} onChange={(nextValue) => _setValue(nextValue)}>
					<FormField label={t('WiFi名称(SSID)')} name='ssid' />
					<FormField label={t('密码')} name='password' htmlFor='password'>
						<TextInput name='password' id='password' type='password' />
					</FormField>
				</Form>
			</Box>
			<JuJiuInformation
				size='large'
				label={t('请输入需要网络摄像机连接的WiFi名称和密码，随后点击“下一步”。')}
			/>
		</>
	);
}

export function DeviceBinding({ code = <Qr color='plain' size='xlarge' /> }) {
	const t = useJuJiuT();

	return (
		<>
			<Box
				fill='horizontal'
				height='medium'
				background='light-6'
				align='center'
				justify='center'
				flex={false}
			>
				{code}
			</Box>
			<JuJiuInformation
				size='large'
				label={t(
					'请在听到网络摄像机“绑定设备”的提示音后，将该二维码放置在摄像机镜头前约30厘米左右，等待设备“配置成功”的提示音。'
				)}
			/>
		</>
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
