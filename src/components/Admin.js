import React from "react";
import agent from "../agent";

class Admin extends React.Component {
	submitForm = (e) => {
		e.preventDefault();
		const form = e.target;
		const fd = new FormData(form);
		const file = fd.get("tracks")
		
		agent.Admin.uploadTracks(file)
	}
	render() {
		return (
			<form onSubmit={this.submitForm}>
				<div className="flex flex-col">
					<label>upload tracks</label>
					<input type="file" name="tracks" />
				</div>
				<button type="submit">Submit</button>
			</form>
		);
	}
}

export default Admin;