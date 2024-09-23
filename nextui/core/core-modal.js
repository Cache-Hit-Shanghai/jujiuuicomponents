import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
} from '@nextui-org/react';

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
			className='m-0 z-[999]'
			classNames={{
				wrapper: 'z-[999]',
			}}
			hideCloseButton
		>
			<ModalContent className='z-[999]'>
				{(onClose) => {
					return [
						<ModalHeader className='z-[999]'>{title}</ModalHeader>,
						<ModalBody className='py-4 z-[999] text-center'>
							{children}
						</ModalBody>,
						<ModalFooter className='z-[999] justify-between'>
							<Button
								className='text-[#FD9240]'
								variant='light'
								onClick={onClose}
							>
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
