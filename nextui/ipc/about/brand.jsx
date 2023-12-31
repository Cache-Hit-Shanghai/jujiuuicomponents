'use client';

import { Card, CardBody, Spacer, Chip } from '@nextui-org/react';
import { Paw } from '../../../icons/paw';
import { useJuJiuT } from '@/state/translate';
import {
	ZCOOL_KuaiLe,
	ZCOOL_XiaoWei,
	ZCOOL_QingKe_HuangYou,
	Ma_Shan_Zheng,
	Zhi_Mang_Xing,
	Long_Cang,
	Liu_Jian_Mao_Cao,
	Zen_Maru_Gothic,
	Sniglet,
	Chewy,
} from 'next/font/google';

const googleFont = Zen_Maru_Gothic({
	weight: '900',
	subsets: ['latin'],
	display: 'swap',
});

export function AppLogo({ size = 'sm' }) {
	const t = useJuJiuT();

	return (
		<div className='flex px-2 gap-2 items-center justify-center'>
			<Paw size={size === 'sm' ? 24 : 48} />
			<p className={`${size === 'sm' ? 'text-lg' : 'text-4xl'} ${googleFont.className}`}>{t('小皮部落')}</p>
		</div>
	);
}

export function AppAbout() {
	const t = useJuJiuT();

	return (
		<Card>
			<CardBody className='px-0 py-6 relative'>
				<AppLogo size='lg' />
				<Spacer y={4} />
				<div className='flex flex-col items-center'>
					<p>{t('slogan')}</p>
					<Spacer y={1} />
					<p className='text-xs text-default-500'>
						Powered by {t('光方云')}
						<sup>&reg; </sup>
					</p>
					<div className='absolute top-1 right-1'>
						<Chip size='sm' color='warning'>
							IPv6
						</Chip>
					</div>
				</div>
			</CardBody>
		</Card>
	);
}

export function AppMark() {
	const t = useJuJiuT();

	return (
		<div className='p-2'>
			<p className='text-2xl text-center'>
				{t('小皮部落')}
				<sup>&reg;</sup>
			</p>
			<Spacer y={1} />
			<p className='text-xs text-center text-default-500'>
				&copy;2021-2023 {t('上海光方迅视科技有限公司版权所有')}
			</p>
		</div>
	);
}
