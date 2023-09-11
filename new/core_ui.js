import { Tag, Box, Text, Layer, Card, Button, Main, CardBody, List } from 'grommet';
import { CircleInformation, FormPrevious, FormNext } from 'grommet-icons';
import { useRouter } from 'next/navigation';
import Link from '@/state/translate';
import TimePicker from '@ashwinthomas/react-time-picker-dropdown';

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
      <Box as='a'>
        <JuJiuTag icon={icon} label={label} background={background} />
      </Box>
    </Link>
  );
}

function JuJiuLayer({ onClickOutside, position, children, ...props }) {
  return (
    <Layer position={position || 'bottom'} full='horizontal' responsive={false} onClickOutside={onClickOutside}>
      <Box fill round pad='medium' gap='medium' background='background-front' {...props}>
        {children}
      </Box>
    </Layer>
  );
}

function JuJiuMain({ children, ...props }) {
	return (
		<Main
			flex={{ grow: 1, shrink: 1 }}
			overflow='auto'
			gap='medium'
			margin='small'
			{...props}
		>
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
      <Text size='small' color='accent-4' textAlign='justify'>{label}</Text>
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
					secondaryKey={item => <Text size='small' color='text-xweak'>{item.value}</Text>}
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
					{(datum) => (
						<Button
							icon={<FormNext color='control' />}
							label={datum.label}
							disabled={!!datum.disabled}
							reverse
							plain
							justify='between'
							onClick={datum.onClick}
						/>
					)}
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
						<Link href={datum.url} passHref legacyBehavior>
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

function IconBack() {
	const router = useRouter();
	return (
		<Button
			icon={<FormPrevious color='control' />}
			onClick={() => router.back()}
		/>
	);
}

function IconButton({ icon, label, onClick }) {
	return (
		<Button onClick={onClick}>
			<Box pad='small' align='center'>
				{icon}
				<Text size='small'>{label}</Text>
			</Box>
		</Button>
	);
}

function IconLink({ icon, label, url }) {
	return (
		<Link href={url} passHref legacyBehavior>
			<Button as='a'>
				<Box pad='small' align='center'>
					{icon}
					<Text size='small'>{label}</Text>
				</Box>
			</Button>
		</Link>
	);
}


export { JuJiuTag, JuJiuLinkTag, JuJiuLayer, JuJiuMain, JuJiuCard, ButtonLink, JuJiuInformation, InfoGroup, ButtonGroup, LinkGroup, IconBack, IconButton, IconLink };