import { Button } from '@nextui-org/react';
import { Alipay } from '@styled-icons/remix-fill/Alipay';
import { WechatPay } from '@styled-icons/remix-line/WechatPay';

export function PayPanel({ discount, price }) {
	return (
		<div className='flex flex-col gap-2'>
			<div className='flex flex-row items-center justify-between text-xs'>
				<p>
					已优惠：
					<span>￥{discount}</span>
				</p>
				<p>
					需支付：<span className='text-base text-warning'>￥{discount}</span>{' '}
					<span className='text-default-500 line-through'>
						￥{discount + price}
					</span>
				</p>
			</div>
			<div className='flex flex-row items-center gap-2'>
				<Button
					size='sm'
					className='bg-wechat flex-1'
					startContent={<WechatPay size={24} />}
				>
					确认协议并支付
				</Button>
				<Button
					size='sm'
					className='bg-alipay flex-1'
					startContent={<Alipay size={24} />}
				>
					确认协议并支付
				</Button>
			</div>
		</div>
	);
}
