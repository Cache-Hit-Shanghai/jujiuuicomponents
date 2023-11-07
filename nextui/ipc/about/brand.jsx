'use client';

import { Card, CardBody, Spacer, Chip } from '@nextui-org/react';
import { Pets } from '@styled-icons/material-outlined/Pets';
import { useJuJiuT } from '@/state/translate';

export function AppLogo() {
	const t = useJuJiuT();

	return (
		<Card>
			<CardBody className='px-0 py-4'>
				<div className='flex gap-2 items-center justify-center'>
					<Pets size='48' />
					<p className='text-large'>{t('小皮部落')}</p>
				</div>
				<Spacer y={4} />
				<div className='flex flex-col items-center'>
					<p>{t('slogan')}</p>
					<p className='text-small'>
						Powered by {t('光方云')}
						<sup>&reg; </sup>
						<Chip size='sm' color='warning'>
							IPv6
						</Chip>
					</p>
				</div>
			</CardBody>
		</Card>
	);
}

export function AppMark() {
	const t = useJuJiuT();

	return (
		<div className='p-2'>
			<p className='text-[96px] text-center'>
				{t('小皮部落')}
				<sup>&reg;</sup>
			</p>
			<p className='text-tiny text-default-400'>&copy;2021-2023 {t('上海光方迅视科技有限公司版权所有')}</p>
		</div>
	);
}
