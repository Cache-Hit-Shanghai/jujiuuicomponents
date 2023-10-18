'use client';

import { TextArea, Box, Button, Markdown } from 'grommet';
import { useCallback, useRef, useState } from 'react';
import { useJuJiuT } from '@/state/translate';

function IpcMarkDownInput({ value = '', markDownComponents, onChange = () => {}, upload, ...props }) {
	const [index, setIndex] = useState(0);
	const textRef = useRef();
	const t = useJuJiuT();

	const onValueChange = useCallback(({ target: { value } }) => {
		onChange(value);
	}, []);

	const OnMarkdownStr = useCallback(
		({ markdowmStr = '', range, newLine }) => {
			const v = `${value || ''}${value && newLine ? '\n' : ''}${markdowmStr}`;
			onChange(v);
			textRef.current.focus();
			setTimeout(() => {
				range && textRef.current.setSelectionRange(v.length - range, v.length - range);
			}, 0);
		},
		[value, textRef]
	);

	return (
		<Box flex={false} pad='small' gap='medium' {...props}>
			<Box gap='medium' direction='row'>
				{[
					{
						label: '输入',
					},
					{
						label: '预览',
					},
				].map(({ label }, i) => (
					<Button key={i} primary={i === index} label={t(label)} onClick={() => setIndex(i)}></Button>
				))}
			</Box>

			<Box width='fit-content'>{upload}</Box>
			<Box direction='row' gap='medium'>
				{[
					{ label: 'h2', content: '标题', markdowmStr: '## ', range: 0, newLine: true },
					{ label: 'h4', content: '副标题', markdowmStr: '#### ', range: 0, newLine: true },
					{ label: 'B', content: '粗体', markdowmStr: '****', range: 2, newLine: false },
					{ label: 'I', content: '斜体', markdowmStr: '__', range: 1, newLine: false },
					{ label: 'L', content: '列表', markdowmStr: '1. ', newLine: true },
				].map(({ label, markdowmStr, content, range, newLine }) => (
					// <Tip content={content}>
					// </Tip>
					<Button
						onClick={() => OnMarkdownStr({ markdowmStr, range, newLine })}
						key={t(label)}
						plain
						label={t(content)}
					></Button>
				))}
			</Box>
			<Box overflow={'auto'} height={{ max: '100px' }}>
				{index ? (
					<Markdown components={markDownComponents}>{value}</Markdown>
				) : (
					<TextArea ref={textRef} rows={3} value={value} onChange={onValueChange}></TextArea>
				)}
			</Box>
		</Box>
	);
}

export { IpcMarkDownInput };
