import {
	Modal,
	ModalContent,
	Link,
	Divider,
	Card,
	CardHeader,
	CardBody,
} from '@nextui-org/react';
import { useJuJiuT } from '@/state/translate';

export function ActionSheet({ isOpen, onOpenChange, title, buttons }) {
	const t = useJuJiuT();

	return (
		<Modal
			backdrop='blur'
			placement='bottom'
			hideCloseButton
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			className='bg-transparent'
		>
			<ModalContent className='gap-2'>
				{(onClose) => (
					<>
						<Card>
							<CardHeader className='justify-center text-default-500'>
								{title}
							</CardHeader>
							<Divider />
							<CardBody className='gap-2'>
								{buttons.map(({ label, key, ...props }) => (
									<Link key={key} className='py-1 justify-center' {...props}>
										{label}
									</Link>
								))}
							</CardBody>
						</Card>
						<Card>
							<CardBody>
								<Link onPress={onClose} className='py-1 justify-center'>
									{t('取消')}
								</Link>
							</CardBody>
						</Card>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
