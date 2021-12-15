import './App.css';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ProjectOverview from './ProjectOverview';

class App extends Component {

	constructor(props) {
		super(props);
		this.eventSource = new EventSource(`http://localhost:8080/api/jobs`);
	}

	state = {
		projects: undefined,
	};

	componentDidMount() {
		this.eventSource.onmessage = e => {
			// console.log('### data: ', e.data);
			this.updateData(JSON.parse(e.data));
		};
	}

	updateData(eventData) {
		this.setState({ projects: eventData });
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<div>{this.state.projects ? this.state.projects.map((project) => {
						return <div key={project.id} className="content">
							<ProjectOverview projectData={project}/>
						</div>;
					}) : '...'}</div>
				</header>
			</div>
		);
	}

}

export default withRouter(App);
