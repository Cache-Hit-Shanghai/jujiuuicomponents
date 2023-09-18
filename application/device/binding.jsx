import { Box, Heading, Form, FormField, TextInput } from 'grommet';
import { Wifi } from 'grommet-icons';
import { JuJiuInformation } from '../../core/core_ui';


export function WiFiBinding() {
  return (
    <>
      <Box flex={false} fill='horizontal'>
        <Box direction='row' align='center' gap='small' justify='center'>
          <Wifi size='large' />
          <Heading level={2}>WiFi设置</Heading>
        </Box>
        <Form>
          <FormField label='WiFi名称(SSID)' />
          <FormField label='WiFi密码' name='password' htmlFor='password'>
            <TextInput name='password' id='password' type='password' />
          </FormField>
        </Form>
      </Box>
      <JuJiuInformation size='large' label='请输入需要网络摄像机连接的WiFi名称和密码，随后点击“下一步”。' />
    </>
  );
}