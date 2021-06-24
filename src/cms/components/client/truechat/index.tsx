import { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { useReactiveVar } from '@apollo/client';
import CmsBreadcrumb from '../../../../utils/cmsBreadcrumb';
import CmsHeader from '../../../../utils/cmsHeader';
import { clientIdVar, userIdVar, eventIdVar } from '../../../../stores/cache';
import { listTables, listSettings } from '../../../../graphql/queries';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
	Card,
	CardContent,
	CardActions,
	CardMedia,
	Badge,
	Button,
	Typography
} from '@material-ui/core';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import { getStorage } from '../../../../utils/awsStorage';


interface Props {};


const useStyles: any = makeStyles((theme: Theme) => createStyles({
	root: {
		width: '22rem',
		minHeight: '200px',
		//height: '200px',
		//minWidth: '350px',
		maxWidth: '350px'
	}
	/*media: {
		height: 0,
		paddingTop: '56.25%' // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: 'rotate(180deg)'
	},
	avatar: {
		backgroundColor: 'red[500]'
	}*/
}));


const TrueChat = (props: Props) => {

	let userId: string = useReactiveVar(userIdVar);
	//let clientId: string = useReactiveVar(clientIdVar);
	let eventId: string = useReactiveVar(eventIdVar);

	const classes: any = useStyles();

	const [tablesData, setTablesData]: any = useState([]);
	const [pageName, setPageName]: any = useState('TrueChat');
	const [chatUrl, setChatUrl]: any = useState('');

	const getTables: any = async () => {
		const params: any = {
			filter: {
				event_id: {eq: eventId}
			}
		};
		const result: any = await API.graphql(graphqlOperation( listTables, params ));
		const tables: any[] = (result.data.listTables.items || []);
		//console.log('getTables:', tables);

		const tmpTbls: any[] = [];

		for( let idx: number = 0; idx < tables.length; idx++ ){
			const row: any = tables[idx];
			let tblLogo: string = '';
			//console.log('row:', row);

			if( row.table_logo ){
				const s3Obj: any = await getStorage(row.table_logo);
				if( s3Obj.success ){ tblLogo = s3Obj.data; }
				//console.log('tblLogo:', tblLogo);
			}

			tmpTbls.push({
				id: row.id,
				table_name: row.table_name,
				capacity: row.capacity,
				table_logo: tblLogo
			});
		}

		if( tmpTbls.length ){ setTablesData(tmpTbls); }
	};

	const getSettings: any = async () => {
		const params1: any = {filter: {setting: {eq: 'chat_name'}}};
		const result1: any = await API.graphql(graphqlOperation( listSettings, params1 ));
		const settings1: any[] = (result1.data.listSettings.items || []);
		//console.log('settings1:', settings1);
		if( settings1.length == 1 ){ setPageName(settings1[0].value); }

		const params2: any = {filter: {setting: {eq: 'chat_url'}}};
		const result2: any = await API.graphql(graphqlOperation( listSettings, params2 ));
		const settings2: any[] = (result2.data.listSettings.items || []);
		//console.log('settings2:', settings2);
		if( settings2.length == 1 ){ setChatUrl(settings2[0].value); }
	};

	const makeChatLink: any = (tableId: string) => {
		let rtn: string = '';

		if( chatUrl ){
			rtn = chatUrl;	// + tableId + '?userid=' + userId + '&username=wendell';
			//if( rtn.charAt(rtn.length - 1) !== '/' ){ rtn += '/'; }
			//rtn += tableId;
			//rtn += '?userid=' + userId;
			//?userid=dsffdsdfs&username=wendellboom&room=60cd155cd200be75e5a14581
			rtn += '?room=' + tableId;
			rtn += '&userid=' + userId;
			//console.log('rtn:', rtn);
		}

		return rtn;
	};

	useEffect(() => {
		getSettings();
		getTables();
	}, []);

	return(
		<div>

			<CmsBreadcrumb section="Chat &amp; Networking" page={pageName} />
			<CmsHeader />
			<br />

			{tablesData.length
				? (
					<>
						{tablesData.map((row: any, idx: number) => {
							let modulus: number = idx % 2;
							let bgImg: string = `${process.env.PUBLIC_URL}/logo192.png`;
							if( row.table_logo ){ bgImg = row.table_logo; }

							return(
								<div key={idx}>
									<Card className={classes.root} style={{ float: (modulus ? 'right' : 'left') }}>
										<CardContent>
											<CardMedia image={bgImg} className="eventBg" component="img" />
											<Typography variant="h5" component="h2">
												{row.table_name}
												<Badge badgeContent={row.capacity} color="primary">
													&nbsp;&nbsp;&nbsp;<ChatOutlinedIcon />
												</Badge>
											</Typography>
											<CardActions disableSpacing className="alignRight faveImg">
												<Button variant="outlined"
														color="primary"
														href={makeChatLink(row.id)}
														target={"_blank"}>
													Join {row.table_name}
												</Button>
											</CardActions>
										</CardContent>
									</Card>

									{modulus
										? (<div style={{ paddingTop: '25px', clear: 'left' }} />)
										: null
									}

								</div>
							);
						})}
					</>
				)
				: (<div>There are no networking tables for this event.</div>)
			}

		</div>
	);

};


export default TrueChat;