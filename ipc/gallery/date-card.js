import React from 'react';
import { Card, CardHeader, CardBody, Text, Grid } from 'grommet';

function DateCard({ title, elWidth, children }) {
	return (
		<Card flex={false}>
			<CardHeader background='background-front' pad='small'>
				<Text>{title}</Text>
			</CardHeader>
			<CardBody pad='small'>
				<Grid
					fill
					columns='xsmall'
					gap='small'
					align='center'
					justify='center'
					style={{ gridAutoFlow: 'row dense', gridAutoRows: elWidth }}
				>
					{children}
				</Grid>
			</CardBody>
		</Card>
	);
}

export { DateCard };
