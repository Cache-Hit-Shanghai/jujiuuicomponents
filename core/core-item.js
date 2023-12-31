'use client';

import { Box, Text, CardBody, Button, Collapsible } from 'grommet';
import { FormNext, FormDown, FormUp } from 'grommet-icons';
import { useState } from 'react';
import { JuJiuCard, ButtonLink } from './core-ui';

export function JuJiuRawItem({ onClick, children }) {
	return (
		<JuJiuCard>
			<CardBody onClick={onClick} focusIndicator={false}>
				{children}
			</CardBody>
		</JuJiuCard>
	);
}

export function JuJiuItem({ label, onClick, children }) {
	return (
		<JuJiuRawItem onClick={onClick}>
			<Box direction='row' align='center' justify='between'>
				{label && <Text>{label}</Text>}
				{children}
			</Box>
		</JuJiuRawItem>
	);
}

export function JuJiuItemText({ label, value, icon }) {
	return (
		<JuJiuItem label={label}>
			<Box direction='row' align='center'>
				{icon}
				<Text size='small' color='text-xweak'>
					{value}
				</Text>
			</Box>
		</JuJiuItem>
	);
}

export function JuJiuItemTextArray({ label, value }) {
	return (
		<JuJiuItem label={label}>
			<Box align='end'>
				{value.map((e, i) => (
					<Text key={e || i} size='small' color='text-xweak'>
						{e}
					</Text>
				))}
			</Box>
		</JuJiuItem>
	);
}

export function JuJiuItemButton({ label, value, onClick }) {
	return (
		<JuJiuItem label={label} onClick={onClick}>
			<Button
				plain
				reverse
				pad='none'
				label={
					<Text size='small' color='text-xweak'>
						{value}
					</Text>
				}
				icon={<FormNext color='control' />}
			/>
		</JuJiuItem>
	);
}

export function JuJiuItemRawButton({ label, onClick, children }) {
	return (
		<JuJiuItem label={label} onClick={onClick}>
			<Button plain reverse pad='none' label={children} icon={<FormNext color='control' />} />
		</JuJiuItem>
	);
}

export function JuJiuItemLink({ label, href }) {
	return (
		<JuJiuRawItem>
			<ButtonLink href={href}>
				<Box direction='row' align='center' justify='between'>
					<Text>{label}</Text>
					<FormNext color='control' />
				</Box>
			</ButtonLink>
		</JuJiuRawItem>
	);
}

export function JuJiuCollapsible({ label, value, gap, children, ...props }) {
	const [open, setOpen] = useState(false);
	return (
		<JuJiuRawItem>
			<Box
				direction='row'
				align='center'
				justify='between'
				focusIndicator={false}
				onClick={() => setOpen(!open)}
			>
				<Text>{label}</Text>
				<Box direction='row' gap='small' align='center'>
					{value && (
						<Text size='small' color='text-xweak'>
							{value}
						</Text>
					)}
					{open ? <FormUp color='control' /> : <FormDown color='control' />}
				</Box>
			</Box>
			<Collapsible open={open} {...props}>
				<Box pad={{ top: 'small' }} gap={gap}>
					{children}
				</Box>
			</Collapsible>
		</JuJiuRawItem>
	);
}
