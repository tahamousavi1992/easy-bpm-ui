import React, { useState } from 'react';
import TaskService from '../../../Services/TaskService';
import UtilityService from '../../../Services/UtilityService';
import Select, { VariableControl } from '../../../Components/Select';
import Lang from '../../../Shared/AdminLang/Lang';
const $ = window.$;
class UserTaskIndex extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.submitForm = this.submitForm.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.addStep = this.addStep.bind(this);
        this.changeLaneOwnerType = this.changeLaneOwnerType.bind(this);
        this.loadForm = this.loadForm.bind(this);
    }
    async componentDidMount() {
        //load validation
        window.initialFunctions();
        window.bpmsInitialValidation('');
        //load data 
        let data = await new TaskService().getIndex(this.props.processId, this.props.elementId);
        await this.setState({ ...data });
        this.loadForm();
        this.changeLaneOwnerType();
    }
    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    loadForm() {
        window.comboTreeRole = $('#ddlRoleName').comboTree({
            source: this.state.RoleNamesJson, isMultiple: true, collapse: true
        });
        window.setComboTreeValues(window.comboTreeRole, this.state.Model.GetDepartmentRoles);
        if (document.getElementById('ddlUserID') != null) {
            var comboTree1 = $('#ddlUserID').comboTree({
                source: this.state.UsersJson, isMultiple: false, collapse: true
            });

            $('#divUser .comboTreeItemTitle').click(function () {
                let value = this.getAttribute('data-id').replace(/;/g, '"');
                document.getElementById('tbUserID').tBodies[0].innerHTML += `<tr>
                 <td >
                  ${this.innerText}
                  <input name="UserID" value="${value}" type="text" style="display:none;" />
                 </td>
                 <td >
                   <a href="#" onclick="this.closest('tr').remove(); return false;" class="btn btn-sm btn-clean btn-icon btn-icon-md"><span class="svg-icon svg-icon-md"><i class="fad fa-trash-alt"></i></span></a>
                 </td>
              </tr>`;
                document.getElementById('ddlUserID').value = ""
            });

            this.state.Model.UserID.split(',').forEach(function (item) {
                window.setComboTreeValues(comboTree1, item);
            });
        }
        window.setListModelBinding('tblStep', 'ListSteps');
    }

    addStep() {
        let table = $('#tblStep');
        let newRow = document.querySelector('.addStep').cloneNode(true);
        newRow.classList.remove('addStep');
        newRow.style.removeProperty('display');
        table.append(newRow);
        newRow.querySelector('a.delete-row').onclick = this.removeRow;
        window.setListModelBinding('tblStep', 'ListSteps');
    }

    removeRow(event) {
        event.target.closest("tr").remove();
        window.setListModelBinding('tblStep', 'ListSteps');
    }

    changeLaneOwnerType() {
        let target = document.getElementById('OwnerTypeLU');
        document.getElementById('divDepartment').style.display = 'none';
        document.getElementById('divGoUpDepartment').style.display = 'none';
        document.getElementById('divUser').style.display = 'none';
        document.getElementById('divRole').style.display = 'none';

        document.getElementById('divStaticUser').style.display = 'none';
        document.getElementById('divVariableUser').style.display = 'none';

        document.getElementById('divStaticRoleName').style.display = 'none';
        document.getElementById('divRoleVariable').style.display = 'none';
        document.getElementById('divRoleRule1').style.display = 'none';
        document.getElementById('divRoleRule2').style.display = 'none';

        document.getElementById('ddlUserAccessType').style.display = 'none';
        document.getElementById('ddlRoleAccessType').style.display = 'none';
        let accessTypeId = 0;
        switch (target.value) {
            case '1'://User
                document.getElementById('divUser').style.display = '';
                document.getElementById('ddlUserAccessType').style.display = '';
                accessTypeId = document.getElementById('ddlUserAccessType').value;
                if (accessTypeId == 1) {//variable
                    document.getElementById('divVariableUser').style.display = '';
                }
                if (accessTypeId == 2) {//static
                    document.getElementById('divStaticUser').style.display = '';
                }
                break;
            case '2'://Role
                document.getElementById('divRole').style.display = ''
                document.getElementById('ddlRoleAccessType').style.display = '';
                accessTypeId = document.getElementById('ddlRoleAccessType').value;
                if (accessTypeId == 1) {//variable
                    document.getElementById('divRoleVariable').style.display = '';
                    document.getElementById('divDepartment').style.display = '';
                }
                if (accessTypeId == 2) {//static
                    document.getElementById('divStaticRoleName').style.display = '';
                    document.getElementById('divDepartment').style.display = '';
                }
                if (accessTypeId == 3) {//CorrespondentRole
                    document.getElementById('divRoleRule1').style.display = '';
                    document.getElementById('divRoleRule2').style.display = '';
                    document.getElementById('divGoUpDepartment').style.display = '';
                }
                break;
        }
    }

    async submitForm(event) {
        if (window.bpmsFormIsValid()) {
            document.getElementById('RoleName').value = window.getComboTreeValues(window.comboTreeRole);
            let result = await new TaskService().postAddEditUserTask(UtilityService.getFormData('divAddEditTask', {
                ProcessID: this.state.Model.ProcessID
            }));
            UtilityService.showMessage(result.ResultType, result.Message);
            if (result.ResultType == 'success') {
                document.getElementById('lnkTaskCancel').click();
            }
        }
    }


    render() {
        return (
            <div className="modal-dialog modal-dialog-centered modal-lg modal-windows" role="document" id="divAddEditTask">
                {
                    this.state.Model &&
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{Lang.UserTaskIndex.caption }</h5>
                            <div className="modal-button">
                                <button type="button" className="btn close window-maximize" data-dismiss="modal" aria-label="Close">
                                    <i className="fad fa-expand-alt modal-square"></i>
                                </button>
                                <button type="button" className="btn close" data-dismiss="modal" aria-label="Close">
                                    <i className="fa fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div className="modal-body modal-scroll">
                            <div className="form">
                                <ul className="nav nav-tabs nav-bold nav-tabs-line" id="AddEditTaskTab">
                                    <li className="nav-item">
                                        <a className="nav-link active" data-toggle="tab" href="#divSteps">
                                            <span className="nav-icon text-right"><i className="fa fa-list-ul"></i></span>
                                            <span className="nav-text">{Lang.UserTaskIndex.steps}</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#divTaskDesignCode">
                                            <span className="nav-icon text-right"><i className="fa fa-user"></i></span>
                                            <span className="nav-text">{Lang.UserTaskIndex.access}</span>
                                        </a>
                                    </li>

                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="divSteps" role="tabpanel" aria-labelledby="divSteps">
                                        <div className="form mt-3">
                                            <div className="col-xl-12">
                                                <div className="bpms-table bpms-table-bordered bpms-table-head-custom bpms-table-default  ">
                                                    <div className="table-information table-responsive">
                                                        <table style={{ display: 'none' }}>
                                                            <tbody>
                                                                <tr className="addStep">
                                                                    <td style={{ display: 'none' }}></td>
                                                                    <td>
                                                                        <input name="ListItem.Name" id="ListItem.Name" className="form-control" defaultValue="" autoComplete="off" />
                                                                        <input name="ListItem.TaskID" id="ListItem.TaskID" type="hidden" defaultValue={this.state.Model.ID} />
                                                                        <input name="ListItem.ID" id="ListItem.ID" type="hidden" defaultValue={""} />
                                                                    </td>
                                                                    <td>
                                                                        <Select name="ListItem.DynamicFormID" defaultValue="" id="ListItem.DynamicFormID"
                                                                            listItem={this.state.DynamicForms} optionKey="Key" optionLabel="Value" />
                                                                    </td>
                                                                    <td>
                                                                        <a href='javascript:;' className="delete-row btn btn btn-sm btn-clean btn-icon" title={Lang.Shared.delete }>
                                                                            <span className="svg-icon svg-icon-md"><i className="fad fa-trash-alt"></i></span>
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <table id="tblStep" className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>
                                                                        {Lang.UserTaskIndex.tbl_th_Name}
                                                                    </th>
                                                                    <th>
                                                                        {Lang.UserTaskIndex.tbl_th_Form}
                                                                    </th>
                                                                    <th>{Lang.UserTaskIndex.tbl_th_Delete}</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    this.state.ListSteps &&
                                                                    this.state.ListSteps.map((item, index) => {
                                                                        return <tr key={item.ID} className="text-center" >
                                                                            <td style={{ display: 'none' }}>
                                                                                <input name="ListItem.TaskID" id="ListItem.TaskID" type="hidden" defaultValue={item.TaskID} autoComplete="off" />
                                                                                <input name="ListItem.ID" id="ListItem.ID" type="hidden" defaultValue={item.ID} />
                                                                            </td>
                                                                            <td>
                                                                                <input name="ListItem.Name" id="ListItem.Name" className="form-control" defaultValue={item.Name} />
                                                                            </td>
                                                                            <td>
                                                                                <Select name="ListItem.DynamicFormID" defaultValue={item.DynamicFormID || ''} id="ListItem.DynamicFormID"
                                                                                    listItem={this.state.DynamicForms} optionKey="Key" optionLabel="Value" />
                                                                            </td>
                                                                            <td>
                                                                                <a href='javascript:;' className="delete-row btn btn-sm btn-clean btn-icon" onClick={this.removeRow} title={Lang.Shared.delete }>
                                                                                    <span className="svg-icon svg-icon-md"><i className="fad fa-trash-alt"></i></span>
                                                                                </a>
                                                                            </td>
                                                                        </tr>
                                                                    })
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <a href="javascript:;" className="btn btn-primary font-weight-bolder" onClick={this.addStep}>
                                                    {Lang.UserTaskIndex.newStep }
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="divTaskDesignCode" role="tabpanel" aria-labelledby="divTaskDesignCode">
                                        <input name="ID" id="ID" type="hidden" defaultValue={this.state.Model.ID} />
                                        <input name="RoleName" id="RoleName" type="hidden" defaultValue={this.state.Model.RoleName} />
                                        <div className="form mt-3">
                                            <div className="col-xl-12">
                                                <div className="form-group row">
                                                    <div className="col-lg-6">
                                                        <label>{Lang.UserTaskIndex.ownerType}</label>
                                                        <div className="input-group">
                                                            <Select name="OwnerTypeLU" id="OwnerTypeLU" defaultValue={this.state.Model.OwnerTypeLU || ''}
                                                                handelChange={this.changeLaneOwnerType} listItem={this.state.OwnerTypes} optionKey="Key" optionLabel="Value" />
                                                        </div>
                                                        <span htmlFor="OwnerTypeLU" className="help-block error"></span>
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <div className="col-lg-6">
                                                        <label>{Lang.UserTaskIndex.accessType}</label>
                                                        <div className="input-group">
                                                            <Select id="ddlUserAccessType" name="UserAccessType" defaultValue={this.state.Model.UserTaskRuleModel.AccessType || ''} style={{ display: "none" }}
                                                                handelChange={this.changeLaneOwnerType} listItem={this.state.UserAccessTypes} optionKey="Key" optionLabel="Value" />
                                                            <Select id="ddlRoleAccessType" name="RoleAccessType" defaultValue={this.state.Model.UserTaskRuleModel.AccessType || ''} style={{ display: "none" }}
                                                                handelChange={this.changeLaneOwnerType} listItem={this.state.RoleAccessTypes} optionKey="Key" optionLabel="Value" />
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="form-group row rtl-Combo" id="divUser">
                                                    <div className="col-lg-6" id="divStaticUser">
                                                        <div className="form-group">
                                                            <label>{Lang.UserTaskIndex.user}</label>
                                                            <div className="input-group">
                                                                {
                                                                    this.state.Model.MarkerTypeLU == null &&
                                                                    <Select id="UserID" name="UserID" defaultValue={this.state.Model.UserID || ''}
                                                                        listItem={this.state.Users} optionKey="Key" optionLabel="Value" />
                                                                }
                                                                {
                                                                    this.state.Model.MarkerTypeLU &&
                                                                    <div style={{ width: "100%" }}>
                                                                        <input id="ddlUserID" name="ddlUserID" autoComplete="off" type="text" defaultValue="" />
                                                                    </div>
                                                                }

                                                            </div>
                                                            {
                                                                this.state.Model.MarkerTypeLU &&
                                                                <div className="row">
                                                                    <table id="tbUserID" className="table">
                                                                        <thead>
                                                                            <tr>
                                                                                <td>{Lang.UserTaskIndex.tbl_th_Name}</td>
                                                                                <td>{Lang.UserTaskIndex.tbl_th_Delete }</td>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6" id="divVariableUser">
                                                        <label>{Lang.UserTaskIndex.variable}</label>
                                                        <VariableControl name="ddlUserVariable" isRequired={true} value={this.state.Model.UserTaskRuleModel.Variable} />
                                                    </div>
                                                </div>
                                                <div className="form-group row rtl-Combo" id="divRole">
                                                    <div className="col-lg-6" id="divStaticRoleName">
                                                        <label>{Lang.UserTaskIndex.roleName}</label>
                                                        <div className="input-group">
                                                            <div style={{ width: "100%" }}>
                                                                <input id="ddlRoleName" autoComplete="off" name="ddlRoleName" type="text" defaultValue="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6" id="divRoleVariable">
                                                        <label>{Lang.UserTaskIndex.variable}</label>
                                                        <VariableControl name="ddlRoleVariable" isRequired={true} value={this.state.Model.UserTaskRuleModel.Variable} />
                                                    </div>
                                                    <div className="col-lg-6" id="divRoleRule1">
                                                        <label>{Lang.UserTaskIndex.roleName}</label>
                                                        <div className="input-group">
                                                            <Select id="ddlRoleRuleRoleName" name="ddlRoleRuleRoleName" defaultValue={this.state.Model.UserTaskRuleModel.RoleCode || ''}
                                                                handelChange={this.changeLaneOwnerType} listItem={this.state.RoleNames} optionKey="Key" optionLabel="Value" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6" id="divRoleRule2">
                                                        <label>{Lang.UserTaskIndex.userType}</label>
                                                        <div className="input-group">
                                                            <Select id="ddlRoleRuleUserType" name="ddlRoleRuleUserType" defaultValue={this.state.Model.UserTaskRuleModel.UserType || ''}
                                                                listItem={this.state.UserTypes} optionKey="Key" optionLabel="Value" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group row" id="divDepartment" style={{ display: "none" }}>
                                                    <div className="col-lg-6">
                                                        <label>{Lang.UserTaskIndex.department}</label>
                                                        <div className="input-group">
                                                            <Select id="SpecificDepartmentID" name="SpecificDepartmentID" defaultValue={this.state.Model.SpecificDepartmentID || ''}
                                                                listItem={this.state.Departments} optionKey="Key" optionLabel="Value" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group row" id="divGoUpDepartment" style={{ display: "none" }}>
                                                    <div className="col-lg-6">
                                                        <label>{Lang.UserTaskIndex.goUpDepartment}</label>
                                                        <input type="checkbox" defaultChecked={this.state.Model.UserTaskRuleModel.GoUpDepartment || ''} name='GoUpDepartment' id="GoUpDepartment" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            {
                                this.state.AllowEdit &&
                                <button id="btnSave" type="button" onClick={this.submitForm} className="btn btn-primary font-weight-bold" data-val-group="saveTask">
                                    {Lang.Shared.save }
                                </button>
                            }
                            <button type="button" className="btn btn-light-primary font-weight-bold" id="lnkTaskCancel" data-dismiss="modal">{Lang.Shared.cancel}</button>
                        </div>
                    </div>
                }

            </div >
        );
    }
}

export default UserTaskIndex;

