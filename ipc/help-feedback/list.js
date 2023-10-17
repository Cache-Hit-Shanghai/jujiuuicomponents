'use client';

import { List, Box, Text, Tag } from 'grommet';
import { JJIconArticle } from '../icons';
import Link, { useJuJiuT } from '@/state/translate';
import { TagColor } from '../../data/help-feedback';

function HelpFeedbackList({ data = [], getUsername, getCreatedAt, basePath = '' }) {
	const t = useJuJiuT();

	return (
		<List data={data} margin={{ vertical: 'small' }}>
			{(datum) => (
				<Box direction='row' gap='small'>
					<Box flex={false}>
						<JJIconArticle size='24' />
					</Box>
					<Box gap='small'>
						<Link href={`${basePath}/help-feedback/post?id=${datum._id}`} passHref legacyBehavior>
							<Text truncate color='control'>
								{datum.title}
							</Text>
						</Link>
						<Box direction='row' gap='small'>
							{datum.tags.map((tag) => (
								<Tag key={tag} border={false} background={TagColor[tag]} size='xsmall' value={t(tag)} />
							))}
						</Box>
						<Text size='small' color='text-xweak'>
							{t('由 {username} 于 {createdAt} 创建', {
								username: getUsername(datum),
								createdAt: getCreatedAt(datum),
							})}
						</Text>
					</Box>
				</Box>
			)}
		</List>
	);
}

export { HelpFeedbackList };
