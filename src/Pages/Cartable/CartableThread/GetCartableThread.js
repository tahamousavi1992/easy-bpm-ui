import React from 'react';
import CartableThreadService from '../../../Services/CartableThreadService';
import UtilityService from '../../../Services/UtilityService';
import { Link } from "react-router-dom"
import BpmsConfig from '../../../Shared/BpmsConfig'
import UserTaskContent from '../../FormModel/UserTaskContent'
import Lang from '../../../Shared/CartableLang/Lang';
class GetCartableThread extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.updateForm = this.updateForm.bind(this);
    }
    async componentDidMount() {
        this.updateForm(null);
    }

    async updateForm(stepId) {
        let data = await new CartableThreadService().getIndex(this.props.match.params.threadTaskID, stepId);
        let pageTitle = data.Model != null ? data.Model.FormModel.FormName : "";
        this.props.setPageCaption(2, [pageTitle, Lang.Menu.management], false);
        UtilityService.showMessageByList(data.MessageList);
        if (data.Result) {
            await this.setState({ Model: null });
            await this.setState({ ...data });

            if (document.getElementsByTagName('form').length > 0)
                document.getElementsByTagName('form')[0].onsubmit = function () {
                    return false;
                };
            //load validation
            window.initialFunctions();
            window.bpmsInitialValidation('');
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-xl-12" id="divBpmsParentContainer">
                    {
                        this.state.Model &&
                        <div className="card card-custom gutter-b">
                            <div className="card-header">
                                <h3 className="card-title">
                                    {this.state.Model.FormModel.FormName}
                                </h3>
                            </div>
                            <div className="card-body">
                                <ul className="nav nav-tabs nav-bold nav-tabs-line" id="AddEditTaskTab">
                                    <li className="nav-item">
                                        <a className="nav-link active" data-toggle="tab" href="#MainInfo">
                                            <span className="nav-icon text-right"><i className="fa fa-list-ul"></i></span>
                                            <span className="nav-text">{Lang.GetCartableThread.taskInfo}</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#History">
                                            <span className="nav-icon text-right"><i className="fa fa-user"></i></span>
                                            <span className="nav-text">{Lang.GetCartableThread.actions}</span>
                                        </a>
                                    </li>

                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active pt-3" id="MainInfo" role="tabpanel" aria-labelledby="MainInfo">
                                        {
                                            this.state.Model != null &&
                                            <UserTaskContent updateForm={this.updateForm} {...this.state.Model}></UserTaskContent>
                                        }
                                    </div>
                                    <div className="tab-pane fade pt-3" id="History" role="tabpanel" aria-labelledby="History">
                                        <div className="form">
                                            <div className="bpms-table bpms-table-bordered  bpms-table-default  ">
                                                <div className="table-information table-responsive">
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th>
                                                                    {Lang.GetCartableThread.tbl_th_TaskName}
                                                                </th>
                                                                <th>
                                                                    {Lang.GetCartableThread.tbl_th_FullName}
                                                                </th>
                                                                <th>
                                                                    {Lang.GetCartableThread.tbl_th_StartDate}
                                                                </th>
                                                                <th>
                                                                    {Lang.GetCartableThread.tbl_th_EndDate}
                                                                </th>
                                                                <th>
                                                                    {Lang.GetCartableThread.tbl_th_Description}
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                this.state.ThreadTasks &&
                                                                this.state.ThreadTasks.map((item, index) => {
                                                                    return <tr key={index} >

                                                                        <td>
                                                                            {item.TaskName}
                                                                        </td>
                                                                        <td>
                                                                            {item.OwnerUser.FullName}
                                                                        </td>
                                                                        <td>
                                                                            {UtilityService.getDateAsStr(item.ThreadTaskStartDate)}
                                                                        </td>
                                                                        <td>
                                                                            {UtilityService.getDateAsStr(item.ThreadTaskEndDate)}
                                                                        </td>
                                                                        <td>
                                                                            {item.Description}
                                                                        </td>
                                                                    </tr>
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default GetCartableThread;