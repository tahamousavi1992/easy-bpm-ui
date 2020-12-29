﻿import React, { useState } from 'react';
import DynamicFormService from '../../../Services/DynamicFormService';
import UtilityService from '../../../Services/UtilityService';
import Lang from '../../../Shared/AdminLang/Lang';
class AddEditStyleSheet extends React.Component {
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
        let data = await new DynamicFormService().getStyle(this.props.dynamicFormId);
        this.setState({ ...data });
    }
    handelChange = (event) => { this.setState(UtilityService.handelChange(event)); }

    async submitForm(event) {
        if (window.bpmsFormIsValid()) {
            let result = await new DynamicFormService().updateStyle(this.state);
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
                        <h5 className="modal-title">{Lang.AddEditStyleSheet.caption }</h5>
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
                                <div className="col-lg-12">
                                    <label>{Lang.AddEditStyleSheet.style}</label>
                                    <div className="input-group">
                                        <textarea rows="10" onChange={this.handelChange} value={this.state.StyleCode || ''} name='StyleCode' className="form-control" />
                                    </div>
                                    <span htmlFor="StyleCode" className="help-block error"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button id="btnSave" type="button" onClick={this.submitForm} className="btn btn-primary font-weight-bold">
                            {Lang.Shared.save }
                        </button>
                        <button type="button" className="btn btn-light-primary font-weight-bold" data-dismiss="modal"> {Lang.Shared.cancel}</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddEditStyleSheet;

