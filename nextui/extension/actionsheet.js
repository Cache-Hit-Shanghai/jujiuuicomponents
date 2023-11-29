import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';

export function ActionSheet({ title, buttons }) {
	return (
		<Modal backdrop='blur' placement='center' isOpen={isOpen} onClose={onClose}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className='flex flex-col gap-1'>{title}</ModalHeader>
						<ModalBody>{message}</ModalBody>
						<ModalFooter>
							<Button color='danger' variant='light' onPress={onClose}>
								{t('否')}
							</Button>
							<Button color='primary' onPress={onClose}>
								{t('是')}
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
