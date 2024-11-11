import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@nextui-org/react';

function ConfirmModal({
	onOpenChange,
	onClose,
	onConfirm = () => {},
	isOpen,
	title,
	position,
	children,
	disabledConfirm = false,
	...props
}) {
	return (
		<Modal
			isOpen={isOpen}
			placement={position || 'center'}
			onClose={onClose}
			onOpenChange={onOpenChange}
			className='m-0 z-[10000]'
			classNames={{
				wrapper: 'z-[10000]',
			}}
			hideCloseButton
		>
			<ModalContent className='z-[10000]'>
				{(onClose) => {
					return [
						<ModalHeader>{title}</ModalHeader>,
						<ModalBody className='py-4 text-center'>{children}</ModalBody>,
						<ModalFooter className='justify-between'>
							<Button
								className='text-[#FD9240]'
								variant='light'
								onClick={onClose}
							>
								取消
							</Button>
							<Button
								color='primary'
								onPress={onConfirm}
								isDisabled={disabledConfirm}
							>
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
