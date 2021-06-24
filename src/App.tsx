import { withAuthenticator } from '@aws-amplify/ui-react';
import {
	Router,
	Switch,
	Route,
	Redirect
} from 'react-router-dom';
import { populateCache } from './stores/localStorage';
import Cms from './cms/components/index';
import { useEffect } from 'react';
import history from './utils/history';


interface Props {};


const App: any = (props: Props) => {

	useEffect(() => {
		populateCache();
	}, []);

	return(
		<Router history={history}>
			<Switch>
				<Route path="/">
					<Cms {...props} />
				</Route>
				<Redirect from="*" to="/" />
			</Switch>
		</Router>
	);

}


export default withAuthenticator(App);
