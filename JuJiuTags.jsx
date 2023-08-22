import { CloudUpload, StatusGoodSmall, ShareRounded } from 'grommet-icons';
import { Share } from '@styled-icons/boxicons-regular/Share';
import { JuJiuTag, JuJiuLinkTag } from './new/core_ui';


export function JuJiuTagSharing() {
  return (
    <JuJiuTag
      background='graph-0'
      icon={<ShareRounded size='small' />}
      label='分享中'
    />
  );
}

export function JuJiuTagFromShared() {
  return (
    <JuJiuTag
      background='graph-3'
      icon={<Share size='12' />}
      label='来自分享'
    />
  );
}

export function JuJiuTagCloudStorageExpired() {
  return (
    <JuJiuLinkTag
      href='/my/cloudstorage'
      background='status-error'
      icon={<CloudUpload size='small' />}
      label='云存储已过期'
    />
  );
}

export function JuJiuTagCloudStorageExpiring() {
  return (
    <JuJiuLinkTag
      href='/my/cloudstorage'
      background='status-warning'
      icon={<CloudUpload size='small' />}
      label='云存储即将过期'
    />
  );
}

export function JuJiuTagDeviceOnline() {
  return (
    <JuJiuTag
      background='light-6'
      icon={<StatusGoodSmall color='graph-1' size='small' />}
      label='在线'
    />
  );
}

export function JuJiuTagDeviceOffline() {
  return (
    <JuJiuTag
      background='light-6'
      icon={<StatusGoodSmall size='small' />}
      label='离线'
    />
  );
}