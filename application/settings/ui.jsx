import { Select, Box } from 'grommet';
import { JuJiuItem } from '../../core/core_item';


export function ChangeUI() {
  return (
    <>
      <JuJiuItem label='语言'>
        <Box width='small'>
          <Select options={['简体中文', 'English']} />
        </Box>
      </JuJiuItem>
      <JuJiuItem label='字体大小'>
        <Box width='small'>
          <Select options={['大字体', '小字体']} />
        </Box>
      </JuJiuItem>
      <JuJiuItem label='主题'>
        <Box width='small'>
          <Select options={['浅色模式', '深色模式', '跟随系统']} />
        </Box>
      </JuJiuItem>
    </>
  );
}