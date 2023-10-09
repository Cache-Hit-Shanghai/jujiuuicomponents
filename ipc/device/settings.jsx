'use client';

import {
	CheckBox,
	Box,
	Text,
	RadioButtonGroup,
	RangeInput,
	Button,
	Heading,
	TextArea,
	Collapsible,
	TextInput,
} from 'grommet';
import { useState } from 'react';
import { JuJiuItemButton, JuJiuItem } from '../../core/core-item';
import { JuJiuLayer } from '../../core/core-ui';
import { useJuJiuT } from '@/state/translate';

function LabeledCheckBox({ label }) {
	return (
		<CheckBox>
			{({ checked }) => (
				<Box
					border
					round='full'
					width='40px'
					height='40px'
					align='center'
					justify='center'
					background={checked ? 'brand' : undefined}
				>
					<Text>{label}</Text>
				</Box>
			)}
		</CheckBox>
	);
}

function SleepSettings() {
	const t = useJuJiuT();
	const [sleep, setSleep] = useState(false);
	const [duration, setDuration] = useState(false);

	return (
		<>
			<JuJiuItem label={t('休眠')}>
				<CheckBox toggle checked={sleep} onChange={(e) => setSleep(e.target.checked)} />
			</JuJiuItem>
			{!sleep && (
				<>
					<JuJiuItem label={t('休眠计划')}>
						<CheckBox toggle checked={duration} onChange={(e) => setDuration(e.target.checked)} />
					</JuJiuItem>
					<Collapsible open={duration}>
						<Box gap='medium'>
							<JuJiuItem label={t('开始时间')}>
								<Box>
									<TextInput plain='full' placeholder='hh:mm' width='xsmall' size='small' textAlign='end' />
								</Box>
							</JuJiuItem>
							<JuJiuItem label={t('结束时间')}>
								<Box>
									<TextInput plain='full' placeholder='hh:mm' width='xsmall' size='small' textAlign='end' />
								</Box>
							</JuJiuItem>
							<JuJiuItem>
								<LabeledCheckBox label={t('日')} />
								<LabeledCheckBox label={t('一')} />
								<LabeledCheckBox label={t('二')} />
								<LabeledCheckBox label={t('三')} />
								<LabeledCheckBox label={t('四')} />
								<LabeledCheckBox label={t('五')} />
								<LabeledCheckBox label={t('六')} />
							</JuJiuItem>
						</Box>
					</Collapsible>
				</>
			)}
		</>
	);
}

export function DeviceSettings() {
	const t = useJuJiuT();
	const [openAvata, setOpenAvata] = useState(false);
	const [openName, setOpenName] = useState(false);
	const [volume, setVolume] = useState(50);
	const [openVolume, setOpenVolume] = useState(false);

	return (
		<>
			<JuJiuItemButton label={t('设备名称')} value='办3' onClick={() => setOpenAvata(!openAvata)} />
			<JuJiuItemButton label={t('设备分组')} value='办公室' onClick={() => setOpenName(!openName)} />
			{openAvata && (
				<JuJiuLayer onClickOutside={() => setOpenAvata(false)}>
					<Heading level={3} alignSelf='center' margin='none'>
						{t('修改设备名称')}
					</Heading>
					<TextArea value='客3' />
					<Button label={t('保存')} primary onClick={() => setOpenAvata(false)} />
				</JuJiuLayer>
			)}
			{openName && (
				<JuJiuLayer onClickOutside={() => setOpenName(false)}>
					<Heading level={3} alignSelf='center' margin='none'>
						{t('更改设备分组')}
					</Heading>
					<RadioButtonGroup name='deficegroup' options={['办公室', t('默认分组')]} value='办公室' />
				</JuJiuLayer>
			)}
			<JuJiuItem label={t('人形追踪')}>
				<CheckBox toggle />
			</JuJiuItem>
			<JuJiuItem label={t('视频水印(OSD)')}>
				<CheckBox toggle />
			</JuJiuItem>
			<JuJiuItem label={t('画面翻转')}>
				<CheckBox toggle />
			</JuJiuItem>
			<JuJiuItem label={t('设备语音提示')}>
				<CheckBox toggle />
			</JuJiuItem>
			<JuJiuItemButton label={t('设备音量')} value={volume} onClick={() => setOpenVolume(!openVolume)} />
			{openVolume && (
				<JuJiuLayer onClickOutside={() => setOpenVolume(false)}>
					<Heading level={3} alignSelf='center' margin='none'>
						{`${t('设备音量')} (${volume})`}
					</Heading>
					<Box pad='large'>
						<RangeInput value={volume} onChange={(e) => setVolume(e.target.value)} />
					</Box>
				</JuJiuLayer>
			)}
			<JuJiuItem label={t('设备状态灯')}>
				<CheckBox toggle />
			</JuJiuItem>
			<JuJiuItem label={t('云台位置校准')}>
				<Button primary size='small' label={t('校准')} />
			</JuJiuItem>
			<SleepSettings />
			<Button label={t('重启设备')} color='status-warning' />
			<Button label={t('删除设备')} color='status-critical' />
		</>
	);
}
