import {
	Switch,
	Button,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Image,
	Chip,
	CircularProgress,
	Link as Anchor,
} from '@nextui-org/react';
import Link, { useJuJiuT } from '@/state/translate';
import { ChevronRight } from '@styled-icons/material/ChevronRight';

// The parameters 'occupied' and 'totle' designate for the occupied
// and the totle space of the cloud drive. The units are MB.
export function CloudDriveCard({ src, occupied, totle }) {
	const t = useJuJiuT();

	return (
		<Card as={Link} href='/my/gallery'>
			<CardHeader className='text-xs text-default-500'>
				{t('正在为你长期保存文件')}
			</CardHeader>
			<CardBody className='flex flex-row gap-4'>
				<Image src={src} />
				<div className='flex flex-col items-center gap-4 justify-center'>
					<CircularProgress
						size='lg'
						showValueLabel
						value={(occupied * 100) / totle}
					/>
					<div className='text-xs'>
						<span>{`${occupied}M`}</span>
						<span className='text-default-500'>{`/${totle}G`}</span>
					</div>
					<Chip size='sm' color='primary'>
						{t('进入云盘')}
					</Chip>
				</div>
			</CardBody>
			<CardFooter className='flex flex-row justify-between'>
				<div>{t('云盘')}</div>
				<ChevronRight size={24} />
			</CardFooter>
		</Card>
	);
}
