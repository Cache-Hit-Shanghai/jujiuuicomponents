import {
	Input,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
	Switch,
	Button,
	Card,
	CardBody,
	VisuallyHidden,
	useSwitch,
} from '@nextui-org/react';
import { useState } from 'react';
import { useJuJiuT } from '@/state/translate';
import { DeleteOutline } from '@styled-icons/material/DeleteOutline';
import { Schedule } from '@styled-icons/material/Schedule';
import { LabeledControl } from '../../core/core-ui';

/**
 *
 * @param {Parameters<typeof useSwitch>[0]} props
 * @returns
 */
export const DaySwitch = (props) => {
	const {
		Component,
		slots,
		children,
		getBaseProps,
		getInputProps,
		getWrapperProps,
	} = useSwitch(props);

	return (
		<div className='flex flex-col gap-2'>
			<Component {...getBaseProps()}>
				<VisuallyHidden>
					<input {...getInputProps()} />
				</VisuallyHidden>
				<div
					{...getWrapperProps()}
					className={slots.wrapper({
						class: [
							'w-8 h-8',
							'flex items-center justify-center',
							'rounded-full bg-default-100 hover:bg-default-200',
						],
					})}
				>
					{children}
				</div>
			</Component>
		</div>
	);
};

function SleepPlanCard ({
	start = '9:00',
	end = '19:00',
	daysStr = '每天',
	onClick,
	onDel,
}) {
	return (
		<Card className='bg-default'>
			<CardBody className='p-1' onClick={onClick}>
				<div className='flex flex-row items-center justify-between'>
					<div className='flex flex-row gap-2 items-center'>
						<Schedule size={48} />
						<div>
							<p>
								{start} - {end}
							</p>
							<p className='text-sm text-default-500'>{daysStr}</p>
						</div>
					</div>
					<Button isIconOnly variant='light' onPress={onDel}>
						<DeleteOutline size={24} />
					</Button>
				</div>
			</CardBody>
		</Card>
	);
}

export { SleepPlanCard as DormantPlanCard };
