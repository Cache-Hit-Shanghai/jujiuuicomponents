import { Box, Text, CardBody, Button } from 'grommet';
import { FormNext } from 'grommet-icons';
import { JuJiuCard, ButtonLink } from './Components';


function JuJiuRawItem({ onClick, children }) {
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
      <Box
        direction='row'
        align='center'
        justify='between'
      >
        <Text>{label}</Text>
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
        <Text size='small' color='text-xweak'>{value}</Text>
      </Box>
    </JuJiuItem>
  );
}

export function JuJiuItemTextArray({ label, value }) {
  return (
    <JuJiuItem label={label}>
      <Box align='end'>
        { value.map(e => <Text size='small' color='text-xweak'>{e}</Text>) }
      </Box>
    </JuJiuItem>
  );
}

export function JuJiuItemButton({ label, value, onClick }) {
  return (
    <JuJiuItem label={label} onClick={onClick}>
      <Button plain reverse pad='none' label={<Text size='small' color='text-xweak'>{value}</Text>} icon={<FormNext color='control' />} />
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
    <JuJiuRawItem label={label}>
      <ButtonLink href={href}>
        <Box
          direction='row'
          align='center'
          justify='between'
        >
          <Text>{label}</Text>
          <FormNext color='control' />
        </Box>
      </ButtonLink>
    </JuJiuRawItem>
  );
}