import { Box, Pagination } from 'grommet';

/**
 * @param {import('grommet').PaginationType} props
 */
function HelpFeedbackPagination(props) {
	return (
		<Box align='center' pad='small'>
			<Pagination {...props} />
		</Box>
	);
}

export { HelpFeedbackPagination };
