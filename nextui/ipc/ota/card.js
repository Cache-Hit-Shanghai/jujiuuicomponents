'use client';

import { useJuJiuT } from '@/state/translate';
import { Card, CardBody } from '@nextui-org/react';
import { LinkButton } from '@/jujiu-ui-components/nextui/core/core-ui';
import { NestCamWiredStand } from '@styled-icons/material/NestCamWiredStand';
import { JuJiuUtilV2 } from '@/jujiu_js_common/util';

function OtaDeviceCard({ device, otaInfo, parseSize = (v) => v, basePath = '' }) {
	const { _id, desc } = device;
	const { currentVersion, upgradeVersion, upgradeSize = 0, updateLog } = otaInfo;

	const t = useJuJiuT();

	return (
		<Card>
			<CardBody>
				<div className='flex  border-b justify-between items-center gap-2'>
					<div className='flex  items-center gap-2'>
						<NestCamWiredStand size={48} />
						<div>
							<p>{desc}</p>
							<p className='text-xs text-default-500'>
								{JuJiuUtilV2.parse.parseSize(upgradeSize)}
							</p>
							<p className='text-xs text-default-500'>
								{currentVersion} ~ {upgradeVersion}
							</p>
						</div>
					</div>
					<div>
						<LinkButton
							// href='./otainfo'
							size='sm'
							variant='solid'
							color='primary'
							href={{
								pathname: './ota/ota-info',
								query: { _id, currentVersion, upgradeVersion, updateLog },
							}}
							label='现在升级'
							className={'rounded-full bg-success h-[36px]'}
						></LinkButton>
					</div>
				</div>
			</CardBody>
		</Card>
	);
}

export { OtaDeviceCard };
