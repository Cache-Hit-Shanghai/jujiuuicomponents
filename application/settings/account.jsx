import { Heading, Button, TextInput } from 'grommet';
import { JuJiuInformation } from '../../core/core_ui';


export function ChangeAvatar() {
  return (
    <>
      <Heading level={3} alignSelf='center' margin='none'>更换头像</Heading>
      <Button label='拍照' />
      <Button label='本地相册' />
    </>
  );
}

export function ChangeNickname() {
  return (
    <>
      <Heading level={3} alignSelf='center' margin='none'>修改昵称</Heading>
      <TextInput placeholder='请填写昵称……' />
      <JuJiuInformation label='请设置2-20个字符，不能使用@《等字符。' />
    </>
  );
}