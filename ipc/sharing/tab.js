'use client';

import { useJuJiuT } from '@/state/translate';
import { Tab, Tabs } from 'grommet';

function SharingTabs({ sharing, shared }) {
	const t = useJuJiuT();

	return (
		<Tabs flex>
			<Tab title={t('我的分享')}>{sharing}</Tab>
			<Tab title={t('来自好友')}>{shared}</Tab>
		</Tabs>
	);
}

export { SharingTabs };
