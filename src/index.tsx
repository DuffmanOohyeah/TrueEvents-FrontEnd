import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Amplify from 'aws-amplify';
import awsExports from './aws-exports';
import { ApolloProvider } from '@apollo/client';
import client from './utils/ApolloClient';
import theme from './styles/theme/Theme';
import { ThemeProvider } from '@material-ui/core/styles';


Amplify.configure(awsExports);
require('dotenv').config();


ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client} >
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();