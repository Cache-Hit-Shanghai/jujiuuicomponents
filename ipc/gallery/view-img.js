import Drawer from 'react-modern-drawer';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Lightbox from 'yet-another-react-lightbox';
import Video from 'yet-another-react-lightbox/plugins/video';

import 'yet-another-react-lightbox/styles.css';
import 'react-modern-drawer/dist/index.css';
import './style.scss';

const CommonLightbox = ({
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
				container: {
					backgroundColor: '#f6f6f6',
				},
			}}
			plugins={[Zoom, Fullscreen, Video]}
			animation={{
				fade: 0,
				swipe: 0,
				navigation: 0,
				easing: { fade: 'ease', swipe: 'linear', navigation: 'linear' },
				zoom: 0,
			}}
			portal={document.getElementById('gallery-wrapper') ?? 'root'}
			noScroll={false}
		/>
	);
};

function ConfirmDrawer({ open, onClose, content, height }) {
	return (
		<>
			<Drawer
				open={open}
				onClose={onClose}
				size={height}
				direction={'bottom'}
				overlayColor='#000000'
				duration='0'
				enableOverlay
				className='z-[2000] w-screen rounded-t-lg'
				style={{
					width: '100vw',
				}}
				overlayOpacity='0'
			>
				<div className='w-full h-full flex flex-col p-5 justify-around'>
					{content}
				</div>
			</Drawer>
		</>
	);
}

export { ConfirmDrawer, CommonLightbox };
