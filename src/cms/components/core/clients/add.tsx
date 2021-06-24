import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import history from '../../../../utils/history';
import {
	Collapse,
	MenuItem,
	TextField,
	Button
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { putStorage } from '../../../../utils/awsStorage';
import { createClient } from '../../../../graphql/mutations';
import { listUserClientJoins } from '../../../../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import moment from 'moment';
import countries from '../../../../utils/countryData';
import { currentAuthenticatedUser } from '../../../../utils/amplifyAuth';


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


const AddClient: any = (props: Props) => {

	let { id }: any = useParams();
	const [hideDiv, setHideDiv]: any = useState(id ? true : false);
	const [showSubmit, setShowSubmit]: any = useState(false);
	const [clientInfo, setClientInfo]: any = useState({
		join_id: '',
		full_name: '',
		friendly_name: '',
		clientdb_instance: '',
		address: '',
		county: '',
		country: 'United Kingdom',
		logo: '',
		join_date: new Date(),
		archived: false,
		archive_date: '',
		primary_contact: '',
		contact_email: '',
		contact_phone: '',
		account_manager: '',
		createdAt: new Date(),
		updatedAt: new Date()
	});

	const classes: any = useStyles();

	const onClientChange: any = (evt: any) => {
		let name: string = evt.target.name;
		let value: string = evt.target.value;

		updateClientInfo(name, value);

		switch( name ){
			case 'full_name':
			case 'friendly_name':
				if( !value.length ){
					setShowSubmit(false);
				}else{
					setShowSubmit(true);
				}
			break;

			/*case 'archived':
				if( value == 'true' ){
					updateClientInfo('archive_date', new Date());
				}else{
					updateClientInfo('archive_date', '');
				}
			break;*/
		}
	};

	const updateClientInfo: any = (key: string, value: string) => setClientInfo({...clientInfo, [key]: value});

	const onSubmit: any = async (evt: any) => {
		evt.preventDefault();
		try{
			const imgName: string = await updateImg();
			saveClientData(imgName);
			history.push('/cms/core/clients/?action=created');
		}catch( err: any ){
			history.push('/cms/core/clients/?action=error');
		}
	};

	const saveClientData: any = (imgName: string) => {
		imgName = (imgName || clientInfo.logo);

		const params: any = {
			input: {
				join_id: clientInfo.join_id,
				full_name: clientInfo.full_name,
				friendly_name: clientInfo.friendly_name,
				clientdb_instance: clientInfo.clientdb_instance,
				address: clientInfo.address,
				county: clientInfo.county,
				country: clientInfo.country,
				logo: imgName,
				archived: clientInfo.archived,
				archive_date: (clientInfo.archived ? new Date() : null),
				primary_contact: clientInfo.primary_contact,
				contact_email: clientInfo.contact_email,
				contact_phone: clientInfo.contact_phone,
				account_manager: clientInfo.account_manager
			}
		};

		if( clientInfo.join_id ){	// this call will error if join_id is not present
			API.graphql(graphqlOperation( createClient, params ));
		}

	};

	const updateImg: any = async () => {
		let rtn: string = '';
		//console.log('updateImg:', userAtts.profile_img);
		if( clientInfo.logo && clientInfo.logo.name ){
			const s3Obj: any = await putStorage(clientInfo.logo, 'client', id);
			//console.log('s3Obj:', s3Obj);
			if( s3Obj.data.key ){
				let newLogoPath: string = s3Obj.data.key;
				updateClientInfo('logo', newLogoPath);
				rtn = newLogoPath;
			}
		}
		return rtn;
	};

	const changeImg: any = (evt: any) => {
		updateClientInfo(evt.target.name, evt.target.files[0]);	// key = string, value = obj
	};

	const parseDate: any = (date: any) => {
		let rtn: string = 'n/a';
		//console.log('date:', `${date} - ${moment(date).isValid()}`);
		if( moment(date).isValid() ){
			rtn = moment(date).format(dtFormat);
		}
		return rtn;
	};

	const getAuthUser: any = () => {
		currentAuthenticatedUser()
		.then((data: any) => {
			let cognitoSub: string = data.attributes.sub;
			getJoinId(cognitoSub);
		});
	};

	const getJoinId: any = async (cognitoSub: string) => {
		const result: any = await API.graphql(graphqlOperation(
			listUserClientJoins,
			{filter: {cognito_sub: {eq: cognitoSub}}}
		));

		try{
			let joinId: string = result.data.listUserClientJoins.items[0].id;
			updateClientInfo('join_id', joinId);
		}catch( err: any ){}
	};

	useEffect(() => {
		getAuthUser();
		//console.log('clientInfo:', clientInfo);
	}, []);

	return(
		<div>
			<br />
			<div className="toggleHeader" onClick={() => setHideDiv(!hideDiv)}>
				Add Client
			</div>

			<Collapse in={true}>
				{hideDiv
					? null
					: (
						<form className={classes.root}>

							<TextField name="full_name" label="Full Name:" value={clientInfo.full_name} onChange={onClientChange} required />
							<TextField name="friendly_name" label="Friendly Name:" value={clientInfo.friendly_name} onChange={onClientChange} required />
							<TextField name="clientdb_instance" label="DB Instance:" value={clientInfo.clientdb_instance} onChange={onClientChange} />
							<TextField name="address" label="Address:" value={clientInfo.address} onChange={onClientChange} />
							<TextField name="county" label="County:" value={clientInfo.county} onChange={onClientChange} />
							<TextField name="country" label="Country:" value={clientInfo.country} onChange={onClientChange} select>
								{countries.map((row: any, idx: number) => (
									<MenuItem key={idx} value={row.country}>
										{row.country} ({row.iso_code})
									</MenuItem>
								))}
							</TextField>
							<TextField name="join_date" label="Join Date:" value={parseDate(clientInfo.join_date)} onChange={onClientChange} disabled />
							<TextField name="archived" label="Archived:" value={clientInfo.archived} onChange={onClientChange} select>
								{['true', 'false'].map((bln: string, idx: number) => (
									<MenuItem key={idx} value={bln}>
										{bln}
									</MenuItem>
								))}
							</TextField>
							<TextField name="archive_date" label="Archive Date:" value={parseDate(clientInfo.archive_date)} onChange={onClientChange} disabled />
							<TextField name="primary_contact" label="Primary Contact:" value={clientInfo.primary_contact} onChange={onClientChange} />
							<TextField name="contact_email" label="Contact Email:" value={clientInfo.contact_email} onChange={onClientChange} />
							<TextField name="contact_phone" label="Contact Phone:" value={clientInfo.contact_phone} onChange={onClientChange} />
							<TextField name="account_manager" label="Account Manager:" value={clientInfo.account_manager} onChange={onClientChange} />
							<TextField name="createdAt" label="Created Date:" value={parseDate(clientInfo.createdAt)} onChange={onClientChange} disabled />
							<TextField name="updatedAt" label="Updated Date:" value={parseDate(clientInfo.updatedAt)} onChange={onClientChange} disabled />

							<label>
								<br /><br />

								<input name="logo"
									className={classes.input}
									accept="image/*"
									onChange={changeImg}
									type="file"/>

								<Button color="secondary"
									variant="contained"
									component="span">
									Add New Logo
								</Button>

								{clientInfo.logo && clientInfo.logo.name
									? (<span><br /><br />New:&nbsp;{clientInfo.logo.name}<br /></span>)
									: null
								}
							</label>

							<br /><br />

							{showSubmit
								? (
									<div className={classes.submit}>
										<Button variant="contained"
											color="primary"
											onClick={onSubmit}>
											Add Client
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


export default AddClient;