import { Box, Typography } from '@material-ui/core';


const TabPanel: any = (props: any) => {
	const { children, value, index, ...other }: any = props;

	return(
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`nav-tabpanel-${index}`}
			aria-labelledby={`nav-tab-${index}`}
			{...other}
		>
		{value === index && (
			<Box p={3}>
				<Typography component={'span'}>{children}</Typography>
			</Box>
		)}
		</div>
	);
};


export default TabPanel;