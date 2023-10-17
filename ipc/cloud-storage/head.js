'use client';

import { useJuJiuT } from '@/state/translate';
import { Box, Heading, Text, Card, CardHeader, CardBody } from 'grommet';

function CloudStorageHead() {
	const t = useJuJiuT();

	return (
		<>
			<Box flex={false}>
				<CloudStorageTitle text={t('云存储')} />
				<CloudStorageDesc text={t('不会丢失的录像文件存储。')} />
			</Box>
			<Card flex={false}>
				<CardHeader pad='small' background='background-front'>
					<Text size='large' weight='bold'>
						{t('安全、可靠的云存储')}
					</Text>
				</CardHeader>
				<CardBody pad='small' background='background-contrast' align='center'>
					<Text textAlign='justify'>
						{t(
							'云存储可以将您的重要数据保存在云端。它可以避免数据的丢失、泄露以及人为破坏。您可以在世界上任何一个角落访问云存储上的文件。它具有金融级安全，能尽可能的保护您的隐私。即使设备被破坏而导致无法使用，已保存在云存储中的文件仍然安然无恙。'
						)}
					</Text>
				</CardBody>
			</Card>
		</>
	);
}

function CloudStorageTitle({ text }) {
	return (
		<Heading level={2} margin='none'>
			{text}
		</Heading>
	);
}

function CloudStorageDesc({ text }) {
	return (
		<Text size='small' color='text-xweak'>
			{text}
		</Text>
	);
}

export { CloudStorageHead, CloudStorageTitle, CloudStorageDesc };
