import { useState } from 'react';
import { Alert } from '@material-ui/lab';
import { IconButton, Collapse } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';


interface Props {
	show: boolean;
	severity: string;
	text: string;
};


const ShowAlert: any = (props: Props) => {

	//console.log('props:', props);
	//console.log('location:', window.location);

	const [propCopy, setPropCopy]: any = useState({
		show: props.show,
		severity: props.severity,
		text: props.text
	});

	const updateProps: any = (key: string, value: string) => {
		setPropCopy({
			...propCopy,
			[key]: value
		});
	};

	return(
		<div><br />
			<Collapse in={propCopy.show}>

				<Alert
					severity={propCopy.severity}
					action={
						<IconButton
							aria-label="close"
							color="inherit"
							size="small"
							onClick={() => updateProps('show', false)}
						>
							<CloseIcon fontSize="inherit" />
						</IconButton>
					}
				>
					{propCopy.text}
				</Alert>
			</Collapse>
		</div>
	);
};


export default ShowAlert;