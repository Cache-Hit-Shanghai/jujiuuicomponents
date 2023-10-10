'use client';

import { Text, Box, Button } from 'grommet';
import { Wifi, ChatOption, Run, Pan, Copy } from 'grommet-icons';
import { JuJiuItemText, JuJiuItemTextArray, JuJiuItem, JuJiuCollapsible } from '../../core/core-item';
import { useJuJiuT } from '@/state/translate';
import {
	JJIconWifi,
	JJIconChatOption,
	JJIconRun,
	JJIconPan,
	JJIconWifiLow,
	JJIconWifiMediem,
} from '../icons';

function DeviceCapability({ name, icon }) {
	return (
		<Box align='center' flex={false}>
			{icon}
			<Text color={'text-xweak'} size='small'>
				{name}
			</Text>
		</Box>
	);
}

const DeviceCapabilities = ({ capabilities = {} }) => {
	const t = useJuJiuT();
	const { platform, zoom, resolution, wifi, twoWaySpeech, movingDetect } = capabilities;

	return (
		<JuJiuItem label={t('设备特性')}>
			<Box wrap direction='row' gap='small' align='center' justify='end'>
				{wifi && <DeviceCapability name={'WiFi'} icon={<JJIconWifi color='text-xweak' />} />}
				{twoWaySpeech && (
					<DeviceCapability name={t('双向语音')} icon={<JJIconChatOption color='text-xweak' />} />
				)}
				{movingDetect && <DeviceCapability name={t('移动侦测')} icon={<JJIconRun color='text-xweak' />} />}
				{platform && <DeviceCapability name={t('云台')} icon={<JJIconPan color='text-xweak' />} />}
			</Box>
		</JuJiuItem>
	);
};

const WifiIcon = ({ strength = -1, ...rest }) => {
	const Icon = [JJIconWifiLow, JJIconWifiMediem, JJIconWifi][strength];
	if (!Icon) return;
	return <Icon {...rest} />;
};

function DeviceInformation({ usn, staticInfo = {}, dynamicInfo = {} }) {
	const { type = '', sn = '', capabilities = {}, desc = '' } = staticInfo;
	const {
		firmwareVersion = '',
		wifiName = '',
		wifiStrength,
		ipv4 = '',
		ipv6 = [''],
		mac = '',
		upTime = '',
	} = dynamicInfo;
	const t = useJuJiuT();

	return (
		<>
			<JuJiuItemText label={t('设备型号')} value={type} />
			<JuJiuItemText label={t('序列号')} value={sn} />
			<JuJiuCollapsible label={t('设备统一SN')}>
				<Box border pad='small' gap='small' direction='row'>
					<Text size='small' wordBreak='break-all' textAlign='justify' color='text-xweak'>
						{usn}
					</Text>
					<Button pad='none' icon={<Copy />} />
				</Box>
			</JuJiuCollapsible>
			<DeviceCapabilities {...{ capabilities }} />
			<JuJiuItemText label={t('设备固件版本')} value={firmwareVersion} />
			<JuJiuItemText
				label={t('设备当前WiFi')}
				value={wifiName}
				icon={<WifiIcon strength={wifiStrength} color='text-xweak' />}
			/>
			<JuJiuItemTextArray label={t('IP地址')} value={[ipv4, ...ipv6]} />
			<JuJiuItemText label={t('MAC地址')} value={mac} />
			<JuJiuItemText label={t('已开机')} value={upTime} />
		</>
	);
}

export { DeviceInformation };
