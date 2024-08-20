import Drawer from 'react-modern-drawer';
import { Image, Button } from '@nextui-org/react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { ChevronLeft } from '@styled-icons/material/ChevronLeft';
import { useRef } from 'react';

import 'react-modern-drawer/dist/index.css';

function formatDateTime(isoString) {
	const date = new Date(isoString);

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以需要+1
	const day = String(date.getDate()).padStart(2, '0');
	const formattedDate = `${year}/${month}/${day}`;

	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const formattedTime = `${hours}:${minutes}`;

	return {
		date: formattedDate,
		time: formattedTime,
	};
}

const ViewImg = ({ open, onClose, selectedItem, footer = <></> }) => {
	const { name, lastModified } = selectedItem || {};
	const zoomPanPinchRef = useRef();

	const dateStr = formatDateTime(lastModified);

	return (
		selectedItem && (
			<Drawer
				open={open}
				onClose={onClose}
				direction={'left'}
				size={'100vw'}
				overlayColor='#F4F4F4'
				duration='0'
				enableOverlay={false}
				className='z-20'
				overlayOpacity='0'
			>
				<div className='w-full h-full flex flex-col bg-[#F4F4F4]'>
					<div className='w-full h-11 flex justify-between items-center my-2'>
						<Button
							isIconOnly
							variant='light'
							onClick={onClose}
							className='text-inherit'
						>
							<ChevronLeft size={24} />
						</Button>
						<div className='text-center absolute left-2/4 translate-x-[-50%]'>
							<div className='font-semibold text-[#333333]'>{dateStr.date}</div>
							<div className='text-[#333333] text-xs'>{dateStr.time}</div>
						</div>
					</div>
					<div className='flex flex-1 items-center justify-center'>
						<TransformWrapper
							// customClientCoordinate={
							// 	isVideoFullscreen ? customClientCoordinate : undefined
							// }
							doubleClick={{ disabled: true }}
							initialScale={1}
							minScale={1}
							limitToBounds={true}
							disablePadding={true}
							onZoom={(ref) => {
								const scale = ref.instance.transformState.scale;
								// if (scale) setScale(scale);
							}}
							ref={zoomPanPinchRef}
						>
							<TransformComponent
								contentStyle={{
									width: '100%',
									height: '100%',
									display: 'flex',
									alignItems: 'center',
								}}
								wrapperStyle={{
									width: '100%',
									height: '100%',
								}}
							>
								<Image
									radius='none'
									src={`https://jujiu-prod.oss-accelerate.aliyuncs.com/${name}`}
									className='w-fit h-fit'
								/>
							</TransformComponent>
						</TransformWrapper>
					</div>
					{footer}
				</div>
			</Drawer>
		)
	);
};

export { ViewImg };
