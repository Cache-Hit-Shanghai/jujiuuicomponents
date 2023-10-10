'use client';

import { Heading, Button, Text, TextInput, Box } from 'grommet';
import { JuJiuInformation } from '../../core/core-ui';
import { InputFileUpload } from '../../core';
import { useJuJiuT } from '@/state/translate';

export function ChangeAvatar({ uploadProps = {}, albumProps = {} }) {
	const t = useJuJiuT();
	return (
		<>
			<Heading level={3} alignSelf='center' margin='none'>
				{t('更换头像')}
			</Heading>
			{/* <Button label={t('拍照')} /> */}
			<Box height='50px'>
				<InputFileUpload {...uploadProps}>
					<Button style={{ width: '100%' }} label={t('本地相册')} {...albumProps} />
				</InputFileUpload>
			</Box>
		</>
	);
}

export function ChangeNickname() {
	return (
		<>
			<Heading level={3} alignSelf='center' margin='none'>
				修改昵称
			</Heading>
			<TextInput placeholder='请填写昵称……' />
			<JuJiuInformation label='请设置2-20个字符，不能使用@《等字符。' />
			<Button label='保存' primary />
		</>
	);
}

export function ChangePassword() {
	return (
		<>
			<Text>输入旧密码：</Text>
			<TextInput type='password' />
			<Text>输入新密码：</Text>
			<TextInput type='password' />
			<Text>再次输入新密码：</Text>
			<TextInput type='password' />
			<Button primary label='确定' />
		</>
	);
}
