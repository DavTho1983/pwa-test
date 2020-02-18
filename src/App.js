import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import firebase from './firebase';
import { AuthProvider } from './Auth';

import './App.css';

import Form from './components/Form/Form';
import Login from './Login';
import CoachRoute from './CoachRoute';
import AdminRoute from './components/admin-route';
import TimesList from './components/times-list';
import AddTimeEntryForm from './components/add-time-entry-form';

const NavBar = () => (
	<div className="navbar">
		<h3>Task Manager</h3>
		<Link to="/">Current Tasks</Link>
		<Link to="/completed">Completed Tasks</Link>
	</div>
);

const Template = (props) => (
	<div>
		<NavBar />
		<p className="page-info">{props.title}:</p>
		{props.status === 'Current' && <TimesList />}
		{props.status === 'Completed' && <AddTimeEntryForm />}
		<Form />
		<button onClick={() => firebase.auth().signOut()}>Sign out</button>
	</div>
);

const CurrentTasks = () => <Template title="Current Tasks" status="Current" />;

const CompletedTasks = () => <Template title="Completed Tasks" status="Completed" />;

class App extends Component {
	render() {
		return (
			<AuthProvider>
				<BrowserRouter>
					<div>
						<CoachRoute exact path="/" component={CurrentTasks} />
						<AdminRoute exact path="/completed" component={CompletedTasks} />
						<Route exact path="/login" component={Login} />
					</div>
				</BrowserRouter>
			</AuthProvider>
		);
	}
}

export default App;
