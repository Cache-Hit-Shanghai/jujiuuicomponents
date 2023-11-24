import { Switch } from '@nextui-org/react';
import { useState } from 'react';
import { useJuJiuT } from '@/state/translate';
import { LabeledControl } from '../../core/core-ui';

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
				<LabeledControl label={t('休眠计划')}>
					<Switch isSelected={sleepPlan} onValueChange={setSleepPlan} />
				</LabeledControl>
			)}
		</>
	);
}
