'use client';

import { Box, Form, FormField, TextInput } from 'grommet';
import { Qr } from 'grommet-icons';
import { JuJiuInformation } from '../../core/core-ui';
import { useJuJiuT } from '@/state/translate';

export function WiFiBinding() {
	const t = useJuJiuT();
	return (
		<>
			<Box flex={false} fill='horizontal'>
				<Form>
					<FormField label={t('WiFi名称(SSID)')} />
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

export function DeviceBinding() {
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
				<Qr color='plain' size='xlarge' />
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
