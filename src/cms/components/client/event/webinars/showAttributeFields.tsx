import { TextField } from '@material-ui/core';


interface Props {
	onChange: any;
	stateObj: any;
	webinarArr: any[];
};


const ShowAttributeFields: any = (props: Props) => {

	//console.log('props:', props);

	return(
		<>
			{props.webinarArr.map((row: any) => {
				return(
					<>
						{row.attributes.map((obj: any, idx: number) => {
							{/*console.log('obj:', obj)*/}
							let name: string = 'webinar_' + obj.key;
							let label: string = obj.label;
							let value: string = (props.stateObj[name] || obj.value);
							return(
								<TextField key={idx}
									name={name}
									label={label}
									value={value}
									onChange={props.onChange} />
							);
						})}
					</>
				);
			})}
		</>
	);

};


export default ShowAttributeFields;