import React, { useState } from 'react';
import DynamicFormService from '../../../Services/DynamicFormService';
import UtilityService from '../../../Services/UtilityService';
import Lang from '../../../Shared/AdminLang/Lang';
import Select, { CheckBox } from '../../../Components/Select';
const $ = window.$;
class EditApplicationPage extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.submitForm = this.submitForm.bind(this);
        this.addRole = this.addRole.bind(this);
        this.removeRole = this.removeRole.bind(this);
        this.addUser = this.addUser.bind(this);
        this.removeUser = this.removeUser.bind(this);
    }
    async componentDidMount() { 
        //load validation
        window.initialFunctions();
        window.bpmsInitialValidation('');
        //load data 
        let data = await new DynamicFormService().getEditAppPage(this.props.applicationPageId);
        await this.setState({ ...data });
        window.setListModelBinding('tblRoles', 'listRole');
        window.setListModelBinding('tblUsers', 'listUser');
    }
    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    async submitForm(event) {
        if (window.bpmsFormIsValid()) {
            let result = await new DynamicFormService().updateAppPage(UtilityService.getFormData('modalEditApplicationPage', {
                'DynamicFormDTO.ID': this.state.Model.ID,
                'DynamicFormDTO.ProcessId': this.state.Model.ProcessId,
                'DynamicFormDTO.ApplicationPageID': this.state.Model.ApplicationPageID,
            }));
            UtilityService.showMessage(result.ResultType, result.Message);
            if (result.ResultType == 'success') {
                window.closeModal('divEditApplicationPage');
            }
        }
    }

    //Role section
    async addRole() {
        if (document.getElementById('listRoles').selectedIndex == 0) {
            alert('انتخاب نقش الزامی میباشد')
            return;
        }
        let roleValue = document.getElementById('listRoles').value;
        let roleName = document.getElementById('listRoles').options[document.getElementById('listRoles').selectedIndex].text;

        let departmentValue = document.getElementById('listDepartments').value;
        let departmentName = document.getElementById('listDepartments').selectedIndex > 0 ? document.getElementById('listDepartments').options[document.getElementById('listDepartments').selectedIndex].text : "";

        let table = $('#tblRoles');
        let newRow = document.querySelector('.addRole').cloneNode(true);
        newRow.classList.remove('addRole');
        newRow.style.removeProperty('display');

        newRow.querySelector('[name="ApplicationPageAccessDTO.RoleName"]').value = roleName;
        newRow.querySelector('[name="ApplicationPageAccessDTO.RoleLU"]').value = roleValue;
        newRow.querySelector('[name="ApplicationPageAccessDTO.DepartmentName"]').value = departmentName;
        newRow.querySelector('[name="ApplicationPageAccessDTO.DepartmentID"]').value = departmentValue;

        table.append(newRow);
        newRow.querySelector('a.delete-row').onclick = this.removeRole;
        window.setListModelBinding('tblRoles', 'listRole');
        document.getElementById('listRoles').selectedIndex = 0
        document.getElementById('listDepartments').selectedIndex = 0
    }

    async removeRole(event) {
        event.target.closest('tr').remove();
        window.setListModelBinding('tblRoles', 'listRole');
    }

    //User section
    async addUser() {
        if (document.getElementById('listUsers').selectedIndex == 0) {
            alert(Lang.requiredMsg(Lang.EditApplicationPage.user))
            return;
        }
        let userValue = document.getElementById('listUsers').value;
        let userName = document.getElementById('listUsers').options[document.getElementById('listUsers').selectedIndex].text;

        let table = $('#tblUsers');
        let newRow = document.querySelector('.addUser').cloneNode(true);
        newRow.classList.remove('addUser');
        newRow.style.removeProperty('display');

        newRow.querySelector('[name="ApplicationPageAccessDTO.UserFullName"]').value = userName;
        newRow.querySelector('[name="ApplicationPageAccessDTO.UserID"]').value = userValue;

        table.append(newRow);

        newRow.querySelector('a.delete-row').onclick = this.removeUser;
        window.setListModelBinding('tblUsers', 'listUser');
        document.getElementById('listUsers').selectedIndex = 0
    }

    async removeUser(event) {
        event.target.closest('tr').remove();
        window.setListModelBinding('tblUsers', 'listUser');
    }

    render() {
        return (
            <div className="modal-dialog modal-dialog-centered modal-lg modal-windows" role="document" id="modalEditApplicationPage">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{Lang.EditApplicationPage.caption}</h5>
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
                        {
                            this.state.Model &&
                            <div className="form">
                                <div className="form-group row">
                                    <div className="col-lg-6">
                                        <label>{Lang.EditApplicationPage.name}</label>
                                        <div className="input-group">
                                            <input defaultValue={this.state.Model.Name || ''} name='DynamicFormDTO.Name' className="form-control required-field" data-val-required="Name is required" data-val="true" autoComplete="off" />
                                        </div>
                                        <span htmlFor="DynamicFormDTO.Name" className="help-block error"></span>
                                    </div>
                                    <div className="col-lg-6">
                                        <label>{Lang.EditApplicationPage.group}</label>
                                        <div className="input-group">
                                            <Select name="DynamicFormDTO.ApplicationPageDTO.GroupLU" defaultValue={this.state.Model.ApplicationPageDTO.GroupLU || ''}
                                                listItem={this.state.Model.ApplicationPageDTO.ListGroupLU} optionKey="CodeOf" optionLabel="NameOf" isRequired={true} requiredMsg={Lang.requiredMsg(Lang.EditApplicationPage.group)} />
                                        </div>
                                        <span htmlFor="DynamicFormDTO.ApplicationPageDTO.GroupLU" className="help-block error"></span>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-6">
                                        <label>{Lang.EditApplicationPage.description}</label>
                                        <div className="input-group">
                                            <input defaultValue={this.state.Model.ApplicationPageDTO.Description || ''} name='DynamicFormDTO.ApplicationPageDTO.Description' className="form-control required-field" autoComplete="off" />
                                        </div>
                                        <span htmlFor="DynamicFormDTO.ApplicationPageDTO.Description" className="help-block error"></span>
                                    </div>
                                    <div className="col-lg-6">
                                        <label>{Lang.EditApplicationPage.showInMenu}</label>
                                        <div className="input-group">
                                            <CheckBox id="DynamicFormDTO.ApplicationPageDTO.ShowInMenu" name="DynamicFormDTO.ApplicationPageDTO.ShowInMenu"
                                                defaultChecked={this.state.Model.ApplicationPageDTO.ShowInMenu} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-lg-6">
                                        <label>{Lang.EditApplicationPage.isEncrypted}</label>
                                        <div className="input-group">
                                            <CheckBox id="DynamicFormDTO.IsEncrypted" name="DynamicFormDTO.IsEncrypted"
                                                defaultChecked={this.state.Model.IsEncrypted} />
                                        </div>
                                    </div>
                                </div>
                                <fieldset>
                                    <legend>{Lang.EditApplicationPage.byRoles}</legend>
                                    <div className="form-group row">
                                        <div className="col-lg-6">
                                            <label>{Lang.EditApplicationPage.role}</label>
                                            <div className="input-group">
                                                <Select name="listRoles" id="listRoles" defaultValue={""}
                                                    listItem={this.state.ListRoles} optionKey="CodeOf" optionLabel="NameOf" />
                                            </div>
                                            <span htmlFor="ApplicationPageDTO.GroupLU" className="help-block error"></span>
                                        </div>
                                        <div className="col-lg-6">
                                            <label>{Lang.EditApplicationPage.organization}</label>
                                            <div className="input-group">
                                                <Select name="listDepartments" id="listDepartments" defaultValue={""}
                                                    listItem={this.state.ListDepartments} optionKey="ID" optionLabel="Name" />
                                            </div>
                                            <span htmlFor="ApplicationPageAccessDTO.DepartmentID" className="help-block error"></span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xl-12">
                                            <a href="javascript:;" className="btn btn-primary font-weight-bolder" id="btnAddRole" onClick={this.addRole}>
                                                {Lang.EditApplicationPage.addRole}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="bpms-table bpms-table-bordered  bpms-table-default  ">
                                        <div className="table-information table-responsive">
                                            <table style={{ display: "none" }}>
                                                <tbody>
                                                    <tr className="addRole">
                                                        <td style={{ display: "none" }}>
                                                            <input type="hidden" name="ApplicationPageAccessDTO.ID" id="ApplicationPageAccessDTO.ID" />
                                                            <input type="hidden" name="ApplicationPageAccessDTO.RoleLU" id="ApplicationPageAccessDTO.RoleLU" />
                                                            <input type="hidden" name="ApplicationPageAccessDTO.DepartmentID" id="ApplicationPageAccessDTO.DepartmentID" />
                                                        </td>
                                                        <td>
                                                            <input defaultValue={""} readOnly={true} name='ApplicationPageAccessDTO.RoleName' className="form-control" autoComplete="off" />
                                                        </td>
                                                        <td>
                                                            <input defaultValue={""} readOnly={true} name='ApplicationPageAccessDTO.DepartmentName' className="form-control" autoComplete="off" />
                                                        </td>
                                                        <td>
                                                            <input type="checkbox" defaultChecked={false} name='ApplicationPageAccessDTO.AllowView' />
                                                        </td>
                                                        <td>
                                                            <input type="checkbox" defaultChecked={false} name='ApplicationPageAccessDTO.AllowAdd' />
                                                        </td>
                                                        <td>
                                                            <input type="checkbox" defaultChecked={false} name='ApplicationPageAccessDTO.AllowEdit' />
                                                        </td>
                                                        <td>
                                                            <input type="checkbox" defaultChecked={false} name='ApplicationPageAccessDTO.AllowDelete' />
                                                        </td>
                                                        <td>
                                                            <a href='javascript:;' className="delete-row btn btn-sm btn-clean btn-icon" title={Lang.Shared.delete}>
                                                                <span className="svg-icon svg-icon-md"><i className="fad fa-trash-alt"></i></span>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table id="tblRoles" className="table">
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            {Lang.EditApplicationPage.tbl_th_Role}
                                                        </th>
                                                        <th>
                                                            {Lang.EditApplicationPage.tbl_th_Organization}
                                                        </th>
                                                        <th>
                                                            {Lang.EditApplicationPage.tbl_th_AllowView}
                                                        </th>
                                                        <th>
                                                            {Lang.EditApplicationPage.tbl_th_AllowAdd}
                                                        </th>
                                                        <th>
                                                            {Lang.EditApplicationPage.tbl_th_AllowEdit}
                                                        </th>
                                                        <th>
                                                            {Lang.EditApplicationPage.tbl_th_AllowDelete}
                                                        </th>
                                                        <th>
                                                            {Lang.EditApplicationPage.tbl_th_Operation}
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.ListApplicationPageAccess &&
                                                        this.state.ListApplicationPageAccess.filter(c => c.RoleLU != null).map((item, index) => {
                                                            return <tr key={item.ID} className="text-center" >

                                                                <td style={{ display: "none" }}>
                                                                    <input type="hidden" defaultValue={item.ID} name="item.ID" id="item.ID" />
                                                                    <input type="hidden" defaultValue={item.RoleLU} name="item.RoleLU" id="item.RoleLU" />
                                                                    <input type="hidden" defaultValue={item.DepartmentID} name="item.DepartmentID" id="item.DepartmentID" />
                                                                </td>
                                                                <td>
                                                                    <input defaultValue={item.RoleName} readOnly={true} name='item.RoleName' className="form-control" autoComplete="off" />
                                                                </td>
                                                                <td>
                                                                    <input defaultValue={item.DepartmentName} readOnly={true} name='item.DepartmentName' className="form-control" autoComplete="off" />
                                                                </td>
                                                                <td>
                                                                    <input type="checkbox" defaultChecked={item.AllowView} name='item.AllowView' />

                                                                </td>
                                                                <td>
                                                                    <input type="checkbox" defaultChecked={item.AllowAdd} name='item.AllowAdd' />
                                                                </td>
                                                                <td>
                                                                    <input type="checkbox" defaultChecked={item.AllowEdit} name='item.AllowEdit' />
                                                                </td>
                                                                <td>
                                                                    <input type="checkbox" defaultChecked={item.AllowDelete} name='item.AllowDelete' />
                                                                </td>
                                                                <td>
                                                                    <a href='javascript:;' className="delete-row btn btn-sm btn-clean btn-icon" title={Lang.Shared.delete} onClick={this.removeRole}>
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
                                </fieldset>
                                <hr />
                                <fieldset>
                                    <legend>{Lang.EditApplicationPage.byUsers}</legend>
                                    <div className="form-group row">
                                        <div className="col-lg-6">
                                            <label>{Lang.EditApplicationPage.user}</label>
                                            <div className="input-group">
                                                <Select name="listUsers" id="listUsers" defaultValue={""}
                                                    listItem={this.state.ListUsers} optionKey="ID" optionLabel="FullName" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xl-12">
                                            <a href="javascript:;" className="btn btn-primary font-weight-bolder" id="btnAddUser" onClick={this.addUser}>
                                                {Lang.EditApplicationPage.addUser}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="bpms-table bpms-table-bordered  bpms-table-default  ">
                                        <div className="table-information table-responsive">
                                            <table style={{ display: "none" }}>
                                                <tbody>
                                                    <tr className="addUser">
                                                        <td style={{ display: "none" }}>
                                                            <input type="hidden" name="ApplicationPageAccessDTO.ID" id="ApplicationPageAccessDTO.ID" />
                                                            <input type="hidden" name="ApplicationPageAccessDTO.UserID" id="ApplicationPageAccessDTO.UserID" />
                                                        </td>
                                                        <td>
                                                            <input defaultValue={""} readOnly={true} name='ApplicationPageAccessDTO.UserFullName' className="form-control" autoComplete="off" />
                                                        </td>
                                                        <td>
                                                            <input type="checkbox" defaultChecked={false} name='ApplicationPageAccessDTO.AllowView' />
                                                        </td>
                                                        <td>
                                                            <input type="checkbox" defaultChecked={false} name='ApplicationPageAccessDTO.AllowAdd' />
                                                        </td>
                                                        <td>
                                                            <input type="checkbox" defaultChecked={false} name='ApplicationPageAccessDTO.AllowEdit' />
                                                        </td>
                                                        <td>
                                                            <input type="checkbox" defaultChecked={false} name='ApplicationPageAccessDTO.AllowDelete' />
                                                        </td>
                                                        <td>
                                                            <a href='javascript:;' className="delete-row btn btn-sm btn-clean btn-icon" title={Lang.Shared.delete}>
                                                                <span className="svg-icon svg-icon-md"><i className="fad fa-trash-alt"></i></span>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table id="tblUsers" className="table">
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            {Lang.EditApplicationPage.tbl_th_FullName}
                                                        </th>
                                                        <th>
                                                            {Lang.EditApplicationPage.tbl_th_AllowView}
                                                        </th>
                                                        <th>
                                                            {Lang.EditApplicationPage.tbl_th_AllowAdd}
                                                        </th>
                                                        <th>
                                                            {Lang.EditApplicationPage.tbl_th_AllowEdit}
                                                        </th>
                                                        <th>
                                                            {Lang.EditApplicationPage.tbl_th_AllowDelete}
                                                        </th>
                                                        <th>
                                                            {Lang.EditApplicationPage.tbl_th_Operation}
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.ListApplicationPageAccess &&
                                                        this.state.ListApplicationPageAccess.filter(c => c.UserID != null).map((item, index) => {
                                                            return <tr key={item.ID} className="text-center" >

                                                                <td style={{ display: "none" }}>
                                                                    <input type="hidden" defaultValue={item.ID} name="item.ID" id="item.ID" />
                                                                    <input type="hidden" defaultValue={item.UserID} name="item.UserID" id="item.UserID" />
                                                                </td>
                                                                <td>
                                                                    <input defaultValue={item.UserFullName} readOnly={true} name='item.UserFullName' className="form-control" autoComplete="off" />
                                                                </td>
                                                                <td>
                                                                    <input type="checkbox" defaultChecked={item.AllowView} name='item.AllowView' />

                                                                </td>
                                                                <td>
                                                                    <input type="checkbox" defaultChecked={item.AllowAdd} name='item.AllowAdd' />
                                                                </td>
                                                                <td>
                                                                    <input type="checkbox" defaultChecked={item.AllowEdit} name='item.AllowEdit' />
                                                                </td>
                                                                <td>
                                                                    <input type="checkbox" defaultChecked={item.AllowDelete} name='item.AllowDelete' />
                                                                </td>
                                                                <td>
                                                                    <a href='javascript:;' className="delete-row btn btn-sm btn-clean btn-icon" title={Lang.Shared.delete} onClick={this.removeUser}>
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
                                </fieldset>
                            </div>
                        }
                    </div>
                    <div className="modal-footer">
                        <button id="btnSave" type="button" onClick={this.submitForm} className="btn btn-primary font-weight-bold">
                            {Lang.Shared.save}
                        </button>
                        <button type="button" className="btn btn-light-primary font-weight-bold" data-dismiss="modal">{Lang.Shared.cancel}</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditApplicationPage;

