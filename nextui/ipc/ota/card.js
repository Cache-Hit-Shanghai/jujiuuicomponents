'use client';

import { useJuJiuT } from '@/state/translate';
import { Card, CardBody } from '@nextui-org/react';
import { LinkButton } from '@/jujiu-ui-components/nextui/core/core-ui';
import { NestCamWiredStand } from '@styled-icons/material/NestCamWiredStand';
import { Update } from '@styled-icons/material/Update';

function OtaDeviceCard({ device, otaInfo, parseSize = (v) => v, basePath = '.', href = '/otainfo' }) {
	const { _id, desc } = device;
	const { currentVersion, upgradeVersion, upgradeSize = 0, updateLog } = otaInfo;

	const t = useJuJiuT();

	return (
		<Card>
			<CardBody>
				<div className='flex  justify-between items-center gap-2'>
					<div className='flex  items-center gap-2'>
						<NestCamWiredStand size={48} />
						<div>
							<p>{desc}</p>
							<p className='text-xs text-default-500'>{parseSize(upgradeSize)}</p>
							<p className='text-xs text-default-500'>
								{currentVersion} ~ {upgradeVersion}
							</p>
						</div>
					</div>
					<div>
						<LinkButton
							size='sm'
							variant='solid'
							color='primary'
							href={basePath + href}
							label={t('现在升级')}
							startContent={<Update size={24} />}
						/>
					</div>
				</div>
			</CardBody>
		</Card>
	);
}

export { OtaDeviceCard };
