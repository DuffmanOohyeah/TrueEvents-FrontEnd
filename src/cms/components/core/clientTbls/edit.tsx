import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import history from '../../../../utils/history';
import { Collapse, TextField, Button, InputLabel } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import moment from 'moment';
import { describeTable, updateTable } from '../../../../utils/dynamoService';


interface Props {};
let dtFormat: string = 'DD/MM/YYYY';


const attTypeName: any = (abbr: string) => {
	let rtn: string = '';
	switch( abbr ){
		case 'S':
			rtn = 'String';
		break;
		case 'N':
			rtn = 'Number';
		break;
		case 'B':
			rtn = 'Binary';
		break;
	}
	return rtn;
};


const useStyles: any = makeStyles((theme: Theme) => createStyles({
	root: {
		'& > *': {
			width: '35ch',
			margin: theme.spacing(1)
		}
	},
	input: {
		display: 'none'
	},
	submit: {
		margin: 'auto',
		//border: '1px solid blue',
		width: '55%',
		textAlign: 'center',
		float: 'right'
	}
}));


const EditClientTbl: any = (props: Props) => {

	let { id }: any = useParams();
	const [hideDiv, setHideDiv]: any = useState(false);
	const [showSubmit, setShowSubmit]: any = useState(false);

	const [tableInfo, setTableInfo]: any = useState({
		id: id,
		dtCreated: '',
		status: '',
		bytes: 0,
		items: 0,
		attributeDefs: [],
		decreasesToday: 0,
		readUnits: 0,
		writeUnits: 0,
		readUnits_orig: 0,
		writeUnits_orig: 0,
		billingMode: ''
	});

	const classes: any = useStyles();

	const onTableChange: any = (evt: any) => {
		let name: string = evt.target.name;
		let value: string = evt.target.value;
		let intVal: number = parseInt(value);

		updateTableInfo(name, value);

		switch( name ){
			case 'readUnits':
				if( intVal > -1 && (intVal !== tableInfo.readUnits_orig) ){
					setShowSubmit(true);
				}else{
					setShowSubmit(false);
				}
			break;
			case 'writeUnits':
				if( intVal > -1 && (intVal !== tableInfo.writeUnits_orig) ){
					setShowSubmit(true);
				}else{
					setShowSubmit(false);
				}
			break;
		}
	};

	const updateTableInfo: any = (key: string, value: string) => setTableInfo({...tableInfo, [key]: value});

	const onSubmit: any = async (evt: any) => {
		evt.preventDefault();
		try{
			saveTableData();
			history.push('/cms/core/clientTbls/?action=updated');
		}catch( err: any ){
			history.push('/cms/core/clientTbls/?action=error');
		}
	};

	const saveTableData: any = () => updateTable(id, tableInfo.readUnits, tableInfo.writeUnits);

	const parseDate: any = (date: any) => {
		let rtn: string = 'n/a';
		//console.log('date:', `${date} - ${moment(date).isValid()}`);
		if( moment(date).isValid() ){
			rtn = moment(date).format(dtFormat);
		}
		return rtn;
	};

	const descTable: any = async () => {
		const desc: any = await describeTable(id);
		//console.log('desc:', desc);
		const tblObj: any = { id: id };

		if( desc.Table ){
			const obj: any = desc.Table;
			tblObj['status'] = obj.TableStatus;
			tblObj['bytes'] = obj.TableSizeBytes;
			tblObj['dtCreated'] = obj.CreationDateTime;
			tblObj['items'] = obj.ItemCount;
			tblObj['attributeDefs'] = obj.AttributeDefinitions;
			if( obj.ProvisionedThroughput ){
				tblObj['decreasesToday'] = obj.ProvisionedThroughput.NumberOfDecreasesToday;
				tblObj['readUnits'] = obj.ProvisionedThroughput.ReadCapacityUnits;
				tblObj['writeUnits'] = obj.ProvisionedThroughput.WriteCapacityUnits;
				tblObj['readUnits_orig'] = tblObj['readUnits'];
				tblObj['writeUnits_orig'] = tblObj['writeUnits'];
			}
			if( obj.BillingModeSummary.BillingMode ){
				tblObj['billingMode'] = obj.BillingModeSummary.BillingMode;
			}
		}

		setTableInfo(tblObj);
	};

	useEffect(() => {
		descTable();
	}, []);

	return(
		<div>

			<div className="toggleHeader" onClick={() => setHideDiv(!hideDiv)}>
				Edit Client DB Table
			</div>

			<Collapse in={true}>
				{hideDiv
					? null
					: (
						<form className={classes.root}>

							<TextField label="Full Name:" value={id} disabled />
							<TextField label="Status:" value={tableInfo.status} disabled />
							<TextField label="Byte Size:" value={tableInfo.bytes} disabled />
							<TextField label="Item Count:" value={tableInfo.items} disabled />
							<TextField label="Date Created:" value={parseDate(tableInfo.dtCreated)} disabled />
							<TextField label="Decreases Today:" value={tableInfo.decreasesToday} disabled />
							<TextField label="Read Capacity Units:" value={tableInfo.readUnits} name="readUnits" type="number" required onChange={onTableChange} />
							<TextField label="Write Capacity Units:" value={tableInfo.writeUnits} name="writeUnits" type="number" required onChange={onTableChange} />

							<div style={{ width: '100%' }}>

								<div style={{ float: 'left', width: '45%' }}>
									<InputLabel id="att-block">Attributes:</InputLabel>
									<ul>
										{tableInfo.attributeDefs.map((att: any, idx: number) => {
											return(
												<li key={idx} style={{listStyle: 'circle'}}>
													{att.AttributeName}
													&nbsp;
													({attTypeName(att.AttributeType)})
												</li>
											);
										})}
									</ul>
								</div>

								<TextField label="Billing Mode:" value={tableInfo.billingMode.replace(/_/g, ' ')} disabled />

							</div>

							<br />

							<div className={classes.submit}>
								{tableInfo.billingMode == 'PAY_PER_REQUEST'
									? (<>Cannot update table due to billing mode shown.</>)
									: (showSubmit
										? (
											<Button variant="contained"
												color="primary"
												onClick={onSubmit}>
												Edit Client DB Table
											</Button>
										)
										: null
									)
								}
							</div>

						</form>
					)
				}
			</Collapse>

		</div>
	);
};


export default EditClientTbl;