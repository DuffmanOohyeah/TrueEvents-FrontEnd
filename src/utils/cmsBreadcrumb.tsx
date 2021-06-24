import { Breadcrumbs, Link, Typography } from '@material-ui/core';


interface Props {
	section: String;
	page: String;
};


const CmsBreadcrumb: any = (props: Props) => {

	return(
		<Breadcrumbs>
			<Link color="inherit" href="/">
				Home
			</Link>
			<Typography color="initial" component={'span'}>
				{props.section || 'Event'}
			</Typography>
			{props.page
				? (
					<Typography color="initial" component={'span'}>
						{props.page}
					</Typography>
				)
				: null
			}
		</Breadcrumbs>
	);

};


export default CmsBreadcrumb;