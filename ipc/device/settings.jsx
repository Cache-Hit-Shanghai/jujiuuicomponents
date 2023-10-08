'use client';

import { CheckBox, Box, RadioButtonGroup, RangeInput, Button, Heading, TextArea } from 'grommet';
import { useState } from 'react';
import { JuJiuItemButton, JuJiuItem, JuJiuItemLink } from '../../core/core-item';
import { IconBack, JuJiuMain, JuJiuLayer } from '../../core/core-ui';
import { useJuJiuT } from '@/state/translate';

export function DeviceSettings() {
	const t = useJuJiuT();
	const [openAvata, setOpenAvata] = useState(false);
	const [openName, setOpenName] = useState(false);
	const [volumn, setVolumn] = useState(50);
	const [openVolumn, setOpenVolumn] = useState(false);

	return (
		<>
			<JuJiuItemButton label='设备名称' value='办3' onClick={() => setOpenAvata(!openAvata)} />
			<JuJiuItemButton label='分组' value='办公室' onClick={() => setOpenName(!openName)} />
			{openAvata && (
				<JuJiuLayer onClickOutside={() => setOpenAvata(false)}>
					<Heading level={3} alignSelf='center' margin='none'>
						修改设备名称
					</Heading>
					<TextArea value='客3' />
					<Button label='保存' primary onClick={() => setOpenAvata(false)} />
				</JuJiuLayer>
			)}
			{openName && (
				<JuJiuLayer onClickOutside={() => setOpenName(false)}>
					<Heading level={3} alignSelf='center' margin='none'>
						更改设备分组
					</Heading>
					<RadioButtonGroup name='deficegroup' options={['办公室', '默认分组']} value='办公室' />
					<Button label='保存' primary />
				</JuJiuLayer>
			)}
			<JuJiuItem label='启用人形追踪'>
				<CheckBox toggle />
			</JuJiuItem>
			<JuJiuItem label='设备语音提示'>
				<CheckBox toggle />
			</JuJiuItem>
			<JuJiuItemButton label='设备音量' value={volumn} onClick={() => setOpenVolumn(!openVolumn)} />
			{openVolumn && (
				<JuJiuLayer onClickOutside={() => setOpenVolumn(false)}>
					<Heading level={3} alignSelf='center' margin='none'>
						{`设备音量(${volumn})`}
					</Heading>
					<Box pad='large'>
						<RangeInput value={volumn} onChange={(e) => setVolumn(e.target.value)} />
					</Box>
				</JuJiuLayer>
			)}
			<JuJiuItem label='视频水印(OSD)'>
				<CheckBox toggle />
			</JuJiuItem>
			<JuJiuItem label='画面翻转'>
				<CheckBox toggle />
			</JuJiuItem>
			<JuJiuItem label='设备状态灯'>
				<CheckBox toggle />
			</JuJiuItem>
			<JuJiuItem label='云台位置校准'>
				<Button primary size='small' label='校准' />
			</JuJiuItem>
			<JuJiuItem label='休眠'>
				<CheckBox toggle />
			</JuJiuItem>
			<JuJiuItemLink label='休眠计划' href='/device/settings/dormantPlan' />
		</>
	);
}
