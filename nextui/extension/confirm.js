import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { useJuJiuT } from '@/state/translate';

export function Confirm({ title, message, isOpen, onClose, onConfirm, onCancel }) {
	const t = useJuJiuT();

	return (
		<Modal backdrop='blur' placement='center' isOpen={isOpen} onClose={onClose}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className='flex flex-col gap-1'>{title}</ModalHeader>
						<ModalBody>{message}</ModalBody>
						<ModalFooter>
							<Button
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

export { Confirm as ConfirmLayer };
