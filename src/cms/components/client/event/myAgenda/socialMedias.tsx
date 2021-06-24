import { useState } from 'react';
import { socialMedia } from '../../../../../utils/socialMediaData';
import { createLink } from '../../../../../utils/createLink';


interface Props {
	mediaArr: any[];
};


const SocialMedias: any = (props: Props) => {

	const medias: any[] = (props.mediaArr || []);

	const [mediaCount, setMediaCount]: any = useState(medias.length);

	//console.log('medias:', medias);
	//console.log('data:', socialMedia());

	const filterMediaValue: any = (field: string) => {
		let rtn: any = '';
		let tmpCount: number = 0;

		const arr: any[] = medias.filter((row: any) => {
			return( row.site == field );
		});

		try{
			rtn = createLink(arr[0].link);
			tmpCount++;
		}catch( err: any ){}

		/*if( tmpCount > 0 ){
			setMediaCount(tmpCount);
		}*/

		return rtn;
	};

	return(
		<div>
			<ul>
				{mediaCount
					? (socialMedia().map((row: any) => {
						let link: any = filterMediaValue(row.field);
						if( link ){ return( <li>{row.label} {link}</li> ); }
						else{ return null; }
					}))
					: (<li>No social media links associated.</li>)
				}
			</ul>
		</div>
	);

};


export default SocialMedias;