'use client';

import { CheckBox, Box, Text, RadioButtonGroup, RangeInput, Button, Collapsible, TextInput } from 'grommet';
import { useState } from 'react';
import { JuJiuItem, JuJiuCollapsible } from '../../core/core-item';
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

function DeviceNameControl() {
	const t = useJuJiuT();
	const [name, setName] = useState('办3');
	return (
		<JuJiuCollapsible label={t('设备名称')} value={name}>
			<TextInput value={name} onChange={(e) => setName(e.target.value)} />
		</JuJiuCollapsible>
	);
}

function DeviceGroupControl() {
	const t = useJuJiuT();
	const Groups = [
		{ value: 1, label: '办公室' },
		{ value: 0, label: t('默认分组') },
	];
	const [group, setGroup] = useState(1);
	return (
		<JuJiuCollapsible label={t('设备分组')} value={Groups.find((e) => e.value === group).label}>
			<Box border pad='small' gap='small'>
				<RadioButtonGroup
					name='deficegroup'
					options={Groups}
					value={group}
					onChange={(e) => setGroup(parseInt(e.target.value))}
				/>
			</Box>
		</JuJiuCollapsible>
	);
}

function ValumeControl() {
	const t = useJuJiuT();
	const [volume, setVolume] = useState(50);
	return (
		<JuJiuCollapsible label={t('设备音量')} value={volume}>
			<Box border pad='small' gap='small'>
				<RangeInput value={volume} onChange={(e) => setVolume(e.target.value)} />
			</Box>
		</JuJiuCollapsible>
	);
}

export function DeviceSettings() {
	const t = useJuJiuT();

	return (
		<>
			<DeviceNameControl />
			<DeviceGroupControl />
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
			<ValumeControl />
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
