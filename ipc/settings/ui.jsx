'use client';

import { Select, Box } from 'grommet';
import { JuJiuItem } from '../../core/core-item';
import { useJuJiuT } from '@/state/translate';

export function ChangeUI({ langProps = {}, fontProps = {}, themeProps = {} }) {
	const t = useJuJiuT();

	return (
		<>
			<JuJiuItem label={t('语言')}>
				<Box width='small'>
					<Select
						name='language'
						labelKey={'label'}
						valueKey={{
							key: 'value',
							reduce: true,
						}}
						options={[
							{ label: '简体中文', value: 'zh' },
							{ label: 'English', value: 'en' },
						]}
						{...langProps}
					/>
				</Box>
			</JuJiuItem>
			<JuJiuItem label={t('字体大小')}>
				<Box width='small'>
					<Select
						name='fontsize'
						value={'normal'}
						labelKey={'label'}
						valueKey={{
							key: 'value',
							reduce: true,
						}}
						options={[
							{ label: t('小字体'), value: 'small' },
							{ label: t('大字体'), value: 'large' },
						]}
						disabled={true}
						{...fontProps}
					/>
				</Box>
			</JuJiuItem>
			<JuJiuItem label={t('主题')}>
				<Box width='small'>
					<Select
						name='theme-mode'
						labelKey={'label'}
						valueKey={{
							key: 'value',
							reduce: true,
						}}
						options={[
							{ label: t('浅色模式'), value: 'light' },
							{ label: t('深色模式'), value: 'dark' },
							{ label: t('跟随系统'), value: 'auto' },
						]}
						{...themeProps}
					/>
				</Box>
			</JuJiuItem>
		</>
	);
}
