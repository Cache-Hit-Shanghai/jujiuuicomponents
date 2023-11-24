import { Button, Input } from '@nextui-org/react';
import { useJuJiuT } from '@/state/translate';
import { Form } from '../../core/core-input';

export function ChangePassword({ onSubmit = () => {} }) {
	const t = useJuJiuT();

	return (
		<Form onSubmit={onSubmit}>
			<div className='flex flex-col gap-4'>
				<Input label={t('输入旧密码') + ':'} type='password' name='oldPwd' />
				<Input label={t('输入新密码') + ':'} type='password' name='newPwd' />
				<Input label={t('再次输入新密码') + ':'} type='password' name='validateNewPwd' />
				<Button type='submit' color='primary'>
					{t('确定')}
				</Button>
			</div>
		</Form>
	);
}
