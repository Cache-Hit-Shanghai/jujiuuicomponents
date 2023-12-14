import { Card, CardBody, RadioGroup, Radio } from '@nextui-org/react';

export function BundlePanel({ bundles }) {
	return (
		<RadioGroup>
			{bundles.map(({ label, price, discount }) => (
				<Card key={label}>
					<CardBody>
						<Radio
							value={label}
							classNames={{
								base: 'max-w-full h-fit p-0 m-0',
								labelWrapper: 'w-full',
							}}
						>
							<div className='flex flex-row items-center justify-between'>
								<p>{label}</p>
								<div className='flex flex-col items-end'>
									<p className='text-warning'>￥{price}</p>
									<p className='text-xs line-through text-default-500'>
										￥{price + discount}
									</p>
								</div>
							</div>
						</Radio>
					</CardBody>
				</Card>
			))}
		</RadioGroup>
	);
}
