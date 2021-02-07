import React, { useState } from 'react';
import DepartmentMemberService from '../../../Services/DepartmentMemberService';
import UtilityService from '../../../Services/UtilityService';
import Select from '../../../Components/Select';
import Lang from '../../../Shared/AdminLang/Lang';
class AddEditDepartmentMember extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.submitForm = this.submitForm.bind(this);
        this.addRole = this.addRole.bind(this);
    }
    async componentDidMount() {
        //load validation
        window.initialFunctions();
        window.bpmsInitialValidation('');
        this.setState({ addEditId: this.props.addEditId });
        //load data 
        let data = await new DepartmentMemberService().get(this.props.addEditId, this.props.departmentID);
        this.setState({ ...data });
    }
    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    async submitForm(event) {
        if (window.bpmsFormIsValid()) {
            let result = await new DepartmentMemberService().update(UtilityService.getFormData('addEditMemberModal', {
                DepartmentID: this.state.DepartmentID,
                UserID: this.state.UserID,
            }));
            UtilityService.showMessage(result.ResultType, result.Message);
            if (result.ResultType == 'success') {
                this.props.callBack();
            }
        }
    }

    async addRole() {
        if (this.state.RoleID != '' && document.getElementById('tblRoles').querySelector('[value="' + this.state.RoleID + '"]') == null) {
            document.getElementById('tblRoles').tBodies[0].innerHTML +=
                `<tr>
                  <td>
                      <input type="hidden" name="Roles" value="${this.state.RoleID}" />
                      ${document.getElementById('RoleID').options[document.getElementById('RoleID').selectedIndex].text}
                  </td>
                  <td>
                      <a href="#" class="btn btn-sm btn-clean btn-icon" onclick="$(this.closest('tr')).remove();" title="Delete"><span class="svg-icon svg-icon-md"><i class="fad fa-trash-alt"></i></span></a>
                  </td>
                </tr>`;
                //disable UserID dropdown list.
                this.setState({ addEditId: this.state.UserID });
        }
        await this.setState({ RoleID: '' });

    }

    render() {
        return (
            <div className="modal-dialog modal-dialog-centered modal-lg modal-windows" role="document" id="addEditMemberModal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{Lang.AddEditDepartmentMember.caption}</h5>
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
                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>{Lang.AddEditDepartmentMember.user}</label>
                                    <div className="input-group">
                                        <Select name="UserID" id="UserID" value={this.state.UserID || ''} handelChange={this.handelChange} disabled={this.state.addEditId != null}
                                            listItem={this.state.ListUsers} optionKey="ID" optionLabel="FullName" isRequired={true} validationGroup="addRole" requiredMsg={Lang.requiredMsg(Lang.AddEditDepartmentMember.user)} />
                                    </div>
                                    <span htmlFor="UserID" className="help-block error"></span>
                                </div>
                                <div className="col-lg-6">
                                    <label>{Lang.AddEditDepartmentMember.role}</label>
                                    <div className="input-group">
                                        <Select name="RoleID" id="RoleID" value={this.state.RoleID || ''} handelChange={this.handelChange}
                                            listItem={this.state.ListRoles} optionKey="CodeOf" optionLabel="NameOf" isRequired={true} validationGroup="addRole" requiredMsg={Lang.requiredMsg(Lang.AddEditDepartmentMember.role)} />
                                    </div>
                                    <span htmlFor="RoleID" className="help-block error"></span>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-12">
                                    <label>&nbsp;</label>
                                    <div className="input-group">
                                        <button type="button" className="btn btn-primary font-weight-bolder" data-val-group="addRole" onClick={() => { if (window.bpmsFormIsValid()) this.addRole(); }}>
                                            {Lang.AddEditDepartmentMember.add}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="bpms-table bpms-table-bordered bpms-table-head-custom bpms-table-default  ">
                                        <div className="table-information table-responsive">
                                            <table id="tblRoles" className="table">
                                                <thead>
                                                    <tr>
                                                        <td className="text-center">{Lang.AddEditDepartmentMember.tbl_th_Name}</td>
                                                        <td className="text-center">{Lang.AddEditDepartmentMember.tbl_th_Delete}</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.Roles &&
                                                        this.state.Roles.map((item, index) => {
                                                            return <tr key={item.Key} className="text-center" >
                                                                <td className="text-center">
                                                                    <input type="hidden" name="Roles" value={item.Key} />
                                                                    {item.Value}
                                                                </td>
                                                                <td className="text-center">
                                                                    <a href="javascript:;" onClick={(event) => { event.target.closest('tr').remove() }} className="btn btn-sm btn-clean btn-icon" title={Lang.Shared.delete}>
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
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button id="btnSave" type="button" onClick={this.submitForm} className="btn btn-primary font-weight-bold">
                            {Lang.Shared.save}
                        </button>
                        <button type="button" className="btn btn-light-primary font-weight-bold" data-dismiss="modal">{Lang.Shared.cancel}</button>
                    </div>
                </div >
            </div >
        );
    }
}

export default AddEditDepartmentMember;

