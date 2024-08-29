import Drawer from 'react-modern-drawer';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Lightbox, { EventsProvider } from 'yet-another-react-lightbox';
import Video from 'yet-another-react-lightbox/plugins/video';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { useRef } from 'react';

import 'yet-another-react-lightbox/styles.css';
import 'react-modern-drawer/dist/index.css';
import './style.scss';

export const ZoomWrapper = ({ children }) => {
	const zoomPanPinchRef = useRef();
	return (
		<TransformWrapper
			doubleClick={{ disabled: true }}
			initialScale={1}
			minScale={1}
			limitToBounds={true}
			disablePadding={true}
			onZoom={(ref) => {
				const scale = ref.instance.transformState.scale;
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
				{children}
			</TransformComponent>
		</TransformWrapper>
	);
};

const CommonLightbox = ({
	inApp,
	open,
	slides,
	handleClose,
	updateIndex,
	index,
	render,
}) => {
	return (
		<Lightbox
			open={open}
			close={handleClose}
			index={index}
			slides={slides}
			render={render}
			on={{ view: updateIndex }}
			controller={{ closeOnPullDown: false, closeOnBackdropClick: false }}
			video={{
				autoPlay: false,
			}}
			styles={{
				root: {
					backgroundColor: '#f6f6f6',
				},
				container: inApp
					? {
							backgroundColor: '#f6f6f6',
							paddingTop: 44,
						}
					: {
							backgroundColor: '#f6f6f6',
						},
			}}
			plugins={[Zoom, Fullscreen, Video]}
			animation={{
				fade: 0,
				swipe: 0,
				navigation: 0,
				easing: { fade: 'ease', swipe: 'linear', navigation: 'linear' },
			}}
			noScroll={false}
			zoom={{
				maxZoomPixelRatio: 2,
				zoomInMultiplier: 5,
				doubleTapDelay: 300,
				doubleClickDelay: 500,
				doubleClickMaxStops: 2,
				keyboardMoveDistance: 50,
				wheelZoomDistanceFactor: 100,
				pinchZoomDistanceFactor: 100,
				scrollToZoom: true,
			}}
			toolbar={{
				buttons: [],
			}}
		/>
	);
};

function ConfirmDrawer({ open, onClose, content, height, bottom = '0px' }) {
	return (
		<>
			<Drawer
				open={open}
				onClose={onClose}
				size={height}
				direction={'bottom'}
				overlayColor='#000000'
				duration='0'
				enableOverlay={false}
				className='w-screen rounded-t-lg'
				style={{
					width: '100vw',
					position: 'absolute',
					bottom,
				}}
				overlayOpacity='0'
			>
				<div className='w-full h-full flex flex-col p-5 justify-around z-[99999]'>
					{content}
				</div>
			</Drawer>
		</>
	);
}

export { ConfirmDrawer, CommonLightbox };
