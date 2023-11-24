import { Switch, Button, Card, CardBody } from '@nextui-org/react';
import { useState } from 'react';
import { useJuJiuT } from '@/state/translate';
import { DeleteOutline } from '@styled-icons/material/DeleteOutline';
import { Schedule } from '@styled-icons/material/Schedule';
import { LabeledControl } from '../../core/core-ui';

function SleepPlanCard() {
	return (
		<Card className='bg-default'>
			<CardBody className='p-1'>
				<div className='flex flex-row items-center justify-between'>
					<div className='flex flex-row gap-2 items-center'>
						<Schedule size={48} />
						<div>
							<p>9:00 - 19:00</p>
							<p className='text-sm text-default-500'>每天</p>
						</div>
					</div>
					<Button isIconOnly variant='light'>
						<DeleteOutline size={24} />
					</Button>
				</div>
			</CardBody>
		</Card>
	);
}

export function Sleep() {
	const t = useJuJiuT();
	const [sleep, setSleep] = useState(false);
	const [sleepPlan, setSleepPlan] = useState(false);

	return (
		<>
			<LabeledControl label={t('休眠')}>
				<Switch isSelected={sleep} onValueChange={setSleep} />
			</LabeledControl>
			{!sleep && (
				<div>
					<LabeledControl label={t('休眠计划')}>
						<Switch isSelected={sleepPlan} onValueChange={setSleepPlan} />
					</LabeledControl>
					{sleepPlan && (
						<div className='pb-2 flex flex-col gap-2'>
							<SleepPlanCard />
							<SleepPlanCard />
							<SleepPlanCard />
							<Button size='sm' color='primary'>
								{t('添加时间段')}
							</Button>
						</div>
					)}
				</div>
			)}
		</>
	);
}
