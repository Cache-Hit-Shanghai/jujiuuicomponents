'use client';

import { useJuJiuT } from '@/state/translate';
import {
	Box,
	Button,
	CheckBox,
	Collapsible,
	Heading,
	RadioButtonGroup,
	RangeInput,
	Text,
	TextInput,
} from 'grommet';
import { Add, Trash } from 'grommet-icons';
import { useCallback, useState } from 'react';
import {
	JuJiuCollapsible,
	JuJiuItem,
	JuJiuRawItem,
} from '../../core/core-item';
import { JuJiuLayer } from '../../core/core-ui';

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

function SleepAddSchedule({ target }) {
	const t = useJuJiuT();
	const [openSchedule, setOpenSchedule] = useState(false);
	return (
		<>
			<Button
				primary
				icon={<Add />}
				label={t('添加时间段')}
				onClick={() => setOpenSchedule(true)}
			/>
			{openSchedule && (
				<JuJiuLayer
					onClickOutside={() => setOpenSchedule(false)}
					target={target}
				>
					<Heading level={3} margin='none' alignSelf='center'>
						{t('添加时间段')}
					</Heading>
					<JuJiuItem label={t('开始时间')}>
						<Box>
							<TextInput
								plain='full'
								placeholder='hh:mm'
								width='xsmall'
								size='small'
								textAlign='end'
							/>
						</Box>
					</JuJiuItem>
					<JuJiuItem label={t('结束时间')}>
						<Box>
							<TextInput
								plain='full'
								placeholder='hh:mm'
								width='xsmall'
								size='small'
								textAlign='end'
							/>
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
					<Button primary label={t('保存')} />
				</JuJiuLayer>
			)}
		</>
	);
}

function SleepSettings({ target, gap }) {
	const t = useJuJiuT();
	const [sleep, setSleep] = useState(false);
	const [enableSchedule, setEnableSchedule] = useState(false);

	return (
		<>
			<JuJiuItem label={t('休眠')}>
				<CheckBox
					toggle
					checked={sleep}
					onChange={(e) => setSleep(e.target.checked)}
				/>
			</JuJiuItem>
			{!sleep && (
				<>
					<JuJiuRawItem>
						<Box
							direction='row'
							align='center'
							justify='between'
							focusIndicator={false}
						>
							<Text>{t('休眠计划')}</Text>
							<CheckBox
								toggle
								checked={enableSchedule}
								onChange={(e) => setEnableSchedule(e.target.checked)}
							/>
						</Box>
						<Collapsible open={enableSchedule} flex={false}>
							<Box pad={{ top: 'small' }} gap={gap}>
								<JuJiuItem
									label={
										<Box>
											<Text>8:00 - 15:00</Text>
											<Text size='small' color='text-xweak'>
												{`${t('周一')} ${t('周二')} ${t('周三')}`}
											</Text>
										</Box>
									}
								>
									<Button icon={<Trash />} />
								</JuJiuItem>
								<JuJiuItem
									label={
										<Box>
											<Text>00:00 - 05:00</Text>
											<Text size='small' color='text-xweak'>
												{`${t('周一')} ${t('周二')} ${t('周三')} ${t('周四')} ${t(
													'周五',
												)} ${t('周六')} ${t('周日')}`}
											</Text>
										</Box>
									}
								>
									<Button icon={<Trash />} />
								</JuJiuItem>
								<SleepAddSchedule target={target} />
							</Box>
						</Collapsible>
					</JuJiuRawItem>
				</>
			)}
		</>
	);
}

function DeviceNameControl({ gap, desc = '', onSave = () => {} }) {
	const t = useJuJiuT();
	const [name, setName] = useState(desc);

	const onSaveClick = useCallback(() => {
		onSave(name);
	}, [name]);

	return (
		<JuJiuCollapsible label={t('设备名称')} value={name} gap={gap}>
			<TextInput value={name} onChange={(e) => setName(e.target.value)} />
			<Button primary label={t('保存')} onClick={onSaveClick} />
		</JuJiuCollapsible>
	);
}

const defaultUserDeviceGroupName = '默认分组';

function DeviceGroupControl({ Groups = [], Group = '', onChange = () => {} }) {
	const t = useJuJiuT();
	const getTg = useCallback((g) => {
		return g === defaultUserDeviceGroupName ? t(defaultUserDeviceGroupName) : g;
	}, []);

	const [group, setGroup] = useState(getTg(Group));
	return (
		<JuJiuCollapsible label={t('设备分组')} value={group}>
			<Box gap='small'>
				<RadioButtonGroup
					name='deficegroup'
					options={Groups.map(getTg)}
					value={group}
					onChange={(e) => {
						const g = getTg(e.target.value);

						setGroup(g);
						const net =
							g === t(defaultUserDeviceGroupName)
								? {
										handle: 'removeFromGroup',
										config: {
											query: {
												name: encodeURIComponent(Group),
											},
										},
										key: 'query',
										message: '',
									}
								: {
										handle: 'addToGroup',
										config: {
											body: {
												name: encodeURIComponent(g),
											},
										},
										key: 'body',
									};
						onChange(net);
					}}
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
				<RangeInput
					value={volume}
					onChange={(e) => setVolume(e.target.value)}
				/>
			</Box>
		</JuJiuCollapsible>
	);
}

const DevicesSettingList = [
	{
		ui: 'Toggle',
		props: { labelKey: '宠物追踪', settingKey: 'humanoidTracking' },
	},
	{
		ui: 'Toggle',
		props: { labelKey: '视频水印(OSD)', settingKey: 'videoWatermarkOsd' },
	},
	{
		ui: 'Toggle',
		props: { labelKey: '画面翻转', settingKey: 'flipPicture' },
	},
	{
		ui: 'Toggle',
		props: { labelKey: '设备语音提示', settingKey: 'voicePrompts' },
	},
	{
		ui: 'RangeInputCollapsible',
		props: { labelKey: '设备音量', settingKey: 'volume' },
	},
	{
		ui: 'Toggle',
		props: { labelKey: '设备状态灯', settingKey: 'statusLight' },
	},
	{
		ui: 'CommandItemButton',
		props: {
			labelKey: '云台位置校准',
			commandKey: 'calibratePlatform',
			command: 'calibrate_platform',
			operLabelKey: '校准',
		},
	},
	{
		ui: 'Sleep',
		props: {},
	},
	{
		ui: 'CommandButton',
		props: {
			labelKey: '重启设备',
			commandKey: 'reboot',
			command: 'reboot',
			order: 99,
		},
	},
];

export function DeviceSettings({
	target,
	gap,
	JuJiuUI = {},
	nameProps = {},
	groupProps = {},
	onDeviceDelete = () => {},
}) {
	const t = useJuJiuT();

	return (
		<>
			<DeviceNameControl gap={gap} {...nameProps} />
			<DeviceGroupControl {...groupProps} />
			{DevicesSettingList.map(({ props = {}, ui = '' }, index) => {
				const Component = JuJiuUI[ui] || (() => null);

				[
					{ tk: 'labelKey', k: 'label' },
					{ tk: 'operLabelKey', k: 'operLabel' },
				].map(({ tk, k }) => {
					props[tk] && Object.assign(props, { [k]: t(props[tk]) });
				});
				ui === 'Sleep' && (props.target = target);

				return <Component key={index} {...props}></Component>;
			})}

			<Button
				style={{ order: 100 }}
				label={t('删除设备')}
				color='status-critical'
				onClick={onDeviceDelete}
			/>
		</>
	);
}

export { defaultUserDeviceGroupName };
