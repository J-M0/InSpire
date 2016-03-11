import React from 'react';
import {getStudentInfo} from '../server';


export default class ImportantNotices extends React.Component {

  constructor(props) {
    super(props);
    this.state = props;
  }

  refresh() {
    getStudentInfo(this.props.params.id, (userInfo) => {
      this.setState({userInfo});
    });
  }

    render() {
      this.componentDidMount();
      var data = this.props.studentInfo;
      return (
				<div className="panel panel-default" id="todo">
					<div className="panel-heading">Important Notices</div>
					<div className="panel-body">
						<a href="#fafsa" data-toggle="modal" data-target="#fafsaModal">16-17 FAFSA</a><br />
						<a href="#grad">Graduation Paperwork</a><br />
						<a href="#etc" data-toggle="modal" data-target="#todoModal">See More...</a><br />

            <div id="fafsaModal" className="modal fade" role="dialog">
							<div className="modal-dialog modal-lg">
								<div className="modal-content">
									<div className="modal-header">
										<button type="button" className="close" data-dismiss="modal">&times;</button>
										<h4 className="modal-title" style="color:#354066;">Fafsa Notice</h4>
									</div>
									<div className="modal-body">
										<div className="panel panel-default" id="todo-list-items">
											<div className="panel-heading" style="color:#354066;">Contact</div>
											<div className="panel-body">
												<table className="table">
													<thead>
														<tr>
															<th>Academic Institution</th>
															<th>Administrative Function</th>
															<th>Due Date</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td>{data.academicInstitution}</td>
															<td>{data.importantNotices.fafsa.function}</td>
															<td>{data.importantNotices.fafsa.dueDate}</td>
														</tr>
													</tbody>
												</table>
											</div>
											<div className="panel-heading" style="color:#354066;">16-17 FAFSA Reminder</div>
											<p style="margin-left:20px;">You may be eligible for financial aid. To be considered, complete the 2016-2017 FAFSA online at fafsa.gov. Depending upon your individual situation, deadlines and rules vary. Information regarding eligibility, applying and deadlines is available at www.umass.edu/umfa/. Please note, some state tuition credit programs require you to complete the FAFSA. Also, you must complete the FAFSA to apply for the Federal Direct PLUS loan.</p>
											<br />
											<div className="panel-heading" style="color:#354066;">To Do Item Status</div>
											<div className="panel-body">
												<h3><strong>{data.importantNotices.fafsa.status}</strong></h3>
											</div>
										</div>
									</div>
									<div className="modal-footer">
										<button className="btn btn-default pull-left" data-dismiss="modal">Close</button>
									</div>
								</div>
							</div>
						</div>

                <div id="taxreturnModal" className="modal fade" role="dialog">
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title" style="color:#354066;">Todo list & More</h4>
                      </div>
                      <div className="modal-body">
                        <div className="panel panel-default" id="todo-list-items">
                          <div className="panel-heading" style="color:#354066;"><span className="glyphicon glyphicon-ok-circle" style="color:#354066;"></span> Contact</div>
                          <div className="panel-body">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th>Academic Institution</th>
                                  <th>Administrative Function</th>
                                  <th>Due Date</th>
                                  <th>Additional Information</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>U. of Massachusetts Amherst</td>
                                  <td>Financial Ai</td>
                                  <td>05/16/2016</td>
                                  <td><a href="https://www.irs.gov/Individuals/Get-Transcript">View Additional Information</a></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="panel-heading" style="color:#354066;"><span className="glyphicon glyphicon-remove-circle" style="color:#354066;"></span> 16-17 Par 2015 Tx Rtr Trnscrpt</div>
                          <p style="margin-left:20px;">Please submit your parent(s) 2015 Tax Return Transcript. To request a copy of this document go to www.irs.gov. Under Tools select Get a Tax Transcript then Get Transcript by MAIL. Or call 1-800-908-9946 to use the automated phone transcript service. Click on the link above for detailed instructions for obtaining a 2015 Tax Return Transcript. Please note that only the Tax Return Transcript obtained directly from the IRS or an IRS office can be accepted; other forms such as the "Tax Account Transcript" or original tax forms (e.g. 1040, 1040EZ) cannot be accepted.</p>
                          <br />
                          <div className="panel-heading" style="color:#354066;"><span className="glyphicon glyphicon-gift" style="color:#354066;"></span> Important Message from Financial Aid</div>
                          <div className="panel-body">
                            <ul>
                              <li>Please fax the requested documents to 413.545.1700 or submit to Financial Aid Services, 243 Whitmore Administration Building, 181 Presidents Drive, Amherst MA 01003-9313.</li>
                              <li>Include your name and SPIRE ID in the upper right-hand corner of all documents.</li>
                              <li>Note: Failure to submit all required paperwork in a timely manner will delay the processing of your financial aid and may jeopardize your eligibility for funding.</li>
                              <li>You may submit your documents as an attachment by emailing fadocs@finaid.umass.edu. This email address is only for incoming documents. We will not respond to questions sent in the body of the email. Attachments must be a standard image file, or in one of the following file formats: .doc, .docx, .pdf</li>
                              <li>Faxed documents are processed electronically therefore we are unable to provide confirmation upon receipt. During peak processing periods it can take up to three business days to receive your documents. To confirm the receipt of most document requests, go to your To Do List and look for the status of "Received".</li>
                            </ul>
                          </div>
                          <div className="panel-heading" style="color:#354066;"><span className="glyphicon glyphicon-gift" style="color:#354066;"></span> To Do Item Status</div>
                          <p><strong>Initiated</strong></p>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button className="btn btn-default pull-left" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>

						<div id="todoModal" className="modal fade" role="dialog">
							<div className="modal-dialog modal-lg">
								<div className="modal-content">
									<div className="modal-header">
										<button type="button" className="close" data-dismiss="modal">&times;</button>
										<h4 className="modal-title" style="color:#354066;">Todo list & More</h4>
									</div>
									<div className="modal-body">
										<div className="panel panel-default" id="todo-list-items">
											<div className="panel-heading" style="color:#354066;"><span className="glyphicon glyphicon-ok-circle" style="color:#354066;"></span> Todo Items</div>
											<div className="panel-body">
												<table className="table">
													<thead>
														<tr>
															<th>Todo Item</th>
															<th>Due Date</th>
															<th>Status</th>
															<th>Institution</th>
															<th>Administrative Function</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td>2016-2017 FAFSA</td>
															<td>03/01/2015</td>
															<td>Received</td>
															<td>U. of Massachusetts Amherst</td>
															<td>Financial Aid</td>
														</tr>
														<tr>
															<td>Graduation Paperwork</td>
															<td>03/01/2015</td>
															<td>Received</td>
															<td>U. of Massachusetts Amherst</td>
															<td>Graduate Program</td>
														</tr>
													</tbody>
												</table>
											</div>
											<div className="panel-heading" style="color:#354066;"><span className="glyphicon glyphicon-remove-circle" style="color:#354066;"></span> Holds</div>
											<p style="margin-left:20px;">There are currently no holds on your account.</p>
											<br />
											<div className="panel-heading" style="color:#354066;"><span className="glyphicon glyphicon-gift" style="color:#354066;"></span> Financial Aid</div>
											<div className="panel-body">
												<p>Select the year of aid you wish to view.</p>
												<table className="table">
													<thead>
														<tr>
															<th>Aid Year</th>
															<th>Institution</th>
															<th>Aid Year Description</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td><a href="#">2016</a></td>
															<td>U. of Massachusetts Amherst</td>
															<td>Financial Aid Year 2015-2016</td>
														</tr>
														<tr>
															<td><a href="#">2015</a></td>
															<td>U. of Massachusetts Amherst</td>
															<td>Financial Aid Year 2014-2015</td>
														</tr>
														<tr>
															<td><a href="#">2014</a></td>
															<td>U. of Massachusetts Amherst</td>
															<td>Financial Aid Year 2013-2014</td>
														</tr>
														<tr>
															<td><a href="#">2013</a></td>
															<td>U. of Massachusetts Amherst</td>
															<td>Financial Aid Year 2012-2013</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
									<div className="modal-footer">
										<button className="btn btn-default pull-left" data-dismiss="modal">Close</button>
									</div>
								</div>
							</div>
						</div>


					</div>
				</div>
     )
   }
}
