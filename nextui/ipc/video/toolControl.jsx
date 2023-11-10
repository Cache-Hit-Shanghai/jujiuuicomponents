'use client';

import { Button, Badge, Divider, Tabs, Tab, Spinner } from '@nextui-org/react';
import {
	CameraIcon,
	ArrowTopRightOnSquareIcon,
	Cog6ToothIcon,
	ExclamationTriangleIcon,
} from '@heroicons/react/24/solid';
import { NavbarBack, LinkButton } from '@/jujiu-ui-components/nextui/core/core-ui';
import { ChipRecording } from '@/jujiu-ui-components/nextui/core/core-chips';
import { PanControl } from '@/jujiu-ui-components/nextui/ipc/video/panControl';
import { AppLogo } from '@/jujiu-ui-components/nextui/ipc/about/brand';
import Link from '@/state/translate';
import { EnvelopeIcon } from '@heroicons/react/24/solid';
import { Orientation } from '@styled-icons/fluentui-system-filled/Orientation';
import { useJuJiuT } from '@/state/translate';

export function ScreenCopyControl() {
	const t = useJuJiuT();
	const label = t('截图');

	return (
		<Button isIconOnly variant='light'>
			<div className='flex flex-col items-center'>
				<CameraIcon className='h-6 w-6' />
				<p>{label}</p>
			</div>
		</Button>
	);
}
