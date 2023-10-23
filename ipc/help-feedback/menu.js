'use client';

import { Menu, Text, Box } from 'grommet';
import { JJIconAdd, JJIconMoreVertical, JJIconApps, JJIconArticle, JJIconChat } from '../icons';
import Link, { useJuJiuT } from '@/state/translate';

function HelpFeedbackMenu({ basePath = '' }) {
	const t = useJuJiuT();

	return (
		<Menu
			icon={<JJIconMoreVertical />}
			dropAlign={{ top: 'bottom', right: 'right' }}
			items={[
				{ label: '新建问题', href: basePath + '/help-feedback/new', Icon: JJIconAdd },
				{ label: '全部问题', href: '?from=all', Icon: JJIconApps },
				{
					label: '我的问题',
					href: '?from=me',
					Icon: JJIconArticle,
					size: '24',
				},
				{
					label: '我的回复',
					href: '?from=meReply',
					Icon: JJIconChat,
				},
			].map(({ label, href, Icon, size, onClick = () => {} }) => ({
				label: (
					<Link href={href} passHref legacyBehavior>
						<Text>{t(label)}</Text>
					</Link>
				),
				icon: (
					<Box margin={{ right: 'small' }}>
						<Icon size={size} />
					</Box>
				),
				onClick,
			}))}
		/>
	);
}

export { HelpFeedbackMenu };
