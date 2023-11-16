'use client';

import { Switch, Divider } from '@nextui-org/react';
import { useJuJiuT } from '@/state/translate';

const notiKeyList = [
	{ title: '设备访问', key: 'deviceAccess' },
	{ title: '设备状态', key: 'deviceState' },
	{ title: '设备异常', key: 'deviceDeviant' },
	{ title: '设备分享', key: 'friendsShare' },
	{ title: '服务提醒', key: 'serviceAlert' },
	{ title: '公告', key: 'notice' },
];

const notiTypeKeyList = [
	{ key: 'framePeopleMove', title: '画面有人移动' },
	{ key: 'frameFaceDetection', title: '画面人脸识别结果' },
	{ key: 'nursePeopleMove', title: '看护区域有人移动' },
];

export function ChangeNotification({ list = notiKeyList, data = {}, onChange = () => {} }) {
	const t = useJuJiuT();

	return list.map(({ title, key } = {}, i) => (
		<>
			<Switch
				data-key={key}
				checked={data[key]}
				onChange={onChange}
				classNames={{ base: 'h-10 px-4 inline-flex flex-row-reverse w-full max-w-md justify-between' }}
			>
				{t(title)}
			</Switch>
			{i < list.length - 1 && <Divider />}
		</>
	));
}

export function ChangeAIAlarm({ list = notiTypeKeyList, ...props }) {
	return <ChangeNotification list={list} {...props}></ChangeNotification>;
}

export { notiKeyList, notiTypeKeyList };
