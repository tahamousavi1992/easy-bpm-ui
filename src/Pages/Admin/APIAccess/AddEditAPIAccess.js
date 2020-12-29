import React, { useState } from 'react';
import APIAccessService from '../../../Services/APIAccessService';
import UtilityService from '../../../Services/UtilityService';
import Lang from '../../../Shared/AdminLang/Lang'; 
class AddEditAPIAccess extends React.Component {
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
        let data = await new APIAccessService().get(this.props.addEditId);
        this.setState({ ...data });
    }

    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    async submitForm(event) {
        if (window.bpmsFormIsValid()) {
            let result = await new APIAccessService().update(this.state);
            UtilityService.showMessage(result.ResultType, result.Message);
            if (result.ResultType == 'success') {
                this.props.callBack();
            }
        }
    }

    render() {
        return (
            <div className="modal-dialog modal-dialog-centered modal-lg modal-windows" role="document" id="mymodal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{Lang.AddEditAPIAccess.caption}</h5>
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
                                    <label>{Lang.AddEditAPIAccess.name}</label>
                                    <div className="input-group">
                                        <input onChange={this.handelChange} value={this.state.Name || ''} name='Name' className="form-control required-field" data-val-required="Name is required" data-val="true" />
                                    </div>
                                    <span htmlFor="Name" className="help-block error"></span>
                                </div>
                                <div className="col-lg-6">
                                    <label>{Lang.AddEditAPIAccess.ipAddress}</label>
                                    <div className="input-group">
                                        <input onChange={this.handelChange} value={this.state.IPAddress || ''} name='IPAddress' className="form-control" />
                                    </div>
                                    <span htmlFor="IPAddress" className="help-block error"></span>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>{Lang.AddEditAPIAccess.accessKey}</label>
                                    <div className="input-group">
                                        <input onChange={this.handelChange} value={this.state.AccessKey || ''} name='AccessKey' className="form-control required-field" data-val-required="Access Key is required" data-val="true" />
                                    </div>
                                    <span htmlFor="AccessKey" className="help-block error"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button id="btnSaveAccess" type="button" onClick={this.submitForm} className="btn btn-primary font-weight-bold">
                            {Lang.Shared.save}
                        </button>
                        <button type="button" className="btn btn-light-primary font-weight-bold" data-dismiss="modal">{Lang.Shared.cancel}</button>
                    </div>
                </div >
            </div >
        );
    }
}

export default AddEditAPIAccess;

