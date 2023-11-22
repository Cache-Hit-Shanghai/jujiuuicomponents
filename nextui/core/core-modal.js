import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react';

function ConfirmModal({
	onOpenChange,
	onClose,
	onConfirm = () => {},
	isOpen,
	title,
	position,
	children,
	...props
}) {
	return (
		<Modal
			isOpen={isOpen}
			placement={position || 'bottom'}
			onClose={onClose}
			onOpenChange={onOpenChange}
			className='m-0'
		>
			<ModalContent>
				{(onClose) => {
					return [
						<ModalHeader>{title}</ModalHeader>,
						<ModalBody className='py-4'>{children}</ModalBody>,
						<ModalFooter>
							<Button color='danger' variant='light' onPress={onClose}>
								取消
							</Button>
							<Button color='primary' onPress={onConfirm}>
								确定
							</Button>
						</ModalFooter>,
					];
				}}
			</ModalContent>
		</Modal>
	);
}

export { ConfirmModal };
