'use client';

import { Box, Card, CardBody, CardFooter, Image, Stack } from 'grommet';
import { BatteryCharge } from '@styled-icons/typicons/BatteryCharge';
import {
	JuJiuTagDeviceOnline,
	JuJiuTagDeviceOffline,
	JuJiuTagCloudStorageExpiring,
	JuJiuTagCloudStorageExpired,
} from '../../core/core-tag';
import Link from '@/state/translate';

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

export function IpcCardRawRobot({
	label,
	imgurl,
	nextPageUrl,
	online = false,
	cloudStorage = 'expiring',
	children,
}) {
	return (
		<Card>
			<CardBody background='background-front'>
				<LinkOrNone url={nextPageUrl}>
					<Stack as='a'>
						<Box height={'200px'}>{imgurl && <Image src={imgurl} fit='cover' alt='' />}</Box>
						<Box direction='row' margin='medium' align='center' justify='between'>
							<Box direction='row' gap='small'>
								<Box direction='row'>{online ? <JuJiuTagDeviceOnline /> : <JuJiuTagDeviceOffline />}</Box>
								<Box direction='row'>
									{
										{
											expiring: <JuJiuTagCloudStorageExpiring />,
											expired: <JuJiuTagCloudStorageExpired />,
										}[cloudStorage]
									}
								</Box>
							</Box>
							<Box>
								<BatteryCharge size='24' />
							</Box>
						</Box>
					</Stack>
				</LinkOrNone>
			</CardBody>
			<CardFooter pad='small' align='center' justify='between' background='background-contrast'>
				{label}
				{children}
			</CardFooter>
		</Card>
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
			<CardBody background='background-front'>
				<LinkOrNone url={nextPageUrl}>
					<Stack as='a'>
						<Box height={'200px'}>{imgurl && <Image src={imgurl} fit='cover' alt='' />}</Box>
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
				</LinkOrNone>
			</CardBody>
			<CardFooter pad='small' align='center' justify='between' background='background-contrast'>
				{label}
				{children}
			</CardFooter>
		</Card>
	);
}
