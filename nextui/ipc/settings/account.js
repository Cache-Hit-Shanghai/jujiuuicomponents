import { useJuJiuT } from '@/state/translate';
import { Button, Input } from '@nextui-org/react';
import { Form } from '../../core/core-input';
import { Information } from '../../core/core-ui';

export function ChangePassword({ onSubmit = () => {} }) {
	const t = useJuJiuT();

	return (
		<Form onSubmit={onSubmit}>
			<div className='flex flex-col gap-4'>
				<Input
					size='md'
					label={t('输入旧密码') + ':'}
					type='password'
					name='oldPwd'
					className='h-14'
				/>
				<Input
					size='md'
					label={t('输入新密码') + ':'}
					type='password'
					name='newPwd'
					className='h-14'
				/>
				<Input
					size='md'
					label={t('再次输入新密码') + ':'}
					type='password'
					name='validateNewPwd'
					className='h-14'
				/>
				<Information
					label={'请记住新密码，一旦修改成功，旧密码将不能登录账号！'}
				/>
				<Button
					radius='lg'
					className='h-12 w-full text-white mt-4'
					type='submit'
					color='primary'
				>
					{t('确定')}
				</Button>
			</div>
		</Form>
	);
}
