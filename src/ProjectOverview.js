import React from 'react';

const ProjectOverview = (props) => {
	const getData = (data) => {
		// console.log('### projectdata: ', data);
		return (<div>
			<div className="projectRow">{data.name}</div>
			{data.jobs.map((job) => {
				return job.status === "failed"
				? <div key={job.id} className="jobRowRed">
							<div>{job.name} ({job.ref}) ({job.status})</div>
							<a href={job.web_url} target="_blank" rel="noopener">{job.web_url}</a>
						</div>
						: <div key={job.id} className="jobRowGreen">
							<div>{job.name} ({job.ref}) ({job.status})</div>
							<a href={job.web_url} target="_blank" rel="noopener">{job.web_url}</a>
						</div>
				;
			})}
		</div>);
	};

	return (
		<React.Fragment>
			{getData(props.projectData)}
		</React.Fragment>
	);
};

export default ProjectOverview;