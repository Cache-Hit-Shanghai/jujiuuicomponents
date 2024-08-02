'use client';

import { Divider, Switch } from '@nextui-org/react';
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

export function ChangeNotification({
	list = notiKeyList,
	data = {},
	onChange = () => {},
}) {
	const t = useJuJiuT();

	return list.map(({ title, key } = {}, i) => (
		<>
			<Switch
				key={key}
				data-key={key}
				defaultSelected={data[key]}
				onValueChange={(checked) => onChange({ key, checked })}
				classNames={{
					base: 'h-[54px] inline-flex  flex-row-reverse w-full max-w-full justify-between text-base font-semibold',
				}}
			>
				{t(title)}
			</Switch>
			{i < list.length - 1 && (
				<Divider
					className='bg-[#858585] w-full'
					style={{
						opacity: 0.15,
					}}
				/>
			)}
		</>
	));
}

export function ChangeAIAlarm({ list = notiTypeKeyList, ...props }) {
	return <ChangeNotification list={list} {...props} />;
}

export { notiKeyList, notiTypeKeyList };
