'use client';

import { useJuJiuT } from '@/state/translate';
import { Box, Button, Text, Anchor, Nav, Stack, Card, CardBody, CheckBox, Tag } from 'grommet';
import { Link } from '@/state/translate';
import { cloudStorageData } from '../../data/cloud-storage';

function CloudStorageAvailableSets({ priceList = [], selectedCombo, onSelect }) {
	const t = useJuJiuT();

	return (
		<>
			{priceList.map(({ _id, price, discount, info } = {}) => (
				<Stack anchor='top-right' key={_id}>
					<Card pad='large' gap='medium' flex={false} background='background-contrast'>
						<CardBody direction='row' justify='between' align='center'>
							<Box direction='row' gap='small'>
								<CheckBox
									checked={selectedCombo?._id === _id}
									label=''
									onChange={({ target: { checked } }) => onSelect({ _id, price, discount, info, checked })}
								/>
								<Text>
									{info.day}
									{t('天')}
								</Text>
							</Box>
							<Text>
								{t(cloudStorageData.comboTitle[info.month])}
								{t('套餐')}
							</Text>
							<Box align='end'>
								<Text>￥{(price - discount) / 1000}</Text>
								<Text size='small' color='text-xweak'>
									<strike>￥{price / 1000}</strike>
								</Text>
							</Box>
						</CardBody>
					</Card>
					{discount && <Tag value={t('惠')} size='small' background='status-critical' />}
				</Stack>
			))}
		</>
	);
}

function PayFooter({ paymentList, combo, onPay }) {
	const t = useJuJiuT();

	return (
		<>
			<Box pad='medium' gap='small' background='background-contrast' flex={false}>
				{combo.price && (
					<Box direction='row' align='end' justify='between'>
						<Text size='small'>
							{t('已优惠')}:￥{combo.discount / 1000}
						</Text>
						<Text size='small'>
							{t('需支付')}:<Text color='neutral-3'>￥{(combo.price - combo.discount) / 1000}</Text>
						</Text>
					</Box>
				)}
			</Box>
			<Box direction='row' justify='evenly'>
				{paymentList.map(({ payment, Icon, background }) => (
					<Button key={payment} disabled={!combo._id} onClick={() => onPay({ payment })}>
						<Box round direction='row' align='center' pad='small' gap='small' background={background}>
							<Icon size='24' />
							<Text size='small'>{t('确认协议并支付')}</Text>
						</Box>
					</Button>
				))}
			</Box>
			<Box align='center'>
				<Text size='small'>
					{t('请阅读')}
					<Link href='/doc/cloud-storage-service' passHref legacyBehavior>
						<Anchor label={`《${t('云存储服务条款')}》`} />
					</Link>
				</Text>
			</Box>
		</>
	);
}

export { CloudStorageAvailableSets, PayFooter };
