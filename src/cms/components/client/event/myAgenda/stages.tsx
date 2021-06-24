interface Props {
	stageArr: any[];
};


const Stages: any = (props: Props) => {

	const stages: any[] = (props.stageArr || []);

	return(
		<div>
			<ul>
				{stages.length
					? (stages.map((row: any) => {
						return(
							<li>
								{row.stage_name}
								{row.stage_desc
									? (<span>&nbsp;-&nbsp;{row.stage_desc}</span>)
									: null
								}
							</li>
						);
					}))
					: (<li>No stages associated.</li>)
				}
			</ul>
		</div>
	);

};


export default Stages;