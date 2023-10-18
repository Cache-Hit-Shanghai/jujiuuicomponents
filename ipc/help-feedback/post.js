'use client';

import { TagColor } from '../../data/help-feedback';
import { useJuJiuT } from '@/state/translate';
import { Box, Heading, Button, Tag, Menu, Text, Card, CardHeader, CardBody, Markdown } from 'grommet';
import { Settings3 } from '@styled-icons/remix-fill/Settings3';
import { JJIconCheckMark } from '../icons';
import { IpcMarkdown } from '../markdown';

function PostHead({ post, tagData, onTagToggle, showEdit, showTagController, basePath = '' }) {
	const { title, _id } = post;
	const t = useJuJiuT();

	return (
		<>
			<Box flex={false} direction='row' gap='small' justify='between'>
				<Heading margin='none' level={2}>
					{title}
				</Heading>
				{showEdit && (
					<Box flex={false}>
						<Button href={`${basePath}/help-feedback/edit?id=${_id}`} label={t('编辑')}></Button>
					</Box>
				)}
			</Box>
			<PostTags {...{ tagData }}>
				{showTagController && <PostTagController {...{ tagData, onTagToggle }} />}
			</PostTags>
		</>
	);
}

function PostBody({ messages = [], parseTime }) {
	return (
		<>
			{messages.map(({ user = {}, text, timestamp, createdAt } = {}) => (
				<MessageCard
					key={timestamp}
					username={user.nickname}
					createdAt={parseTime(timestamp || createdAt)}
					{...{ text }}
				/>
			))}
		</>
	);
}

function PostTags({ tagData, children }) {
	const t = useJuJiuT();

	return (
		<Box flex={false} direction='row' justify='between'>
			<Box direction='row' gap='small' align='center'>
				{Object.entries(tagData).map(
					([tag, select]) =>
						select && <Tag key={tag} border={false} background={TagColor[tag]} size='xsmall' value={t(tag)} />
				)}
			</Box>
			{children}
		</Box>
	);
}

function PostTagController({ tagData, onTagToggle }) {
	const t = useJuJiuT();

	return (
		<Box>
			<Menu
				dropProps={{ align: { top: 'bottom', right: 'right' } }}
				icon={<Settings3 size='24' />}
				items={Object.keys(TagColor).map((tag) => {
					return {
						label: <Text>{t(tag)}</Text>,
						icon: <Box margin={{ right: 'small' }}>{tagData[tag] && <JJIconCheckMark />}</Box>,
						onClick: () => onTagToggle(tag),
					};
				})}
			/>
		</Box>
	);
}

function MessageCard({ username, createdAt, text }) {
	return (
		<Card flex={false}>
			<CardHeader pad='small' background='background-front'>
				<PostMeta {...{ username, createdAt }} />
			</CardHeader>
			<CardBody pad='small' background='background-contrast'>
				<IpcMarkdown>{text}</IpcMarkdown>
			</CardBody>
		</Card>
	);
}

function PostMeta({ username, createdAt }) {
	const t = useJuJiuT();

	return (
		<Text size='small' color='text-xweak'>
			{t('由 {username} 于 {createdAt} 创建', {
				username,
				createdAt,
			})}
		</Text>
	);
}

export { PostMeta, PostHead, PostBody, PostTags, PostTagController };
