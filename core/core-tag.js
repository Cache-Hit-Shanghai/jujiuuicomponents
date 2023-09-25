import { CloudUpload, StatusGoodSmall, ShareRounded, UserNew } from 'grommet-icons';
import { Share } from '@styled-icons/boxicons-regular/Share';
import { JuJiuTag, JuJiuLinkTag } from './core-ui';
import { useJuJiuT } from '@/state/translate';

export function JuJiuTagSharing() {
	const t = useJuJiuT();
	return <JuJiuTag background='graph-0' icon={<ShareRounded size='small' />} label={t('分享中')} />;
}

export function JuJiuTagFromShared() {
	const t = useJuJiuT();
	return <JuJiuTag background='graph-3' icon={<Share size='12' />} label={t('来自分享')} />;
}

export function JuJiuTagCloudStorageExpired() {
	const t = useJuJiuT();
	return (
		<JuJiuLinkTag
			href='/my/cloudstorage'
			background='status-error'
			icon={<CloudUpload size='small' />}
			label={t('云存储已过期')}
		/>
	);
}

export function JuJiuTagCloudStorageExpiring() {
	const t = useJuJiuT();
	return (
		<JuJiuLinkTag
			href='/my/cloudstorage'
			background='status-warning'
			icon={<CloudUpload size='small' />}
			label={t('云存储即将过期')}
		/>
	);
}

export function JuJiuTagDeviceOnline() {
	const t = useJuJiuT();
	return (
		<JuJiuTag
			background='light-6'
			icon={<StatusGoodSmall color='graph-1' size='small' />}
			label={t('在线')}
		/>
	);
}

export function JuJiuTagDeviceOffline() {
	const t = useJuJiuT();
	return <JuJiuTag background='light-6' icon={<StatusGoodSmall size='small' />} label={t('离线')} />;
}

export function JuJiuTagAccountNotBinding() {
	const t = useJuJiuT();
	return <JuJiuTag background='status-critical' icon={<UserNew size='small' />} />;
}
