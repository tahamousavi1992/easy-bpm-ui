﻿import React from 'react';
import ThreadManageService from '../../../Services/ThreadManageService';
import UtilityService from '../../../Services/UtilityService';
import UserTaskContent from '../../FormModel/UserTaskContent'
import Lang from '../../../Shared/AdminLang/Lang';
import BpmsConfig from '../../../Shared/BpmsConfig'
class GetThreadDetail extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.updateForm = this.updateForm.bind(this);
    }
    async componentDidMount() {
        this.updateForm();
    }

    backToFunction = () => {
        this.props.history.push(BpmsConfig.currentPage() + "/ThreadList");
    }

    async updateForm() {
        let data = await new ThreadManageService().getThreadDetail(this.props.match.params.threadId);
        this.props.setPageCaption(18, [Lang.GetThreadDetail.caption, Lang.Menu.ThreadList], false, null, null, this.backToFunction);
        UtilityService.showMessageByList(data.MessageList);

        await this.setState({ ...data });
        if (document.getElementsByTagName('form').length > 0)
            document.getElementsByTagName('form')[0].onsubmit = function () {
                return false;
            };
        //load validation
        window.initialFunctions();
        window.bpmsInitialValidation('');
    }

    render() {
        return (
            <div className="row">
                <div className="col-xl-12" id="divBpmsParentContainer">
                    {
                        this.state.Process &&
                        <div className="card card-custom gutter-b">
                            <div className="card-header">
                                <h3 className="card-title">
                                    {Lang.GetThreadDetail.caption}
                                </h3>
                            </div>
                            <div className="card-body">
                                <ul className="nav nav-tabs nav-bold nav-tabs-line" id="AddEditTaskTab">
                                    <li className="nav-item">
                                        <a className="nav-link active" data-toggle="tab" href="#MainInfo">
                                            <span className="nav-icon text-right"><i className="fa fa-list-ul"></i></span>
                                            <span className="nav-text">{Lang.GetThreadDetail.taskInfo}</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#History">
                                            <span className="nav-icon text-right"><i className="fa fa-user"></i></span>
                                            <span className="nav-text">{Lang.GetThreadDetail.actions}</span>
                                        </a>
                                    </li>

                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active pt-3" id="MainInfo" role="tabpanel" aria-labelledby="MainInfo">
                                        <div className="form">
                                            <div className="form-group row">
                                                <div className="col-lg-6">
                                                    <label>{Lang.GetThreadDetail.processName}</label>
                                                    <div className="input-group">
                                                        <input defaultValue={this.state.Process.Name || ''} className="form-control" readOnly={true} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <label>{Lang.GetThreadDetail.fullName}</label>
                                                    <div className="input-group">
                                                        <input defaultValue={this.state.User.FullName || ''} className="form-control" readOnly={true} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-lg-6">
                                                    <label>{Lang.GetThreadDetail.startDate}</label>
                                                    <div className="input-group">
                                                        <input defaultValue={UtilityService.getDateAsStr(this.state.StartDate) || ''} className="form-control" readOnly={true} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <label>{Lang.GetThreadDetail.endDate}</label>
                                                    <div className="input-group">
                                                        <input defaultValue={UtilityService.getDateAsStr(this.state.EndDate) || ''} className="form-control" readOnly={true} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-lg-6">
                                                    <label>{Lang.GetThreadDetail.StatusName}</label>
                                                    <div className="input-group">
                                                        <input defaultValue={this.state.StatusName || ''} className="form-control" readOnly={true} />
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                this.state.ListOverviewForms &&
                                                this.state.ListOverviewForms.map((item, index) => {
                                                    return <React.Fragment key={index}>
                                                        <hr />
                                                        <UserTaskContent updateForm={this.updateForm} {...item}></UserTaskContent>
                                                    </React.Fragment>
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="tab-pane fade pt-3" id="History" role="tabpanel" aria-labelledby="History">
                                        <div className="form">
                                            <div className="bpms-table bpms-table-bordered  bpms-table-default  ">
                                                <div className="table-information table-responsive">
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th>
                                                                    {Lang.GetThreadDetail.tbl_th_TaskName}
                                                                </th>
                                                                <th>
                                                                    {Lang.GetThreadDetail.tbl_th_FullName}
                                                                </th>
                                                                <th>
                                                                    {Lang.GetThreadDetail.tbl_th_StartDate}
                                                                </th>
                                                                <th>
                                                                    {Lang.GetThreadDetail.tbl_th_EndDate}
                                                                </th>
                                                                <th>
                                                                    {Lang.GetThreadDetail.tbl_th_Description}
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                this.state.ListThreadHistory &&
                                                                this.state.ListThreadHistory.map((item, index) => {
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

export default GetThreadDetail;