import { CheckBox } from 'grommet';
import { JuJiuItem } from '../../core/core_item';


export function ChangeNotification() {
  return (
    <>
      <JuJiuItem label='设备访问'>
        <CheckBox toggle />
      </JuJiuItem>
      <JuJiuItem label='设备状态'>
        <CheckBox toggle />
      </JuJiuItem>
      <JuJiuItem label='设备异常'>
        <CheckBox toggle />
      </JuJiuItem>
      <JuJiuItem label='设备分享'>
        <CheckBox toggle />
      </JuJiuItem>
      <JuJiuItem label='服务提醒'>
        <CheckBox toggle />
      </JuJiuItem>
      <JuJiuItem label='公告'>
        <CheckBox toggle />
      </JuJiuItem>
    </>
  );
}

export function ChangeAIAlarm() {
  return (
    <>
      <JuJiuItem label='画面有人移动'>
        <CheckBox toggle />
      </JuJiuItem>
      <JuJiuItem label='画面人脸识别结果'>
        <CheckBox toggle />
      </JuJiuItem>
      <JuJiuItem label='看护区域有人移动'>
        <CheckBox toggle />
      </JuJiuItem>
    </>
  );
}