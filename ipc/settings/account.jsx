'use client';

import {
	Heading,
	Button,
	Text,
	TextInput,
	Box,
	Form,
	FormField,
} from 'grommet';
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
					<Button
						style={{ width: '100%' }}
						label={t('本地相册')}
						{...albumProps}
					/>
				</InputFileUpload>
			</Box>
		</>
	);
}

const nameCuc = '@/ ? * : |  < >';

export const getNLAByT = (t) => t('修改昵称提示');

export function ChangeNickname({
	inputProps = {},
	infoLabel = '',
	onSave = () => {},
}) {
	const t = useJuJiuT();

	return (
		<>
			<Heading level={3} alignSelf='center' margin='none'>
				{t('修改昵称')}
			</Heading>
			<TextInput
				placeholder={t('请填写昵称……')}
				maxLength={20}
				minLength={2}
				{...inputProps}
			/>
			<JuJiuInformation label={getNLAByT(t)} />
			<Button label={t('保存')} primary onClick={onSave} />
		</>
	);
}

export function ChangePassword({ onSubmit = () => {} }) {
	const t = useJuJiuT();

	return (
		<Form messages={{ required: t('必填') }} onSubmit={onSubmit}>
			<Text>{t('输入旧密码')}：</Text>
			<TextInput type='password' style={{ display: 'none' }} />
			<FormField name='oldPwd' required>
				<TextInput type='password' name='oldPwd' />
			</FormField>
			<Text>{t('输入新密码')}：</Text>
			<FormField name='newPwd' required>
				<TextInput type='password' name='newPwd' />
			</FormField>
			<Text>{t('再次输入新密码')}：</Text>
			<FormField
				name='validateNewPwd'
				required
				validate={(prop, { newPwd }) => {
					if (prop !== newPwd) return t('新密码不一致');
				}}
			>
				<TextInput type='password' name='validateNewPwd' />
			</FormField>
			<Button
				style={{ width: '100%' }}
				primary
				label={t('确定')}
				type='submit'
			/>
		</Form>
	);
}
