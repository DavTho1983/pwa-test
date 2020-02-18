import React, { useContext, useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import firebase from '../firebase';

import { AuthContext } from '../Auth';

const SORT_OPTIONS = {
	TIME_ASC: { column: 'time_seconds', direction: 'asc' },
	TIME_DESC: { column: 'time_seconds', direction: 'desc' },
	TITLE_ASC: { column: 'title', direction: 'asc' },
	TITLE_DESC: { column: 'title', direction: 'desc' }
};

function useRoles(currentUser) {
	const [ userAdmin, setUserAdmin ] = useState([]);

	useEffect(() => {
		const unsubscribe = firebase.firestore().collection('roles').onSnapshot((snapshot) => {
			const newTimes = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data()
			}));
			setUserAdmin(newTimes);
		});
		return () => unsubscribe();
	}, []);

	return userAdmin;
}

const AdminRoute = ({ component: RouteComponent, ...rest }) => {
	const { currentUser } = useContext(AuthContext);
	const admin = useRoles(currentUser);
	console.log('ADMIN??????????????', admin);

	return (
		<Route
			{...rest}
			render={(routeProps) => (!!currentUser ? <RouteComponent {...routeProps} /> : <Redirect to={'/login'} />)}
		/>
	);
};

export default AdminRoute;
