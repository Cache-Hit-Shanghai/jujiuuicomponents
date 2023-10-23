'use client';

import { useJuJiuT } from '@/state/translate';
import { Form, TextArea, Button, Box } from 'grommet';

function PostEditForm({ onSubmit, onChange, value = {} }) {
	const t = useJuJiuT();

	return (
		<Form
			onSubmit={onSubmit}
			onChange={onChange}
			value={value}
			style={{
				flex: '1 1 auto',
				display: 'flex',
				flexDirection: 'column',
				gap: '20px',
				padding: '10px',
			}}
		>
			<TextArea rows={3} name='title' required={true} placeholder={t('标题')} />
			<TextArea fill name='text' required={true} placeholder={t('问题描述')} />
			<Box pad='small' direction='row' flex={false} justify='end'>
				<Button type='submit' label={t('提交')} />
			</Box>
		</Form>
	);
}

export { PostEditForm };
