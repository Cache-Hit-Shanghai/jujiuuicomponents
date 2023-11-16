'use client';

import { Select, SelectItem } from '@nextui-org/react';
import { useJuJiuT } from '@/state/translate';

export function ChangeUI({ langProps = {}, fontProps = {}, themeProps = {} }) {
	const t = useJuJiuT();

	return [
		{
			label: t('语言'),
			items: [
				{ label: '简体中文', value: 'zh' },
				{ label: 'English', value: 'en' },
			],
			name: 'language',
			props: langProps,
		},
		{
			label: t('字体大小'),
			items: [
				{ label: t('小字体'), value: 'small' },
				{ label: t('大字体'), value: 'large' },
			],
			name: 'fontsize',
			props: fontProps,
		},
		{
			label: t('主题'),
			items: [
				{ label: t('浅色模式'), value: 'light' },
				{ label: t('深色模式'), value: 'dark' },
				{ label: t('跟随系统'), value: 'auto' },
			],
			name: 'theme-mode',
			props: themeProps,
		},
	].map(({ label = '', name = '', items = [], props = {} }) => (
		<div key={name} className='flex justify-between items-center border-b py-2'>
			<p className='shrink-0 w-[150px]'>{label}</p>
			<Select size='sm' fullWidth={false} name={name} items={items} {...props}>
				{(item) => <SelectItem key={item.label}>{item.label}</SelectItem>}
			</Select>
		</div>
	));
}
