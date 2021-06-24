import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { API, graphqlOperation } from 'aws-amplify';
import { clientIdVar, eventIdVar } from '../../../../../stores/cache';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { listEvents, getTable } from '../../../../../graphql/queries';
import { updateTable } from '../../../../../graphql/mutations';
import history from '../../../../../utils/history';
import { Collapse, TextField, Button, MenuItem } from '@material-ui/core';
import { parseFormDate } from '../../../../../utils/parseFormDate';
//import { sortEvents } from '../../../../../utils/sortEvents';
import ModalWindow from '../../../../../utils/imgModal';
import { putStorage } from '../../../../../utils/awsStorage';



interface Props {
	userGroups: string[];
};


const useStyles: any = makeStyles((theme: Theme) => createStyles({
	root: {
		'& > *': {
			width: '35ch',
			margin: theme.spacing(1)
		}
	},
	select: {
		width: '50%'
	},
	input: {
		display: 'none'
	},
	submit: {
		margin: 'auto',
		//border: '1px solid blue',
		//width: '100%'
		textAlign: 'center',
		float: 'right'
	}
}));


const EditTable: any = (props: Props) => {

	let { id }: any = useParams();
	const classes: any = useStyles();
	//let clientId: string = useReactiveVar(clientIdVar);
	let eventId: string = useReactiveVar(eventIdVar);

	const [hideDiv, setHideDiv]: any = useState(false);
	const [pageTitle, setPageTitle]: any = useState('Edit Table Details');
	const [showSubmit, setShowSubmit]: any = useState(true);
	const [origImg, setOrigImg]: any = useState('');
	//const [events, setEvents]: any = useState([]);

	const [tableInfo, setTableInfo]: any = useState({
		id: id,
		table_name: '',
		capacity: 8,
		createdAt: '',
		updatedAt: '',
		event_id: eventId,
		table_logo: ''
	});

	const updateTableInfo: any = (key: string, value: string) => setTableInfo({...tableInfo, [key]: value});

	const onSubmit: any = async (evt: any) => {
		evt.preventDefault();
		let path: string = '/cms/client/event/tables?action=';
		let action: string = 'error';
		try{
			let imgName: string = await updateImg();
			saveTableData(imgName);
			action = 'updated';
		}catch( err: any ){}
		history.push(path + action);
	};

	const onTableChange: any = (evt: any) => {
		evt.preventDefault();
		let name: string = evt.target.name;
		let value: any = evt.target.value;
		updateTableInfo(name, value);

		switch( name ){
			case 'table_name':
				if( value && tableInfo.event_id ){ setShowSubmit(true); }
				else{ setShowSubmit(false); }
			break;
			case 'event_id':
				if( value && tableInfo.table_name ){ setShowSubmit(true); }
				else{ setShowSubmit(false); }
			break;
		}
	};

	const changeImg: any = (evt: any) => {
		updateTableInfo(evt.target.name, evt.target.files[0]);	// key = string, value = obj
	};

	const updateImg: any = async () => {
		let rtn: string = '';
		//console.log('updateImg:', tableInfo.table_logo);

		if( tableInfo.table_logo && tableInfo.table_logo.name ){
			const s3Obj: any = await putStorage(tableInfo.table_logo, 'tables', id);
			//console.log('s3Obj:', s3Obj);
			if( s3Obj.data.key ){
				let newLogoPath: string = s3Obj.data.key;
				updateTableInfo('table_logo', newLogoPath);
				rtn = newLogoPath;
			}
		}

		return rtn;
	};

	const saveTableData: any = (imgName: string) => {
		let capacity: number = 8;
		if( tableInfo.capacity ){
			capacity = parseInt(tableInfo.capacity);
		}
		imgName = (imgName || tableInfo.table_logo);

		const params: any = {
			input: {
				id: tableInfo.id,
				event_id: tableInfo.event_id,
				table_name: tableInfo.table_name,
				capacity: capacity,
				table_logo: imgName
			}
		};
		//console.log('params:', params);

		API.graphql(graphqlOperation( updateTable, params ));
	};

	const getTableData: any = async () => {
		const params: any = {
			id: id
		};

		const result: any = await API.graphql(graphqlOperation( getTable, params ));
		//console.log('result:', result);

		try{
			const row: any = result.data.getTable;
			setTableInfo({
				id: row.id,
				table_name: row.table_name,
				capacity: row.capacity,
				createdAt: row.createdAt,
				updatedAt: row.updatedAt,
				event_id: row.event_id,
				table_logo: row.table_logo
			});

			if( row.table_logo ){
				setOrigImg(row.table_logo);
			}
		}catch( err: any ){}
	};

	/*const getAllEvents: any = async () => {
		const params: any = {
			filter: {client_id: {eq: clientId}}
		};

		const result: any = await API.graphql(graphqlOperation( listEvents, params ));

		const tmpEvts: any = [];

		result.data.listEvents.items.map((row: any) => {
			//console.log('row:', row);
			tmpEvts.push({
				id: row.id,
				event_name: row.event_name,
				start_date: row.start_date,
				end_date: row.end_date
			});
		});

		if( tmpEvts.length ){ setEvents(tmpEvts); }
	};*/

	useEffect(() => {
		getTableData();
		//getAllEvents();
	}, []);

	return(
		<div>
			<br />
			<div className="toggleHeader" onClick={() => setHideDiv(!hideDiv)}>
				{pageTitle}
			</div>

			<Collapse in={true}>
				{hideDiv
					? null
					: (
						<form className={classes.root}>

							<TextField name="table_name"
								label="Table Name:"
								required
								value={tableInfo.table_name}
								onChange={onTableChange} />

							<TextField name="capacity"
								label="Capacity:"
								type="number"
								value={tableInfo.capacity}
								onChange={onTableChange} />

							{/*<TextField name="event_id"
									label="Event:"
									value={tableInfo.event_id}
									onChange={onTableChange}
									select>
								<MenuItem value="" disabled>
									<i>- Select -</i>
								</MenuItem>
								{sortEvents(events).map((row: any, idx: number) => {
									return(
										<MenuItem key={idx} value={row.id}>
											{row.event_name} ({parseFormDate(row.start_date)} - {parseFormDate(row.end_date)})
										</MenuItem>
									);
								})}
							</TextField>*/}

							<label>
								<br />
								{origImg
									? <ModalWindow imgPath={origImg} />
									: null
								}

								<br />

								<input name="table_logo"
									className={classes.input}
									accept="image/*"
									onChange={changeImg}
									type="file"/>

								<Button color="secondary"
									variant="contained"
									component="span">
									Add Logo
								</Button>

								{tableInfo.table_logo && tableInfo.table_logo.name
									? (<span><br /><br />New:&nbsp;{tableInfo.table_logo.name}<br /></span>)
									: null
								}

								<br />
							</label>

							{props.userGroups.indexOf('TableAdmin') > -1
								? (
									<><br />
										<TextField label="Created Date:" value={parseFormDate(tableInfo.createdAt)} disabled />
										<TextField label="Updated Date:" value={parseFormDate(tableInfo.updatedAt)} disabled />
										{showSubmit
											? (
												<div className={classes.submit}>
													<br /><br />
													<Button variant="contained"
															color="primary"
															onClick={onSubmit}>
														{pageTitle}
													</Button>
												</div>
											)
											: null
										}
									</>
								)
								: null
							}

						</form>
					)
				}
			</Collapse>
		</div>
	);
};


export default EditTable;