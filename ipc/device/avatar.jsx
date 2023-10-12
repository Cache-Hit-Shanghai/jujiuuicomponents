'use client';

import {
	Text,
	Box,
	Card,
	CardBody,
	CardFooter,
	Menu,
	Image,
	Button,
	Layer,
	Stack,
	CheckBox,
	ResponsiveContext,
} from 'grommet';
import {
	Pan,
	More,
	Camera,
	ZoomIn,
	Volume,
	Calendar,
	Checkmark,
	VolumeMute,
	ContactInfo,
	Transaction,
	ShareRounded,
	ClosedCaption,
	CaretLeftFill,
	CircleInformation,
} from 'grommet-icons';
import { useState, useContext } from 'react';
import { SettingsOutline } from '@styled-icons/evaicons-outline/SettingsOutline';
import { Call } from '@styled-icons/fluentui-system-regular/Call';
import { CallDismiss } from '@styled-icons/fluentui-system-regular/CallDismiss';
import { Record } from '@styled-icons/fluentui-system-regular/Record';
import { RecordStop } from '@styled-icons/fluentui-system-regular/RecordStop';
import {
	JuJiuTagDeviceOnline,
	JuJiuTagDeviceOffline,
	JuJiuTagCloudStorageExpiring,
	JuJiuTagCloudStorageExpired,
} from '../../core/core-tag';
import Link, { useJuJiuT } from '@/state/translate';

function LinkOrNone({ url, children }) {
	if (url) {
		return (
			<Link href={url} passHref legacyBehavior>
				{children}
			</Link>
		);
	} else {
		return <>{children}</>;
	}
}

function IpcCardMenuMobile({ type }) {
	const t = useJuJiuT();

	return (
		<Menu
			dropProps={{ align: { top: 'bottom', right: 'right' } }}
			icon={<More />}
			items={[
				{
					label: (
						<Link href='/device/settings' passHref legacyBehavior>
							<Text>{t('设备设置')}</Text>
						</Link>
					),
					icon: (
						<Box margin={{ right: 'small' }}>
							<SettingsOutline size='24' />
						</Box>
					),
				},
				{
					label: (
						<Link href='/device/information' passHref legacyBehavior>
							<Text>{t('设备信息')}</Text>
						</Link>
					),
					icon: (
						<Box margin={{ right: 'small' }}>
							<CircleInformation />
						</Box>
					),
				},
				{
					label: (
						<Link href='/device/sharing' passHref legacyBehavior>
							<Text>{t('设备分享')}</Text>
						</Link>
					),
					icon: (
						<Box margin={{ right: 'small' }}>
							<ShareRounded />
						</Box>
					),
				},
				{
					label: (
						<Link href='/device/transfer' passHref legacyBehavior>
							<Text>{t('设备转移')}</Text>
						</Link>
					),
					icon: (
						<Box margin={{ right: 'small' }}>
							<Transaction />
						</Box>
					),
				},
				{
					label: (
						<Link href='/device/contacts' passHref legacyBehavior>
							<Text>{t('通讯录')}</Text>
						</Link>
					),
					icon: (
						<Box margin={{ right: 'small' }}>
							<ContactInfo />
						</Box>
					),
				},
				{
					label: (
						<Link href='/device/calendar' passHref legacyBehavior>
							<Text>{t('日程提醒')}</Text>
						</Link>
					),
					icon: (
						<Box margin={{ right: 'small' }}>
							<Calendar />
						</Box>
					),
				},
			]}
		/>
	);
}

function IpcCardMenu({ onSettings, onInformation }) {
	const t = useJuJiuT();
	const labelDeviceSettings = t('设备设置');
	const labelDeviceInformation = t('设备信息');
	const settingsLabel = onSettings ? (
		<Text>{labelDeviceSettings}</Text>
	) : (
		<Link href='/device/settings' passHref legacyBehavior>
			<Text>{labelDeviceSettings}</Text>
		</Link>
	);
	const informationsLabel = onInformation ? (
		<Text>{labelDeviceInformation}</Text>
	) : (
		<Link href='/device/information' passHref legacyBehavior>
			<Text>{labelDeviceInformation}</Text>
		</Link>
	);

	return (
		<Menu
			dropProps={{ align: { top: 'bottom', right: 'right' } }}
			icon={<More />}
			items={[
				{
					label: settingsLabel,
					icon: (
						<Box margin={{ right: 'small' }}>
							<SettingsOutline size='24' />
						</Box>
					),
					onClick: onSettings,
				},
				{
					label: informationsLabel,
					icon: (
						<Box margin={{ right: 'small' }}>
							<CircleInformation />
						</Box>
					),
					onClick: onInformation,
				},
			]}
		/>
	);
}

export function IpcCardRaw({
	label,
	imgurl,
	nextPageUrl,
	online = false,
	cloudStorage = 'expiring',
	children,
}) {
	return (
		<Card>
			<LinkOrNone url={nextPageUrl}>
				<CardBody as='a' background='background-front'>
					<Stack>
						<Box height={'200px'}>{imgurl && <Image src={imgurl} fit='contain' alt='' />}</Box>
						<Box direction='row' margin='medium' gap='small'>
							<Box gap='small'>
								<Box direction='row'>{online ? <JuJiuTagDeviceOnline /> : <JuJiuTagDeviceOffline />}</Box>
							</Box>
							<Box gap='small'>
								<Box direction='row'>
									{
										{ expiring: <JuJiuTagCloudStorageExpiring />, expired: <JuJiuTagCloudStorageExpired /> }[
											cloudStorage
										]
									}
								</Box>
							</Box>
						</Box>
					</Stack>
				</CardBody>
			</LinkOrNone>
			<CardFooter pad='small' align='center' justify='between' background='background-contrast'>
				<Text>{label}</Text>
				{children}
			</CardFooter>
		</Card>
	);
}

export function IpcCardSelectable({ onSelect, selected = false, onSettings, onInformation, ...passProps }) {
	return (
		<Stack anchor='top-right'>
			<IpcCardRaw {...passProps}>
				<IpcCardMenu onSettings={onSettings} onInformation={onInformation} />
			</IpcCardRaw>
			<Box pad='small'>
				<CheckBox checked={selected} onChange={(e) => onSelect?.(e.target.checked)} />
			</Box>
		</Stack>
	);
}
