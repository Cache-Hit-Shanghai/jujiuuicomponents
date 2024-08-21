'use client';

import { Card, CardBody, Spacer, Chip } from '@nextui-org/react';
import { Paw } from '../../../icons/paw';
import { useJuJiuT } from '@/state/translate';
import { Zen_Maru_Gothic } from 'next/font/google';
import { FirstPageImg } from '@/app/[locale]/(auth)/pixelbot/icons/FirstPageImg';
import { twMerge } from 'tailwind-merge';

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
			<p
				className={`${size === 'sm' ? 'text-lg' : 'text-4xl'} ${googleFont.className}`}
			>
				{t('小皮部落')}
			</p>
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

export function AppMarkV2({ textClass, imgClass}) {
	return (
		<div className='flex flex-col items-center'>
			<div className={twMerge('w-40 w-40 mt-10 flex items-center', imgClass)}>
				<FirstPageImg />
			</div>
			<div className={twMerge('text-[#333333] mt-8 font-semibold', textClass)}>
				一家好认真的宠物机器人公司
			</div>
		</div>
	);
}
