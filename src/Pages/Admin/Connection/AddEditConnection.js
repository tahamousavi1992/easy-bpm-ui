import React, { useState } from 'react';
import ConnectionService from '../../../Services/ConnectionService';
import UtilityService from '../../../Services/UtilityService';
import Lang from '../../../Shared/AdminLang/Lang';
import Select, { CheckBox } from '../../../Components/Select';
class AddEditConnection extends React.Component {
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
        let data = await new ConnectionService().get(this.props.addEditId);
        this.setState({ ...data });
    }
    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    async submitForm(event) {
        if (window.bpmsFormIsValid()) {
            let result = await new ConnectionService().update(this.state);
            UtilityService.showMessage(result.ResultType, result.Message);
            if (result.ResultType == 'success') {
                this.props.callBack();
            }
        }
    }

    async testConnectionSrting() {
        if (window.bpmsFormIsValid()) {
            let result = await new ConnectionService().test(this.state);
            UtilityService.showMessage(result.ResultType, result.Message);
        }
    }

    render() {
        return (
            <div className="modal-dialog modal-dialog-centered modal-lg modal-windows" role="document" id="mymodal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{Lang.AddEditConnection.caption}</h5>
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
                                    <label>{Lang.AddEditConnection.name}</label>
                                    <div className="input-group">
                                        <input onChange={this.handelChange} value={this.state.Name || ''} name='Name' className="form-control required-field" data-val-required={Lang.requiredMsg(Lang.AddEditConnection.name)} data-val="true" autoComplete="off" />
                                    </div>
                                    <span htmlFor="Name" className="help-block error"></span>
                                </div>
                                <div className="col-lg-6">
                                    <label>{Lang.AddEditConnection.dataSource}</label>
                                    <div className="input-group">
                                        <input onChange={this.handelChange} value={this.state.DataSource || ''} name='DataSource' className="form-control required-field" data-val-required={Lang.requiredMsg(Lang.AddEditConnection.dataSource)} data-val="true" autoComplete="off" />
                                    </div>
                                    <span htmlFor="DataSource" className="help-block error"></span>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>{Lang.AddEditConnection.initialCatalog}</label>
                                    <div className="input-group">
                                        <input onChange={this.handelChange} value={this.state.InitialCatalog || ''} name='InitialCatalog' className="form-control required-field" data-val-required={Lang.requiredMsg(Lang.AddEditConnection.initialCatalog)} data-val="true" autoComplete="off" />
                                    </div>
                                    <span htmlFor="InitialCatalog" className="help-block error"></span>
                                </div>
                                <div className="col-lg-6">
                                    <label>{Lang.AddEditConnection.userID}</label>
                                    <div className="input-group">
                                        <input onChange={this.handelChange} value={this.state.UserID || ''} name='UserID' className="form-control" autoComplete="off" />
                                    </div>
                                    <span htmlFor="UserID" className="help-block error"></span>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>{Lang.AddEditConnection.password}</label>
                                    <div className="input-group">
                                        <input onChange={this.handelChange} value={this.state.Password || ''} type="password" name='Password' className="form-control" autoComplete="off" />
                                    </div>
                                    <span htmlFor="Password" className="help-block error"></span>
                                </div>
                                <div className="col-lg-6">
                                    <label>{Lang.AddEditConnection.integratedSecurity}</label>
                                    <CheckBox id="IntegratedSecurity" name="IntegratedSecurity" checked={this.state.IntegratedSecurity}
                                        handelChange={this.handelChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button id="btnSaveConnectionSrting" type="button" onClick={this.submitForm} className="btn btn-primary font-weight-bold">
                            {Lang.Shared.save}
                        </button>
                        <button id="btnTest" type="button" onClick={this.testConnectionSrting} className="btn btn-danger font-weight-bold">
                            {Lang.AddEditConnection.testConnection}
                        </button>
                        <button type="button" className="btn btn-light-primary font-weight-bold" data-dismiss="modal">{Lang.Shared.cancel}</button>
                    </div>
                </div >
            </div >
        );
    }
}

export default AddEditConnection;

