import React, { useState } from 'react';
import DepartmentService from '../../../Services/DepartmentService';
import UtilityService from '../../../Services/UtilityService';
import Lang from '../../../Shared/AdminLang/Lang';
class AddEditDepartment extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.submitForm = this.submitForm.bind(this);
    }
    async componentDidMount() {
        //load validation
        window.initialFunctions();
        window.bpmsInitialValidation('');
        //load data 
        let data = await new DepartmentService().get(this.props.addEditId, this.props.parentId);
        this.setState({ ...data });
    }
    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    async submitForm(event) {
        if (window.bpmsFormIsValid()) {
            let result = await new DepartmentService().update(this.state);
            UtilityService.showMessage(result.ResultType, result.Message);
            if (result.ResultType == 'success') {
                this.props.callBack(result.Data);
            }
        }
    }

    render() {
        return (
            <div className="modal-dialog modal-dialog-centered modal-lg modal-windows" role="document" id="mymodal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{Lang.AddEditDepartment.caption}</h5>
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
                                    <label>{Lang.AddEditDepartment.name}</label>
                                    <div className="input-group">
                                        <input onChange={this.handelChange} value={this.state.Name || ''} name='Name' className="form-control required-field" data-val-required={Lang.requiredMsg(Lang.AddEditDepartment.name)} data-val="true" />
                                    </div>
                                    <span htmlFor="Name" className="help-block error"></span>
                                </div>
                                <div className="col-lg-6">
                                    <label>{Lang.AddEditDepartment.workEmail}</label>
                                    <div className="input-group">
                                        <input onChange={this.handelChange} value={this.state.WorkEmail || ''} name='WorkEmail' className="form-control" />
                                    </div>
                                    <span htmlFor="WorkEmail" className="help-block error"></span>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>{Lang.AddEditDepartment.smpt}</label>
                                    <div className="input-group">
                                        <input onChange={this.handelChange} value={this.state.SMTP || ''} name='SMTP' className="form-control" />
                                    </div>
                                    <span htmlFor="SMTP" className="help-block error"></span>
                                </div>
                                <div className="col-lg-6">
                                    <label>{Lang.AddEditDepartment.port}</label>
                                    <div className="input-group">
                                        <input onChange={this.handelChange} value={this.state.Port || ''} name='Port' className="form-control" />
                                    </div>
                                    <span htmlFor="Port" className="help-block error"></span>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>{Lang.AddEditDepartment.emailPassword}</label>
                                    <div className="input-group">
                                        <input onChange={this.handelChange} value={this.state.MailPassword || ''} type='password' name='MailPassword' className="form-control" />
                                    </div>
                                    <span htmlFor="MailPassword" className="help-block error"></span>
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

export default AddEditDepartment;

