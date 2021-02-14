import React, { useState } from 'react';
import UserService from '../../../Services/UserService';
import UtilityService from '../../../Services/UtilityService';
import Lang from '../../../Shared/AdminLang/Lang';
class AddEditUser extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.submitForm = this.submitForm.bind(this);
        this.testConnectionSrting = this.testConnectionSrting.bind(this);
    }
    async componentDidMount() {
        //load validation
        window.initialFunctions();
        window.bpmsInitialValidation('');
        //load data 
        let data = await new UserService().get(this.props.addEditId);
        this.setState({ ...data });
    }
    handelChange = (event) => { this.setState(UtilityService.handelChange(event, this.state)); }

    async submitForm(event) {
        if (window.bpmsFormIsValid()) {
            let result = await new UserService().update(this.state);
            UtilityService.showMessage(result.ResultType, result.Message);
            if (result.ResultType == 'success') {
                this.props.callBack();
            }
        }
    }

    async testConnectionSrting() {
        if (window.bpmsFormIsValid()) {
            let result = await new UserService().test(this.state);
            UtilityService.showMessage(result.ResultType, result.Message);
        }
    }

    render() {
        return (
            <div className="modal-dialog modal-dialog-centered modal-lg modal-windows" role="document" id="mymodal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{Lang.AddEditUser.caption}</h5>
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
                            <div id="accordion" className="accordion accordion-toggle-arrow">
                                <div className="card">
                                    <div className="card-header" id="headingOne">
                                        <div className="card-title" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            {Lang.AddEditUser.collapsInfo}
                                        </div>
                                    </div>

                                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                        <div className="card-body">
                                            <div className="form-group row">
                                                <div className="col-lg-6">
                                                    <label>{Lang.AddEditUser.username}</label>
                                                    <div className="input-group">
                                                        <input onChange={this.handelChange} value={this.state.Username || ''} name='Username' className="form-control required-field" data-val-required="Username is required" data-val="true" />
                                                    </div>
                                                    <span htmlFor="Username" className="help-block error"></span>
                                                </div>
                                                <div className="col-lg-6">
                                                    <label>{Lang.AddEditUser.email}</label>
                                                    <div className="input-group">
                                                        <input onChange={this.handelChange} value={this.state.Email || ''} name='Email' className="form-control" />
                                                    </div>
                                                    <span htmlFor="Email" className="help-block error"></span>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-lg-6">
                                                    <label>{Lang.AddEditUser.firstName}</label>
                                                    <div className="input-group">
                                                        <input onChange={this.handelChange} value={this.state.FirstName || ''} name='FirstName' className="form-control required-field" data-val-required="FirstName is required" data-val="true" />
                                                    </div>
                                                    <span htmlFor="FirstName" className="help-block error"></span>
                                                </div>
                                                <div className="col-lg-6">
                                                    <label>{Lang.AddEditUser.lastName}</label>
                                                    <div className="input-group">
                                                        <input onChange={this.handelChange} value={this.state.LastName || ''} name='LastName' className="form-control required-field" data-val-required="LastName is required" data-val="true" />
                                                    </div>
                                                    <span htmlFor="LastName" className="help-block error"></span>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-lg-6">
                                                    <label>{Lang.AddEditUser.tel}</label>
                                                    <div className="input-group">
                                                        <input onChange={this.handelChange} value={this.state.Tel || ''} name='Tel' className="form-control" />
                                                    </div>
                                                    <span htmlFor="Tel" className="help-block error"></span>
                                                </div>
                                                <div className="col-lg-6">
                                                    <label>{Lang.AddEditUser.mobile}</label>
                                                    <div className="input-group">
                                                        <input onChange={this.handelChange} value={this.state.Mobile || ''} name='Mobile' className="form-control" />
                                                    </div>
                                                    <span htmlFor="Mobile" className="help-block error"></span>
                                                </div>
                                            </div>
                                            {
                                                this.state.ID == '00000000-0000-0000-0000-000000000000' &&
                                                <div className="form-group row">
                                                    <div className="col-lg-6">
                                                        <label>{Lang.AddEditUser.password}</label>
                                                        <div className="input-group">
                                                            <input onChange={this.handelChange} value={this.state.Password || ''} name='Password' className="form-control" />
                                                        </div>
                                                        <span htmlFor="Password" className="help-block error"></span>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="headingTwo">
                                        <div className="card-title" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            {Lang.AddEditUser.collapsEmail}
                                        </div>
                                    </div>
                                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                        <div className="card-body">
                                            <div className="form-group row">
                                                <div className="col-lg-6">
                                                    <label>{Lang.AddEditUser.smpt}</label>
                                                    <div className="input-group">
                                                        <input onChange={this.handelChange} value={this.state.EmailAccountDTO ? this.state.EmailAccountDTO.SMTP : ''} name='EmailAccountDTO.SMTP' className="form-control" />
                                                    </div>
                                                    <span htmlFor="SMTP" className="help-block error"></span>
                                                </div>
                                                <div className="col-lg-6">
                                                    <label>{Lang.AddEditUser.port}</label>
                                                    <div className="input-group">
                                                        <input onChange={this.handelChange} value={this.state.EmailAccountDTO ? this.state.EmailAccountDTO.Port : ''} name='EmailAccountDTO.Port' className="form-control" autoComplete="off" />
                                                    </div>
                                                    <span htmlFor="EmailAccountDTO.Port" className="help-block error"></span>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                            <div className="col-lg-6">
                                                    <label> {Lang.AddEditUser.email}</label>
                                                    <div className="input-group">
                                                        <input onChange={this.handelChange} value={this.state.EmailAccountDTO ? this.state.EmailAccountDTO.Email : ''} name='EmailAccountDTO.Email' className="form-control" autoComplete="off" />
                                                    </div>
                                                    <span htmlFor="EmailAccountDTO.Email" className="help-block error"></span>
                                                </div>
                                                <div className="col-lg-6">
                                                    <label>{Lang.AddEditUser.mailPassword}</label>
                                                    <div className="input-group">
                                                        <input onChange={this.handelChange} value={this.state.EmailAccountDTO ? this.state.EmailAccountDTO.MailPassword : ''} name='EmailAccountDTO.MailPassword' className="form-control"  type='password' autoComplete="off" />
                                                    </div>
                                                    <span htmlFor="EmailAccountDTO.MailPassword" className="help-block error"></span>
                                                </div>
                                            </div>
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
                        <button type="button" className="btn btn-light-primary font-weight-bold" data-dismiss="modal">
                            {Lang.Shared.cancel}
                        </button>
                    </div>
                </div >
            </div >
        );
    }
}

export default AddEditUser;

