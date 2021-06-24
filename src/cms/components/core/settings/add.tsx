import { useState } from 'react';
import { useParams } from 'react-router-dom';
import history from '../../../../utils/history';
import { Collapse, TextField, Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { createSetting } from '../../../../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import moment from 'moment';


interface Props {};


let dtFormat: string = 'DD/MM/YYYY';
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
		//width: '100%'
		textAlign: 'center',
		float: 'right'
	}
}));


const AddSetting: any = (props: Props) => {

	let { id }: any = useParams();
	const [hideDiv, setHideDiv]: any = useState(id ? true : false);
	const [showSubmit, setShowSubmit]: any = useState(false);

	const [settingInfo, setSettingInfo]: any = useState({
		setting: '',
		value: '',
		createdAt: '',
		updatedAt: ''
	});

	const classes: any = useStyles();

	const onSettingChange: any = (evt: any) => {
		let name: string = evt.target.name;
		let value: string = evt.target.value;

		updateSettingInfo(name, value);

		switch( name ){
			case 'setting':
				if( !value.length ){
					setShowSubmit(false);
				}else{
					setShowSubmit(true);
				}
			break;
		}
	};

	const updateSettingInfo: any = (key: string, value: string) => setSettingInfo({...settingInfo, [key]: value});

	const onSubmit: any = async (evt: any) => {
		evt.preventDefault();
		try{
			saveSettingData();
			history.push('/cms/core/settings/?action=created');
		}catch( err: any ){
			history.push('/cms/core/settings/?action=error');
		}
	};

	const saveSettingData: any = () => {
		const params: any = {
			input: {
				setting: settingInfo.setting,
				value: settingInfo.value
			}
		};

		API.graphql(graphqlOperation( createSetting, params ));
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
				Add Setting
			</div>

			<Collapse in={true}>
				{hideDiv
					? null
					: (
						<form className={classes.root}>

							<TextField name="setting" label="Setting:" value={settingInfo.setting} onChange={onSettingChange} required />
							<TextField name="value" label="Value:" value={settingInfo.value} onChange={onSettingChange} />
							<TextField name="createdAt" label="Created Date:" value={parseDate(settingInfo.createdAt)} disabled />
							<TextField name="updatedAt" label="Updated Date:" value={parseDate(settingInfo.updatedAt)} disabled />

							<br /><br />

							{showSubmit
								? (
									<div className={classes.submit}>
										<Button variant="contained"
											color="primary"
											onClick={onSubmit}>
											Add Setting
										</Button>
									</div>
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


export default AddSetting;