import { Box, Heading, Form, FormField, TextInput } from 'grommet';
import { Wifi, Qr } from 'grommet-icons';
import { JuJiuInformation } from '../../core/core-ui';

export function WiFiBinding() {
	return (
		<>
			<Box flex={false} fill='horizontal'>
				<Box direction='row' align='center' gap='small' justify='center'>
					<Wifi size='large' />
					<Heading level={2}>WiFi设置</Heading>
				</Box>
				<Form>
					<FormField label='WiFi名称(SSID)' />
					<FormField label='WiFi密码' name='password' htmlFor='password'>
						<TextInput name='password' id='password' type='password' />
					</FormField>
				</Form>
			</Box>
			<JuJiuInformation size='large' label='请输入需要网络摄像机连接的WiFi名称和密码，随后点击“下一步”。' />
		</>
	);
}

export function DeviceBinding() {
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
				label='请在听到网络摄像机“绑定设备”的提示音后，将该二维码放置在摄像机镜头前约30厘米左右，等待设备“配置成功”的提示音。'
			/>
		</>
	);
}
