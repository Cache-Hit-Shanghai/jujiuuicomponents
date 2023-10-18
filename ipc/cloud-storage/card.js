'use client';

import { ButtonLink } from '../../core';
import { JJIconWebcam } from '../icons';
import { useJuJiuT } from '@/state/translate';
import { Card, CardBody, Box, Avatar, Text, Tag, CardFooter } from 'grommet';

function CloudStorageCard({ device, hasVip, expireAt, basePath = '' }) {
	const { desc, usn } = device;
	const t = useJuJiuT();

	return (
		<Card pad='medium' gap='medium' background='background-contrast' flex={false}>
			<CardBody>
				<Box direction='row' justify='between' align='center'>
					<Box align='center' gap='small'>
						<Avatar background='background-front'>
							<JJIconWebcam />
						</Avatar>
						<Text>{desc}</Text>
					</Box>
					{hasVip && (
						<Box gap='medium'>
							<Box gap='small' direction='row' wrap={true} justify='end'>
								<Tag size='small' background='graph-4' value={t('7天循环存储')} />
								<Tag size='small' background='graph-4' value={t('24小时录像')} />
							</Box>
							<Box align='end'>
								<Text color='status-ok'>{t('正常使用中')}</Text>
								<Text size='small' color='text-xweak'>
									{t('将于 {expireAt} 日到期', { expireAt })}
								</Text>
							</Box>
						</Box>
					)}
				</Box>
			</CardBody>
			<CardFooter justify='center'>
				{hasVip && <ButtonLink href={`${basePath}/cloud-storage/settings?usn=${usn}`} label={t('设置')} />}
				<ButtonLink
					primary
					href={`${basePath}/cloud-storage/pay?usn=${usn}`}
					label={hasVip ? t('续订') : t('购买')}
				/>
			</CardFooter>
		</Card>
	);
}

export { CloudStorageCard };
