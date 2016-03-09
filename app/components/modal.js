import React from 'react';

export default class Modal extends React.Component {
	render() {
		return (
			<div className="modal fade" tabIndex="-1" role="dialog" id="Modal">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h4 className="modal-title">More Info</h4>
						</div>
						<div className="modal-body">
							{this.props.children}
						</div>

						<div className="modal-footer">
							<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
							<button type="button" className="btn btn-primary">Add Class</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
