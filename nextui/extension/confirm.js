import {
	Button,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from '@nextui-org/react';
import { useJuJiuT } from '@/state/translate';

export function Confirm({ message, isOpen, onClose, onConfirm, onCancel }) {
	const t = useJuJiuT();

	return (
		<Modal
			hideCloseButton
			backdrop='blur'
			placement='center'
			isOpen={isOpen}
			onClose={onClose}
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalBody className='pt-4 pb-0'>{message}</ModalBody>
						<ModalFooter>
							<Button
								size='sm'
								color='danger'
								variant='light'
								onPress={() => {
									onCancel?.();
									onClose();
								}}
							>
								{t('否')}
							</Button>
							<Button
								size='sm'
								color='primary'
								onPress={() => {
									onConfirm?.();
									onClose();
								}}
							>
								{t('是')}
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}

export { Confirm as NextuiConfirmLayer };
