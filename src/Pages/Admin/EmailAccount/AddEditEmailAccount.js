import React, { useState } from 'react';
import EmailAccountService from '../../../Services/EmailAccountService';
import UtilityService from '../../../Services/UtilityService';
import Lang from '../../../Shared/AdminLang/Lang';
class AddEditEmailAccount extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.submitForm = this.submitForm.bind(this);
        this.testEmailAccount = this.testEmailAccount.bind(this);
    }
    async componentDidMount() {
        //load validation
        window.initialFunctions();
        window.bpmsInitialValidation('');
        //load data 
        let data = await new EmailAccountService().get(this.props.addEditId);
        this.setState({ ...data });
    }
    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    async submitForm(event) {
        if (window.bpmsFormIsValid()) {
            let result = await new EmailAccountService().update(this.state);
            UtilityService.showMessage(result.ResultType, result.Message);
            if (result.ResultType == 'success') {
                this.props.callBack();
            }
        }
    }

    async testEmailAccount() {
        if (window.bpmsFormIsValid()) {
            let result = await new EmailAccountService().test(this.state);
            UtilityService.showMessage(result.ResultType, result.Message);
        }
    }

    render() {
        return (
            <div className="modal-dialog modal-dialog-centered modal-lg modal-windows" role="document" id="mymodal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{Lang.AddEditEmailAccount.caption}</h5>
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
                                    <label>{Lang.AddEditEmailAccount.smtp}</label>
                                    <div className="input-group">
                                        <input onChange={this.handelChange} value={this.state.SMTP || ''} name='SMTP' className="form-control required-field" data-val-required={Lang.requiredMsg(Lang.AddEditEmailAccount.smtp)} data-val="true" autoComplete="off" />
                                    </div>
                                    <span htmlFor="SMTP" className="help-block error"></span>
                                </div>
                                <div className="col-lg-6">
                                    <label>{Lang.AddEditEmailAccount.port}</label>
                                    <div className="input-group">
                                        <input onChange={this.handelChange} value={this.state.Port || ''} name='Port' className="form-control required-field" data-val-required={Lang.requiredMsg(Lang.AddEditEmailAccount.port)} data-val="true" autoComplete="off"/>
                                    </div>
                                    <span htmlFor="Port" className="help-block error"></span>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>{Lang.AddEditEmailAccount.mailUserName}</label>
                                    <div className="input-group">
                                        <input onChange={this.handelChange} value={this.state.MailUserName || ''} name='MailUserName' className="form-control required-field" data-val-required={Lang.requiredMsg(Lang.AddEditEmailAccount.mailUserName)} data-val="true" autoComplete="off" />
                                    </div>
                                    <span htmlFor="MailUserName" className="help-block error"></span>
                                </div>
                                <div className="col-lg-6">
                                    <label>{Lang.AddEditEmailAccount.mailPassword}</label>
                                    <div className="input-group">
                                        <input onChange={this.handelChange} value={this.state.MailPassword || ''} name='MailPassword' type="password" className="form-control required-field" data-val-required={Lang.requiredMsg(Lang.AddEditEmailAccount.mailPassword)} data-val="true" autoComplete="off" />
                                    </div>
                                    <span htmlFor="MailPassword" className="help-block error"></span>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>{Lang.AddEditEmailAccount.email}</label>
                                    <div className="input-group">
                                        <input onChange={this.handelChange} value={this.state.Email || ''} name='Email' className="form-control required-field" data-val-required={Lang.requiredMsg(Lang.AddEditEmailAccount.email) } data-val="true" autoComplete="off" />
                                    </div>
                                    <span htmlFor="Email" className="help-block error"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button id="btnSaveEmail" type="button" onClick={this.submitForm} className="btn btn-primary font-weight-bold">
                            {Lang.Shared.save}
                        </button>
                        <button id="btnTest" type="button" onClick={this.testEmailAccount} className="btn btn-danger font-weight-bold">
                            {Lang.AddEditEmailAccount.test }
                        </button>
                        <button type="button" className="btn btn-light-primary font-weight-bold" data-dismiss="modal"> {Lang.Shared.cancel}</button>
                    </div>
                </div >
            </div >
        );
    }
}

export default AddEditEmailAccount;

