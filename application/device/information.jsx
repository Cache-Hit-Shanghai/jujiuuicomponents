'use client';

import { Text, Box, Button } from 'grommet';
import { Wifi, ChatOption, Run, Pan, Copy } from 'grommet-icons';
import {
  JuJiuItemText,
  JuJiuItemTextArray,
  JuJiuItem,
  JuJiuCollapsible,
} from '../../core/core-item';

export function DeviceInformation() {
  return (
    <>
      <JuJiuItemText label='设备型号' value='云探1' />
      <JuJiuItemText label='序列号' value='GF12345678' />
      <JuJiuCollapsible label='设备统一SN'>
      <Box border pad='small' gap='small' direction='row'>
        <Text
          size='small'
          wordBreak='break-all'
          textAlign='justify'
          color='text-xweak'
        >
          jujiucloud.f7934b38-82ac-4059-9382-c70b38b15cdd.1689058115620.EKQF230ZsIk-fwmFkWyQ0
        </Text>
        <Button pad='none' icon={<Copy />} />
      </Box>
      </JuJiuCollapsible>
      <JuJiuItem label='设备特性'>
        <Box direction='row' gap='small' align='center'>
          <Box align='center'>
            <Wifi color='text-xweak' />
            <Text color='text-xweak' size='small'>
              WiFi
            </Text>
          </Box>
          <Box align='center'>
            <ChatOption color='text-xweak' />
            <Text color='text-xweak' size='small'>
              双向语音
            </Text>
          </Box>
          <Box align='center'>
            <Run color='text-xweak' />
            <Text color='text-xweak' size='small'>
              移动侦测
            </Text>
          </Box>
          <Box align='center'>
            <Pan color='text-xweak' />
            <Text color='text-xweak' size='small'>
              云台
            </Text>
          </Box>
        </Box>
      </JuJiuItem>
      <JuJiuItemText label='设备固件版本' value='V1.0.3' />
      <JuJiuItemText
        label='设备当前WiFi'
        value='DX-OFFICE'
        icon={<Wifi color='text-xweak' />}
      />
      <JuJiuItemTextArray
        label='IP地址'
        value={['192.168.100.127', 'fe80::64a6:2309:8880:7903']}
      />
      <JuJiuItemText label='MAC地址' value='6c:f1:7e:9f:83:a2' />
      <JuJiuItemText label='已开机' value='158:12:05' />
    </>  
  );
}
