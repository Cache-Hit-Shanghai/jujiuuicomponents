import { useRef, useState } from 'react';

const upbox = {
	position: 'relative',
	display: 'flex',
	height: '100%',
	width: '100%',
	flex: '1 0',
	justifyContent: 'center',
	alignItems: 'center',
};

const upload = {
	position: 'absolute',
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	zIndex: 9,
	opacity: '0',
};

//props:{getFiles,style,disabled,multiple,accept,children}
const InputFileUpload = (props) => {
	const ref = useRef();
	const [type, setType] = useState('file');

	const handleDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const files = [...e.dataTransfer.files];
		getFiles({ files, type: 'drop' });
	};

	const getFiles = (data) => {
		props.getFiles && props.getFiles(data);
	};

	const handleDragEnter = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDragLeave = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};

	return (
		<div
			style={{ ...upbox, ...props.style }}
			onDrop={handleDrop}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDragEnter={handleDragEnter}
		>
			<input
				onBlur={(e) => {
					e.stopPropagation();
				}}
				disabled={props.disabled}
				style={upload}
				type={type}
				multiple={props.multiple}
				ref={ref}
				onChange={() => {
					getFiles({ files: Array.from(ref.current.files), type: 'input' });
					ref.current.value = '';
				}}
				accept={props.accept}
				capture={props.capture}
			></input>
			{props.children}
		</div>
	);
};

export { InputFileUpload };
