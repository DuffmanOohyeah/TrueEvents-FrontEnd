//import ModalWindow from '../../../../../utils/imgModal';
import SocialMedias from './socialMedias';
import { isEmailValid } from '../../../../../utils/isEmailTools';
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	Avatar
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { getStorage } from '../../../../../utils/awsStorage';
import { useState, useEffect } from 'react';


interface Props {
	presenterArr: any[];
};

const useStyles: any = makeStyles((theme: Theme) => createStyles({
	root: {
		width: '100%'
	},
	heading: {
		//fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular
	},
	summary: {
		backgroundColor: '#F5F5F5'
	}
}));


const Presenters: any = (props: Props) => {

	const presenters: any[] = (props.presenterArr || []);
	const classes: any = useStyles();
	const [s3Presenters, setS3Presenters]: any = useState([]);

	const linkEmail: any = (email: string) => {
		let rtn: any = 'n/a';

		if( isEmailValid(email) ){
			let link: string = 'mailto:' + email;
			rtn = <a href={link}>{email}</a>
		}

		return rtn;
	};

	const addPresenterImgs: any = async () => {
		const newArr: any[] = [];

		for( let idx: number = 0; idx < presenters.length; idx++ ){
			const row: any = presenters[idx];

			const presObj: any = {
				id: row.id,
				company: row.company,
				createdAt: row.createdAt,
				email: row.email,
				first_name: row.first_name,
				last_name: row.last_name,
				profile_img: row.profile_img,
				session_id: row.session_id,
				social_medias: row.social_medias,
				title: row.title,
				updatedAt: row.updatedAt
			};

			try{
				if( presObj.profile_img ){
					const getS3Obj: any = await getStorage(presObj.profile_img);
					//console.log('getS3Obj:', getS3Obj);
					if( getS3Obj.success ){ presObj.profile_img = getS3Obj.data; }
				}
			}catch( err: any ){}

			newArr.push(presObj);
		}

		if( newArr.length ){ setS3Presenters(newArr); }
	};

	useEffect(() => {
		addPresenterImgs();
	}, []);

	return(
		<div className={classes.root}>
			{s3Presenters.length
				? (s3Presenters.map((row: any) => {
					{/*console.log('row:', row)*/}
					return(
						<div>
							<span style={{ display: 'inline-block' }}>
								{row.profile_img
									? <Avatar alt="" src={row.profile_img} />
									: null
								}
							</span>
							<span style={{ display: 'inline-block', verticalAlign: 'top' }}>
								<ul>
									<li>
										Name:&nbsp;
										{row.title}&nbsp;
										{row.first_name}&nbsp;
										{row.last_name}
									</li>
									{row.company
										? (<li>Company: {row.company}</li>)
										: null
									}
									{row.email
										? (<li>Email: {linkEmail(row.email)}</li>)
										: null
									}
									{/*row.profile_img
										? (
											<li>
												Profile image:&nbsp;
												{row.profile_img
													? <ModalWindow imgPath={row.profile_img} />
													: (<span>(No image associated)</span>)
												}
											</li>
										)
										: null
									*/}
								</ul>
							</span>

							<Accordion>
								<AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.summary}>
									<Typography className={classes.heading}>
										Social media link(s):
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<SocialMedias mediaArr={row.social_medias.items} />
								</AccordionDetails>
							</Accordion>
						</div>
					);
				}))
				: (<div>You have have not favourited any presenters.</div>)
			}
		</div>
	);

};


export default Presenters;