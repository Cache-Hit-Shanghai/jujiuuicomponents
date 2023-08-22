import { Tag, Box, Text, Layer, Card, Button } from 'grommet';
import { CircleInformation } from 'grommet-icons';
import Link from 'next/link';


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

function JuJiuLayer({ onClickOutside, children, ...props }) {
  return (
    <Layer position='bottom' full='horizontal' responsive={false} onClickOutside={onClickOutside}>
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
			<Button as='a' {...props}>
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

export { JuJiuTag, JuJiuLinkTag, JuJiuLayer, JuJiuMain, JuJiuCard, ButtonLink, JuJiuInformation };