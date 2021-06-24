import { useState } from 'react';
import { useParams } from 'react-router-dom';
import history from '../../../../utils/history';
import { Collapse, TextField, Button, InputLabel } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import moment from 'moment';
import { createTable } from '../../../../utils/dynamoService';


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


const AddClientTbl: any = (props: Props) => {

	let { id }: any = useParams();
	const [hideDiv, setHideDiv]: any = useState(id ? true : false);
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
			history.push('/cms/core/clientTbls/?action=created');
		}catch( err: any ){
			history.push('/cms/core/clientTbls/?action=error');
		}
	};

	const saveTableData: any = () => {
		//TODO: this api endpoint is unfinished - not sure if it needs completing
		//createTable(id, tableInfo.readUnits, tableInfo.writeUnits);
	};

	const parseDate: any = (date: any) => {
		let rtn: string = 'n/a';
		//console.log('date:', `${date} - ${moment(date).isValid()}`);
		if( moment(date).isValid() ){
			rtn = moment(date).format(dtFormat);
		}
		return rtn;
	};

	return(
		<div>
			<br />
			<div className="toggleHeader" onClick={() => setHideDiv(!hideDiv)}>
				Add Client DB Table
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
												Add Client DB Table
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


export default AddClientTbl;