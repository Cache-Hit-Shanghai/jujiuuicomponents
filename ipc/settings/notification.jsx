'use client';

import { CheckBox } from 'grommet';
import { JuJiuItem } from '../../core/core-item';
import { useJuJiuT } from '@/state/translate';
import { useState, useCallback } from 'react';
import { NotificationApi } from 'jujiu-ipc-common/api/net/notification';

const keyList = [
	{ title: '设备访问', key: 'deviceAccess' },
	{ title: '设备状态', key: 'deviceState' },
	{ title: '设备异常', key: 'deviceDeviant' },
	{ title: '设备分享', key: 'friendsShare' },
	{ title: '服务提醒', key: 'serviceAlert' },
	{ title: '公告', key: 'notice' },
];

const typekeyList = [
	{ key: 'framePeopleMove', label: '画面有人移动' },
	{ key: 'frameFaceDetection', label: '画面人脸识别结果' },
	{ key: 'nursePeopleMove', label: '看护区域有人移动' },
];

export function ChangeNotification({ data }) {
	const [notiSet, setNotiSet] = useState(() => {
		const d = {};
		keyList.map(({ key } = {}) => {
			d[key] = data[key];
		});
		return d;
	});
	const t = useJuJiuT();

	const onChange = useCallback(
		({ target: { checked, dataset } }) => {
			notiSet[dataset.key] = checked; //! state is immutable
			setNotiSet({ ...notiSet });
			NotificationApi.updateDebounce(notiSet);
		},
		[notiSet]
	);

	return keyList.map(({ title, key } = {}) => (
		<JuJiuItem key={key} label={t(title)}>
			<CheckBox toggle data-key={key} checked={notiSet[key]} onChange={onChange} />
		</JuJiuItem>
	));
}

export function ChangeAIAlarm({ data = {} }) {
	const [event, setEvent] = useState(data.aiAlarmEvent || {});
	const t = useJuJiuT();

	const onChange = useCallback(
		({ target: { checked, dataset } }) => {
			//console.log('data-key', target.dataset, target.checked);
			event[dataset.key] = checked;
			setEvent({ ...event });

			NotificationApi.updateDebounce({
				aiAlarmEvent: event,
			});
		},
		[event]
	);

	return typekeyList.map(({ key, label }) => (
		<JuJiuItem label={t(label)} key={key}>
			<CheckBox checked={event[key]} data-key={key} toggle onChange={onChange} />
		</JuJiuItem>
	));
}
