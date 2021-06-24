import { useState, useEffect } from 'react';
import showFriendlyName from './showFriendlyImgName';
import { getStorage } from './awsStorage';
import { Modal, IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


interface Props {
	imgPath: string;
};


const rand: any = () => {
	return( Math.round(Math.random() * 20) - 10 );
};


const getModalStyle: any = () => {
	let top: number = 50 + rand();
	let left: number = 50 + rand();

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`
	};
};


const useStyles: any = makeStyles((theme: Theme) =>
	createStyles({
		paper: {
			position: 'absolute',
			width: '50%',
			backgroundColor: theme.palette.background.paper,
			border: '2px solid #fad8e1',
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3)
		}
	})
);


const ModalWindow: any = (props: Props) => {

	const classes: any = useStyles();
	const [modalStyle]: any = useState(getModalStyle);	// getModalStyle is not a pure function, we roll the style only on the first render
	const [open, setOpen]: any = useState(false);
	const [s3Img, setS3Img]: any = useState('');

	const handleOpen: any = (evt: any) => {
		evt.preventDefault();
		setOpen(true);
	};

	const handleClose: any = () => setOpen(false);

	const body: any = (
		<div style={modalStyle} className={classes.paper}>
			<h4 id="simple-modal-title">
				<span style={{ float: 'left' }}>
					{showFriendlyName(props.imgPath)}
				</span>
				<span style={{ float: 'right' }}>
					<IconButton size="small"
							aria-label="close"
							color="inherit"
							onClick={handleClose}>
						<CloseIcon fontSize="inherit" />
					</IconButton>
				</span>
			</h4>
			<br />
			<p id="simple-modal-description">
				<img src={s3Img} alt={showFriendlyName(props.imgPath)} />
			</p>
		</div>
	);

	const getImg: any = () => {
		getStorage(props.imgPath)
			.then((result: any) => {
				//console.log('result:', result);
				setS3Img(result.data);
			});
	};

	useEffect(() => {
		getImg();
		//console.log('s3Img:', s3Img);
	}, []);

	return(
		<div>
			{s3Img
				? (
					<div>
						Current:&nbsp;
						<a href="#" onClick={handleOpen}>
							{showFriendlyName(s3Img)}
						</a>
						<Modal open={open}
							onClose={handleClose}
							aria-labelledby="simple-modal-title"
							aria-describedby="simple-modal-description">
							{body}
						</Modal>
					</div>
				)
				: null
			}
		</div>
	);

};


export default ModalWindow;