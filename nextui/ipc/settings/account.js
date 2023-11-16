import { Button, Input } from '@nextui-org/react';
import { useJuJiuT } from '@/state/translate';

export function ChangePassword({ onSubmit = () => {} }) {
	const t = useJuJiuT();

	return (
		<form onSubmit={onSubmit}>
			<div className='flex flex-col gap-4'>
				<p>{t('输入旧密码')}：</p>
				<Input type='password' className='hidden' />

				<Input type='password' name='oldPwd' />
				<p>{t('输入新密码')}：</p>

				<Input type='password' name='newPwd' />
				<p>{t('再次输入新密码')}：</p>
				{/* <FormField
				name='validateNewPwd'
				required={true}
				validate={(prop, { newPwd }) => {
					if (prop !== newPwd) return t('新密码不一致');
				}}
			>
			</FormField> */}
				<Input type='password' name='validateNewPwd' />
				<Button type='submit' color='success'>
					{t('确定')}
				</Button>
			</div>
		</form>
	);
}
