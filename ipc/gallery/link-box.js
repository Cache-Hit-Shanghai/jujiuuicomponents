import { Box, Stack } from 'grommet';
import React from 'react';
import { JJIconCirclePlay } from '../icons';

const DEFAULT_IMAGE = '';

function LinkBox({ url, onClick, defaultImage = DEFAULT_IMAGE, ...passProps }) {
	return (
		<Box
			as='a'
			fill
			background={url ? `url(${url})` : DEFAULT_IMAGE}
			round='xsmall'
			focusIndicator={false}
			onClick={onClick}
			{...passProps}
		/>
	);
}

function LinkBoxImage({ url, onClick }) {
	return <LinkBox {...{ url, onClick }} />;
}

function LinkBoxVideo({ url, onClick }) {
	return (
		<Stack fill anchor='center' interactiveChild='first'>
			<LinkBox {...{ url, onClick }} />
			<Box>
				<JJIconCirclePlay />
			</Box>
		</Stack>
	);
}

export { LinkBoxImage, LinkBoxVideo };
