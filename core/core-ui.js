'use client';

import { Tag, Box, Text, Layer, Card, Button, Main, CardBody, List, Spinner } from 'grommet';
import { isValidElement } from 'react';
import { CircleInformation, FormPrevious, FormNext } from 'grommet-icons';
import Link, { useRouter } from '@/state/translate';
import { useJuJiuT } from '@/state/translate';

function JuJiuTag({ icon, label, background }) {
	return (
		<Tag
			border={false}
			fill={false}
			background={background}
			size='xsmall'
			value={
				<Box direction='row' gap='xsmall' align='center'>
					{icon}
					<Text size='xsmall'>{label}</Text>
				</Box>
			}
		/>
	);
}

function JuJiuLinkTag({ href, icon, label, background }) {
	return (
		<Link href={href} passHref legacyBehavior>
			<Box>
				<JuJiuTag icon={icon} label={label} background={background} />
			</Box>
		</Link>
	);
}

function JuJiuLayer({ onClickOutside, position, target, children, ...props }) {
	return (
		<Layer
			position={position || 'bottom'}
			full='horizontal'
			responsive={false}
			target={target?.current}
			onEsc={onClickOutside}
			onClickOutside={onClickOutside}
		>
			<Box fill round pad='medium' gap='medium' background='background-front' {...props}>
				{children}
			</Box>
		</Layer>
	);
}

const ConfirmLayer = ({ target, value, setValue }) => {
	const { isOpen, content, onConfirm, onCancel } = value;
	const t = useJuJiuT();
	const closeLayer = () => {
		onCancel && onCancel();
		setValue({ isOpen: false });
	};

	return (
		isOpen && (
			<Layer target={target?.current} position='bottom' responsive={false} onClickOutside={closeLayer}>
				<Box width='100vw' align='center' pad={{ vertical: 'large' }} gap='medium' justify='center'>
					{typeof content === 'string' ? <Text>{content}</Text> : content}
					<Box direction='row' gap='small'>
						<Button label={t('取消')} onClick={closeLayer} />
						<Button primary label={t('确认')} onClick={onConfirm} />
					</Box>
				</Box>
			</Layer>
		)
	);
};

const LoadingLayer = ({
	isOpen,
	icon = <Spinner size='large' />,
	content = '',
	layerProps = {},
	boxProps = {},
}) => {
	return (
		isOpen && (
			<Layer
				responsive={false}
				animation='fadeIn'
				modal={true}
				plain
				background='transparent'
				position='center'
				{...layerProps}
			>
				<Box pad='large' round='medium' background='active' {...boxProps}>
					{icon}
					{content && (isValidElement(content) ? content : <Text>{content}</Text>)}
				</Box>
			</Layer>
		)
	);
};

function JuJiuMain({ children, ...props }) {
	return (
		<Main flex={{ grow: 1, shrink: 1 }} overflow='auto' gap='medium' pad='small' {...props}>
			{children}
		</Main>
	);
}

function JuJiuCard({ children, ...props }) {
	return (
		<Card
			pad='small'
			gap='small'
			background='background-contrast'
			focusIndicator={false}
			flex={false}
			{...props}
		>
			{children}
		</Card>
	);
}

function ButtonLink({ href, children, ...props }) {
	return (
		<Link href={href} passHref legacyBehavior>
			<Button as='a' style={{ textAlign: 'center' }} {...props}>
				{children}
			</Button>
		</Link>
	);
}

function JuJiuInformation({ label, size, ...props }) {
	return (
		<Box direction='row' gap='small' align='center' flex={false} margin={{ horizontal: 'small' }} {...props}>
			<CircleInformation size={size} color='accent-4' />
			<Text size='small' color='accent-4' textAlign='justify'>
				{label}
			</Text>
		</Box>
	);
}

function InfoGroup({ data }) {
	return (
		<JuJiuCard>
			<CardBody>
				<List
					pad={{ vertical: 'small' }}
					data={data}
					border={false}
					primaryKey='key'
					secondaryKey={(item) => (
						<Text key={item.key} size='small' color='text-xweak'>
							{item.value}
						</Text>
					)}
				/>
			</CardBody>
		</JuJiuCard>
	);
}

function ButtonGroup({ data }) {
	return (
		<JuJiuCard pad='none'>
			<CardBody>
				<List pad='small' data={data} border={false}>
					{(datum) =>
						datum.href ? (
							<Link href={datum.href} passHref legacyBehavior>
								<Button
									icon={<FormNext color='control' />}
									label={datum.label}
									disabled={!!datum.disabled}
									reverse
									plain
									justify='between'
								/>
							</Link>
						) : (
							<Button
								icon={<FormNext color='control' />}
								label={datum.label}
								disabled={!!datum.disabled}
								reverse
								plain
								justify='between'
								onClick={datum.onClick}
							/>
						)
					}
				</List>
			</CardBody>
		</JuJiuCard>
	);
}

function LinkGroup({ data }) {
	return (
		<JuJiuCard>
			<CardBody>
				<List pad={{ vertical: 'small' }} data={data} border={false}>
					{(datum) => (
						<Link href={datum.href} passHref legacyBehavior>
							<Button
								as='a'
								icon={<FormNext color='control' />}
								label={datum.label}
								reverse
								plain
								justify='between'
							/>
						</Link>
					)}
				</List>
			</CardBody>
		</JuJiuCard>
	);
}

function IconBack({ onClick }) {
	const router = useRouter();
	return (
		<Button
			icon={<FormPrevious color='control' />}
			onClick={() => {
				onClick && onClick();
				router.back();
			}}
		/>
	);
}

function IconButton({ icon, label, onClick, disabled }) {
	return (
		<Button onClick={onClick} disabled={disabled}>
			<Box pad='small' align='center'>
				{icon}
				<Text size='small'>{label}</Text>
			</Box>
		</Button>
	);
}

function IconLink({ icon, label, href }) {
	return (
		<Link href={href} passHref legacyBehavior>
			<Button as='a'>
				<Box pad='small' align='center'>
					{icon}
					<Text size='small'>{label}</Text>
				</Box>
			</Button>
		</Link>
	);
}

export {
	JuJiuTag,
	JuJiuLinkTag,
	JuJiuLayer,
	LoadingLayer,
	ConfirmLayer,
	JuJiuMain,
	JuJiuCard,
	ButtonLink,
	JuJiuInformation,
	InfoGroup,
	ButtonGroup,
	LinkGroup,
	IconBack,
	IconButton,
	IconLink,
};
