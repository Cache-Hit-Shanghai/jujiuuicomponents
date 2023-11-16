import { Button, Input } from '@nextui-org/react';
import { useJuJiuT } from '@/state/translate';

export function ChangePassword({ onSubmit = () => {} }) {
	const t = useJuJiuT();

	return (
		<form onSubmit={onSubmit}>
			<div className='flex flex-col gap-4'>
				<Input label={t('输入旧密码') + ':'} type='password' className='oldPwd' />
				<Input label={t('输入新密码') + ':'} type='password' name='newPwd' />
				<Input label={t('再次输入新密码') + ':'} type='password' name='validateNewPwd' />
				{/* <FormField
				name='validateNewPwd'
				required={true}
				validate={(prop, { newPwd }) => {
					if (prop !== newPwd) return t('新密码不一致');
				}}
			>
			</FormField> */}
				<Button type='submit' color='success'>
					{t('确定')}
				</Button>
			</div>
		</form>
	);
}
