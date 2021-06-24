import { NavLink } from 'react-router-dom';
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';


interface Props {};


const useStyles: any = makeStyles((theme: Theme) => createStyles({
	root: {
		width: '100%'
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
		//color: theme.palette.text.secondary
	}
}));


const CoreNavLinks: any = (props: Props) => {

	const classes: any = useStyles();

	return(
		<div className={classes.root}><br />

			<Accordion>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography className={classes.heading}>Core</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						<ul style={{ listStyleType: "circle" }}>
							<li><NavLink to="/cms/core/users">Users</NavLink></li>
							<li><NavLink to="/cms/core/clients">Clients</NavLink></li>
							<li><NavLink to="/cms/core/settings">Settings</NavLink></li>
							<li><NavLink to="/cms/core/clientTbls">Client DB Tables</NavLink></li>
						</ul>
					</Typography>
				</AccordionDetails>
			</Accordion>

		</div>
	);

};


export default CoreNavLinks;